
 

import {
    Box,
    Flex,
    IconButton,
    useColorModeValue,
    Icon,
  } from "@chakra-ui/react";
  import { Great_Vibes} from "next/font/google";
  import React from "react";
  import { Link } from "react-scroll";
  import { FaAlignJustify } from "react-icons/fa";
  import { serviceslinks } from "../../pages/api/serviceslinks";
  
  
  const greatVibe = Great_Vibes({
    weight: ["400", "400"],
    subsets: ["latin"],
  });
  
  
  const ServicesNavbar = React.forwardRef((props, ref) => {
    const navBg = useColorModeValue("#faf3f7", "gray.800");
  
  
    return (
      <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
      <div className="text-[18px] container flex items-center justify-between w-100 py-1">
        <div className={`text-[35px] font-bold ${greatVibe.className}`}>Golden Nails n Facial</div>
        <div className="hidden gap-6 md:flex">
            {serviceslinks.map(({ name, to, id, href }) => (
              <Link
                key={id}
                to={to}
                smooth={true}
                spy={true}
                offset={0}
                duration={500}
                href={href}
                className="cursor-pointer hover:text-pink-800">
                {name}
              </Link>
            ))}
            
          </div>
          <div className="md:hidden flex space-x-6">
            <IconButton onClick={props.onOpen}>
              <Icon as={FaAlignJustify} />
            </IconButton>
          </div>
        </div>
      </Flex>
    );
  });
  
  export default ServicesNavbar;
  
