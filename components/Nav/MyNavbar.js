import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Raleway } from "next/font/google";
import React from "react";
import { Link } from "react-scroll";
import { links } from "@/pages/api/links";
import { FaAlignJustify } from "react-icons/fa";


const raleway = Raleway({
  weight: ["500", "500"],
  subsets: ["cyrillic"]
});


const MyNavbar = React.forwardRef((props, ref) => {
  const navBg = useColorModeValue("#faf3f7", "gray.400");


  return (
    <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
      <div className="text-[22px] container flex items-center justify-between px-12 py-4 mx-auto">
        <div className={`text-[35px] font-bold ${raleway.className}`}>Golden Nails n Facial</div>
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
              className="cursor-pointer hover:text-pink-900"
            >
              {name}
            </Link>
          ))}


          <div className="text-sm">
            
          </div>
        </div>


        <div className="md:hidden flex space-x-4">
          
          <IconButton onClick={props.onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        </div>
      </div>
    </Flex>
  );
});

export default MyNavbar;
