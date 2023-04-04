import Head from "next/head";
import Hero from "../../components/Hero/Hero";
import MyNavbar from "../../components/Nav/MyNavbar";
import Service from "../../components/Service/Service";


import About from "../../components/About/About";
import MyFooter from "../../components/Footer/MyFooter";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../../components/Sidebar/SideDrawer";


import { useRouter } from 'next/router';
import { useAuth } from '../..//context/AuthContext.js';
import React, { useEffect } from 'react';

const name = "Mindful Solutions brings to you the next wave of nails and beauty services.";
const siteTitle = "Mindful Solutions Co.";

// async function getPrices() {
//   const resp = await fetch('/api/dashboard?token=test', {
//     method: 'GET',

//   })
//   if(!resp.ok) {
//     throw new Error(resp.statusText)
//   }
//   return await resp.json();
// }

async function handleSignUp(token) {
  console.log(token)
  // Send a POST request to the /api/register route with the user's information
  const response = await fetch('/api/dashboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
    } 
  
  });
  
  if(!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json();
  console.log(data)
  return data
}

export default function Dashboard()  {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const refBtn = useRef(null);

  const { authUser, loading, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])


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
        <About desc={<p style={{ fontSize: '25px' }}> Welcome to Golden Nails and Facials, where we provide top-quality 
          nail and skincare services in a relaxing and inviting atmosphere. 
          Our team of experienced technicians is dedicated to helping you look and feel your best, 
          using only the highest quality products and techniques.</p>

        } />
        <Service />
        <MyFooter date="2023" rights="All rights reserved." />
        <button onClick={ async () => { 
          try {
            console.log()
            await handleSignUp(await getToken())

          }
          catch( error) {
            console.log(error)
          }
          
          }}>Tesr</button>
      </main>
    </>
  );
}

