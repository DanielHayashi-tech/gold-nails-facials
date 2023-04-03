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
import React from "react";
import { links } from "@/pages/api/links";
import { Link } from "react-scroll";


const SideDrawer= React.forwardRef((props, ref) => {

  const { isOpen, myref, onClose } = props;
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
        <DrawerHeader>We appreciate you!</DrawerHeader>
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
          <Box>Golden Nails n' Facials</Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
export default SideDrawer;
