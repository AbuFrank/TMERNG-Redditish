import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { cacheExchange } from "@urql/exchange-graphcache";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
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
