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
import NextLink from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const greatVibe = Great_Vibes({
  weight: ["400", "400"],
  subsets: ["latin"],
});

const ServicesNavbar = React.forwardRef((props, ref) => {
  const navBg = useColorModeValue("#faf3f7", "gray.400");

  return (
    <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
      <div className="text-[24px] container flex items-center justify-between px-10 py-4 mx-auto">
        <div className={`text-[40px] font-bold ${greatVibe.className}`}>
          Golden Nails n Facial
        </div>
        <div className="hidden gap-10 md:flex">
          {serviceslinks.map(({ name, to, id, href }) => (
            <Link
              key={id}
              to={to}
              smooth={true}
              spy={true}
              offset={0}
              duration={500}
              href={href}
              className="cursor-pointer hover:text-pink-800 p-1 border-pink-500 rounded-md"
              activeClass="text-pink-500 glow"
            >
              {name}
            </Link>
          ))}
          <Link
            to="bottom"
            smooth={true}
            spy={true}
            offset={0}
            duration={500}
            className="cursor-pointer hover:text-pink-800"
            activeClass="text-pink-500 glow"
          >
            <Icon as={AiOutlineShoppingCart} boxSize="1.5em" />
          </Link>
        </div>
      </div>
      <div className="md:hidden flex space-x-2">
        <IconButton onClick={props.onOpen}>
          <Icon as={FaAlignJustify} />
        </IconButton>
      </div>
      <style jsx>{`
        .glow {
          text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4, 0 0 30px #ff69b4;
        }
      `}</style>
    </Flex>
  );
});

export default ServicesNavbar;
