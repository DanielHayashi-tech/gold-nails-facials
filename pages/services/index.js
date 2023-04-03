import Head from "next/head";
import ServicesNavbar from "../../components/Nav/ServicesNavbar";
import Contact from "../../components/Contact/Contact";
import ManicureService from "@/components/MenuServices/ManicureService";
import PedicureeService from "@/components/MenuServices/PedicureService";
import WaxingService from "@/components/MenuServices/WaxingService";
import MyFooter from "../../components/Footer/MyFooter";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../../components/Sidebar/SideDrawer";
import { useRouter } from 'next/router';
import { useAuth } from '../..//context/AuthContext.js';
import React, { useEffect } from 'react';


async function handleSignUp(token) {
  console.log(token)
  // Send a POST request to the /api/register route with the user's information
  const response = await fetch('/api/dashboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
    } 
  
  });
  
  if(!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json();
  console.log(data)
  return data
}



export default function Services()  {
  
  const { authUser, loading, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])


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
        <button onClick={handleSignUp}></button>
        <ManicureService />
        <PedicureeService />
        <WaxingService />
        <MyFooter date="2023" rights="All rights reserved." />
        <button onClick={ async () => { 
          try {
            await handleSignUp(getUser.getIdToken)

          }
          catch( error) {
            console.log(error)
          }
          
          }}>Tesr</button>
      </main>
    </>
  );
}

