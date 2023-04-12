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
import { links } from "@/pages/api/links";
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FaAlignJustify } from "react-icons/fa";


const greatVibe = Great_Vibes({
  weight: ["400", "400"],
  subsets: ["latin"],
});

  const MyNavbar = React.forwardRef((props, ref) => {
  const navBg = useColorModeValue("#faf3f7", "gray.400");

  const router = useRouter();

  const logoutBtn = async () => {
    router.push("/");
  }

  return (
    <Flex top="0" w="100%" zIndex="sticky" bg={navBg} position="fixed" ref={ref}>
      <div className="text-[24px] container flex items-center justify-between px-12 py-4 mx-auto">
        <div className={`text-[40px] font-bold ${greatVibe.className}`}>Golden Nails n Facial</div>
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

        </div>
        </div>

            <Button
              variant="light"
              className="btn-block custom-button w-32 mt-4 mr-8 mb-4"
              onClick={logoutBtn}
              style={{ fontFamily: "Open Sans", // Change to the desired cursive font
              fontWeight: "400",
              backgroundColor: "#FFE1F8", 
              fontSize: '19px' }}>
              Log Out
            </Button>

        <div className="md:hidden flex space-x-2">
          
          <IconButton onClick={props.onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        </div>
    </Flex>
  );
});

export default MyNavbar;
