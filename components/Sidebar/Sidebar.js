import { Link } from "react-scroll";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

import { Box, Drawer, useColorModeValue } from "chakra-ui/react";
import { sideVariants, itemVariants } from "../Icons/constants";
import { links } from "../../pages/api/links";



const inter = Inter({
  weight: ["700", "700"],
  subsets: ["latin"],
});

export default function Sidebar({ isOpen, onClose, onOpen, ref }) {
  const sideBg = useColorModeValue("red.500", "blackAlpha.600");

  return (
    <div>
      {/*{props.isOpen && (*/}
      <Drawer
        //as={motion.div}
        //initial={{ width: 0 }}
        //animate={{ width: 300 }}
        fontFamily={inter.className}
        display={isOpen ? "fixed" : "hidden"}
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={ref}
        zIndex="popover"
        placement="left"
        //className={`w-screen h-screen ${
        //props.isOpen ? "fixed" : "hidden"
        //} ${inter.className} z-20 grid place-items-center`}
      >
        <Box
          initial="closed"
          animate="open"
          variants={sideVariants}
          as={motion.div}
          my="4.5rem"
          mx="1.4rem"
        >
          {links.map(({ name, to, id, icon }, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                smooth={true}
                spy={true}
                duration={500}
                key={id}
                to={to}
                className="hover:text-teal-600 cursor-pointer text-2xl font-extrabold flex m-[20px]  justify-center items-center">
                {icon}
                {name}
              </Link>
            </motion.div>
          ))}
        </Box>
      </Drawer>
      {/*)}*/}
    </div>
  );
};