import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { H3, H4 } from "./Headings";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  // handle loading, logged in and logged out
  const [{ data, fetching }] = useMeQuery();
  let authContent = null;

  // data is loading
  if (fetching) {
    authContent = null;
  } else if (!data?.me) {
    authContent = (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    );
  } else {
    authContent = (
      <Flex flexDirection="row" justifyContent="space-between">
        <H4>{data.me.username}</H4>
        <Button mt="3" ml="3" variant="link">
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <IconButton
        ref={btnRef}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        onClick={onOpen}
        icon={<HamburgerIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <Stack direction="column">{authContent}</Stack>
              <Divider my="4"></Divider>
            </DrawerBody>

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default NavDrawer;
