import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import Layout from "./components/Layout";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "./generated/graphql";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  // update meQuery cache when login or register queries are run
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

export const App = () => (
  <Provider value={client}>
    <ChakraProvider theme={theme}>
      <Flex minH="100vh" flexDirection="column" alignItems="center">
        <Layout>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Flex>
    </ChakraProvider>
  </Provider>
);
