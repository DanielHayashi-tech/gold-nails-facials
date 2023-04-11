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
import { FaAlignJustify } from "react-icons/fa";
import { serviceslinks } from "../../pages/api/serviceslinks";
import route from 'next/link'

const greatVibe = Great_Vibes({
  weight: ["400", "400"],
  subsets: ["latin"],
});

const ServicesNavbar = React.forwardRef((props, ref) => {
  const navBg = useColorModeValue("#faf3f7", "gray.800");

  return (
    <Flex
      top="0"
      w="100%"
      zIndex="sticky"
      bg={navBg}
      position="fixed"
      ref={ref}
      direction="column"
      borderWidth="2px"
      borderColor="pink.500"
      borderRadius="md"
      p="1"
    >
      <Flex className="container w-100 py-1">
        <div className={`text-[35px] font-bold ${greatVibe.className}`}>
          Golden Nails n Facial
        </div>
        <div className="md:hidden flex space-x-6">
          <IconButton onClick={props.onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>

        </div>
        <route href="/order">Checkout</route>

      </Flex>
      <Flex justifyContent="space-evenly" className="hidden md:flex">
        {serviceslinks.map(({ name, to, id, href }) => (
          <Link
            key={id}
            to={to}
            smooth={true}
            spy={true}
            offset={0}
            duration={500}
            href={href}
            className="cursor-pointer hover:text-pink-800 border p-1 border-pink-500 rounded-md"
            activeClass="text-pink-500 glow"
          >
            {name}
          </Link>
        ))}
      </Flex>
      <style jsx>{`
        .glow {
          text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4;
        }
      `}</style>
    </Flex>
    
  );
});

export default ServicesNavbar;
