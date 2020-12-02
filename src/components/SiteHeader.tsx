import { Container, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { H2 } from "./Headings";
import NavDrawer from "./NavDrawer";
import { Link, useLocation } from "react-router-dom";

const SiteHeader: React.FC<{}> = () => {
  let location = useLocation();

  return (
    <Container maxW={[null, "sm", "md", "lg", "xl"]}>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        w="100%"
        h={["90px", null, null, "120px"]}
      >
        {location.pathname === "/" ? (
          <H2>Redditish</H2>
        ) : (
          <Link to="/">
            <H2>Redditish</H2>
          </Link>
        )}
        <Spacer />
        <ColorModeSwitcher />
        <NavDrawer />
      </Flex>
    </Container>
  );
};

export default SiteHeader;
