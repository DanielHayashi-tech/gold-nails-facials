import Head from "next/head";
import Hero from "../../components/Hero/Hero";
import MyNavbar from "../../components/Nav/MyNavbar";
import Service from "../../components/Service/Service";


import About from "../../components/About/About";
import MyFooter from "../../components/Footer/MyFooter";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../../components/Sidebar/SideDrawer";


const name = "Mindful Solutions brings to you the next wave of nails and beauty services.";
const siteTitle = "Mindful Solutions.";


export default function Dashboard()  {

  const { onOpen, onClose, isOpen } = useDisclosure();
  const refBtn = useRef(null);

  return (
    <>
      <Head>
        <meta name="description" content={name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
      </Head>

      <MyNavbar onOpen={onOpen} isOpen={isOpen} ref={refBtn} />

      <main>
        <SideDrawer ref={refBtn} onClose={onClose} isOpen={isOpen} />
        <Hero
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          title="Golden Nails & Facials"
        />
        <About
          desc="Welcome to Golden Nails and Facials, where we provide top-quality 
          nail and skincare services in a relaxing and inviting atmosphere. 
          Our team of experienced technicians is dedicated to helping you look and feel your best, 
          using only the highest quality products and techniques."
        />
        <Service />
        <MyFooter date="2023" rights="All rights reserved." />
      </main>
    </>
  );
}

