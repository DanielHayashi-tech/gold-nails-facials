import Head from "next/head";
import ServicesNavbar from "../../components/Nav/ServicesNavbar";
import Contact from "../../components/Contact/Contact";
import ManicureService from "@/components/MenuServices/ManicureService";
import PedicureeService from "@/components/MenuServices/PedicureService";
import MyFooter from "../../components/Footer/MyFooter";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../../components/Sidebar/SideDrawer";




export default function Services()  {

  const { onOpen, onClose, isOpen } = useDisclosure();
  const refBtn = useRef(null);

  return (
    <>
      <Head>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ServicesNavbar onOpen={onOpen} isOpen={isOpen} ref={refBtn} />

      <main>
        <SideDrawer ref={refBtn} onClose={onClose} isOpen={isOpen} />
        
        <ManicureService />
        <PedicureeService />

        <Contact />
        <MyFooter date="2023" rights="All rights reserved." />
      </main>
    </>
  );
}

