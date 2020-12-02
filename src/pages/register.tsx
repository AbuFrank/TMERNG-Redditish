import React from "react";
import { Form, Formik } from "formik";
import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { useHistory } from "react-router-dom";

const Register: React.FC<{}> = ({}) => {
  let history = useHistory();
  // const handleFinishRegistration = () => {
  //   history.pushState
  // }
  const [_, register] = useRegisterMutation();
  return (
    <Container pt="24">
      <Heading as="h2" size="3xl" textAlign="center" mb={10}>
        Register
      </Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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
                Register
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
