import React from "react";
import { Box, Code, Input, Link, Text, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { H1, H2, H3, H4, H5, H6 } from "../components/Headings";
// import { Logo } from "../Logo";

interface homeProps {}

const Home: React.FC<homeProps> = ({}) => {
  return (
    <Box fontSize="xl">
      {/* <Logo h="40vmin" pointerEvents="none" /> */}
      <VStack spacing={8}>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>
      </VStack>
    </Box>
  );
};

export default Home;
