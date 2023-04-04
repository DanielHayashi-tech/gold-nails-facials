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
  import { ThemeModeToggler } from "../Icons/ThemeModeToggler";
  import { FaAlignJustify } from "react-icons/fa";
  import { serviceslinks } from "../../pages/api/serviceslinks";
  
  
  const greatVibe = Great_Vibes({
    weight: ["400", "400"],
    subsets: ["latin"],
  });
  
  
  const ServicesNavbar = React.forwardRef((props, ref) => {
    const navBg = useColorModeValue("white", "gray.800");
  
  
    return (
      <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
      <div className="text-[18px] container flex items-center justify-between px-8 py-2">
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
                className="cursor-pointer hover:text-emerald-700">
                {name}
              </Link>
            ))}
  
  
            <div className="text-sm">
              <ThemeModeToggler />
            </div>
          </div>
  
  
          <div className="md:hidden flex space-x-6">
            <ThemeModeToggler />
            <IconButton onClick={props.onOpen}>
              <Icon as={FaAlignJustify} />
            </IconButton>
          </div>
        </div>
      </Flex>
    );
  });
  
  export default ServicesNavbar;
  