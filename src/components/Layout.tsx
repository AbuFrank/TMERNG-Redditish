import { Box } from "@chakra-ui/react";
import React from "react";
import SiteHeader from "./SiteHeader";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <SiteHeader />

      <Box w="100%">{children}</Box>
      {/* <Footer  /> */}
    </>
  );
};

export default Layout;
