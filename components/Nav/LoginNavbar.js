import {
    Box,
    Flex,
    IconButton,
    useColorModeValue,
    Icon,
  } from "@chakra-ui/react";
  import { Lobster_Two } from "next/font/google";
  import React from "react";
  import { Link } from "react-scroll";
  import { loginlinks } from "@/pages/api/loginlinks";
  import { FaAlignJustify } from "react-icons/fa";
  
  
  const lobsterTwo = Lobster_Two({
    weight: ["400", "400"],
    subsets: ["latin"],
  });
  
  
  const LoginNavbar = React.forwardRef((props, ref) => {
    const navBg = useColorModeValue("white", "gray.400");
  
  
    return (
      <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
        <div className="text-[22px] container flex items-center justify-between px-1 py-3 mx-auto">
          <div className={`text-[34px] font-bold ${lobsterTwo.className}`}>Golden Nails n Facial</div>
          <div className="hidden gap-10 md:flex">
          </div>
        </div>
      </Flex>
    );
  });
  
  export default LoginNavbar;
  