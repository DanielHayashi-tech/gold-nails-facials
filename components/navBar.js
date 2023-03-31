import React from 'react'
import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-scroll";
import ActiveLink from './ActiveLink';
import { links } from '../pages/api/links';
import { Scroll } from 'react-scroll/modules';
import ScrollDownButton from './scrolldown';

export default function NavBar() {
  const navBg = useColorModeValue("white", "gray.800");

  return (
    <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto"/>
        <div className={`text-[24px]`}>Golden Nails and Salon</div>

        <div className="hidden gap-6 md:flex">
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
          </div>
        </div>

        <div className="md:hidden flex space-x-6">
      </div>
    </Flex>
  );
};
