import Head from "next/head";
import ServicesNavbar from "../../components/Nav/ServicesNavbar";
import Contact from "../../components/Contact/Contact";
import ManicureService from "@/components/MenuServices/ManicureService";
import PedicureeService from "@/components/MenuServices/PedicureService";
import WaxingService from "@/components/MenuServices/WaxingService";
import PowderNailsService from "@/components/MenuServices/PowderNailsService";
import FacialService from "@/components/MenuServices/FacialService";
import PackageService from "@/components/MenuServices/PackageService";
import AdditionalService from "@/components/MenuServices/AdditionalService";
import MyFooter from "../../components/Footer/MyFooter";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../../components/Sidebar/SideDrawer";
import { useRouter } from 'next/router';
import { useAuth } from '../..//context/AuthContext.js';
import React, { useEffect } from 'react';
import { PrismaClient } from '@prisma/client'



async function handleSignUp(token, cart) {
  // Send a POST request to the /api/register route with the user's information
  const response = await fetch('/api/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
    }, 
    body: JSON.stringify({
      data: cart
    }),
  });
  
  if(!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json();
   cart = []
  console.log(data)
  return data
}

 async function getPrices(prisma, id) {
  const posts = await prisma.service.findMany({
    select: {
      ServiceID: true,
      service_price: true,
      service_description: true,
      service_title: true
    },
    where: {
      Service_Type: {service_typeID: id},

    },
  })
  return posts
 }
export async function getStaticProps() {
  const prisma = new PrismaClient()
  const mani = await getPrices(prisma, 2)
  const padi = await getPrices(prisma, 1)
  const wax = await getPrices(prisma, 3)
  const facials = await getPrices(prisma, 4)
  const pdn = await getPrices(prisma, 5)
  const add = await getPrices(prisma, 7)
  const packages = await getPrices(prisma, 6)


return { props: { mani, padi, wax,facials, pdn, add, packages} }
}



export default function Services(props)  {
  
  const { authUser, loading, getToken, cart } = useAuth();
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
        <meta className="description" content="" />
        <meta className="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ServicesNavbar onOpen={onOpen} isOpen={isOpen} ref={refBtn} />
      <main>
        <SideDrawer ref={refBtn} onClose={onClose} isOpen={isOpen} />
        {/* <button onClick={handleSignUp}></button> */}
        <ManicureService prices={props.mani}/>
        <PedicureeService prices={props.padi}/>
        <WaxingService prices={props.wax}/>
        <FacialService prices={props.facials}/>
        <PowderNailsService prices={props.pdn}/>
        <PackageService prices={props.packages}/>
        <AdditionalService prices={props.add}/>

        <button class='btn' onClick={ async () => { 
          try {
            await handleSignUp( await getToken(), cart)
          
          }
          catch( error) {
            console.log(error)
          }
          
          }}>Submit Order</button>

        <MyFooter date="2023" rights="All rights reserved." />
        
      </main>
    </>
  );
}

