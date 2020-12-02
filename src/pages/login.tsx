import React from "react";
import { Form, Formik } from "formik";
import { Button, Container, Flex, Heading, Stack } from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { useHistory } from "react-router-dom";
import { H3 } from "../components/Headings";

const Login: React.FC<{}> = ({}) => {
  let history = useHistory();
  // const handleFinishRegistration = () => {
  //   history.pushState
  // }
  const [_, login] = useLoginMutation();
  return (
    <Container>
      <Flex flexDir="column" justify="center" pt={24}>
        <Heading as="h2" size="3xl" textAlign="center" mb={10}>
          Login
        </Heading>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ options: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              history.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4} align="start">
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
                <Button
                  width="auto"
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="teal"
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Container>
  );
};

export default Login;
