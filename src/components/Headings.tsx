import { Heading } from "@chakra-ui/react";
import React from "react";

export const H1: React.FC<{}> = ({ children }) => {
  return (
    <Heading as="h1" size="4xl">
      {children}
    </Heading>
  );
};

export const H2: React.FC<{}> = ({ children }) => {
  return (
    <Heading as="h2" size="3xl">
      {children}
    </Heading>
  );
};

export const H3: React.FC<{}> = ({ children }) => {
  return (
    <Heading as="h3" size="2xl">
      {children}
    </Heading>
  );
};

export const H4: React.FC<{}> = ({ children }) => {
  return (
    <Heading as="h4" size="xl">
      {children}
    </Heading>
  );
};

export const H5: React.FC<{}> = ({ children }) => {
  return (
    <Heading as="h5" size="lg">
      {children}
    </Heading>
  );
};

export const H6: React.FC<{}> = ({ children }) => {
  return (
    <Heading as="h6" size="md">
      {children}
    </Heading>
  );
};
