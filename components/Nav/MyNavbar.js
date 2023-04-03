import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Great_Vibes } from "next/font/google";
import React from "react";
import { Link } from "react-scroll";
import { ThemeModeToggler } from "../Icons/ThemeModeToggler";
import { links } from "@/pages/api/links";
import { FaAlignJustify } from "react-icons/fa";


const greatVibe = Great_Vibes({
  weight: ["400", "400"],
  subsets: ["latin"],
});


const MyNavbar = React.forwardRef((props, ref) => {
  const navBg = useColorModeValue("white", "gray.800");


  return (
    <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
<<<<<<< HEAD
      <div className="text-[23px] container flex items-center justify-between px-12 py-4 mx-auto">
        <div className={`text-[35px] font-bold ${greatVibe.className}`}>Golden Nails n Facial</div>
=======
      <div className="text-[22px] container flex items-center justify-between px-1 py-3 mx-auto">
        <div className={`text-[34px] font-bold ${lobsterTwo.className}`}>Golden Nails n Facial</div>
>>>>>>> f9b76eef6d0c3589de3c15d20e7bec03a4b0a370
        <div className="hidden gap-10 md:flex">
          {links.map(({ name, to, id, href }) => (
            <Link
              key={id}
              to={to}
              smooth={true}
              spy={true}
              offset={0}
              duration={500}
              href={href}
              className="cursor-pointer hover:text-emerald-700"
            >
              {name}
            </Link>
          ))}


          <div className="text-sm">
            <ThemeModeToggler />
          </div>
        </div>


        <div className="md:hidden flex space-x-4">
          <ThemeModeToggler />
          <IconButton onClick={props.onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        </div>
      </div>
    </Flex>
  );
});

export default MyNavbar;
