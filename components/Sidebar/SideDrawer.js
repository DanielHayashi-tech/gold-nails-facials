import {
  Box,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { links } from "@/pages/api/links";
import { Link } from "react-scroll";

export default function SideDrawer({ isOpen, ref, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      finalFocusRef={ref}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Nailed By Ingelosi</DrawerHeader>
        <DrawerBody>
          {links.map(({ name, to, id, icon }, index) => (
            <Collapse
              key={index}
              in={isOpen}
              animateOpacity
              style={{ marginTop: "0!important" }}
            >
              <Link
                smooth={true}
                spy={true}
                duration={500}
                key={id}
                to={to}
                className="hover:text-teal-600 cursor-pointer text-2xl font-extrabold flex m-[20px]  justify-center items-center"
              >
                {icon}
                {name}
              </Link>
            </Collapse>
          ))}
        </DrawerBody>

        <DrawerFooter>
          <Box>2023. All rights reserved. Ingelosi.</Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

