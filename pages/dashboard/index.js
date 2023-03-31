// import { initFirebase } from '../../lib/firebaseApp';
// import React, { useState, useEffect } from 'react';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useRouter } from 'next/router';
// import { useAuth } from '../../context/AuthContext';
// import NavBar from '../../components/navBar';
// import { useDisclosure } from "@chakra-ui/react";
// import About from '../../components/about';
// import Head from "next/head";
// import { useRef } from "react";

import Head from "next/head";
import Hero from "../../components/Hero/Hero";
import MyNavbar from "../../components/Nav/MyNavbar";
import Service from "../../components/Service/Service";
import Contact from "../../components/Contact/Contact";

import About from "../../components/About/About";
import MyFooter from "../../components/Footer/MyFooter";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../../components/Sidebar/SideDrawer";


const name = "Nailed By Ingelosi is a salon that offers menicure and pedicure.";
const siteTitle = "Ingelosi";

export default function Dashboard() {
  // const router = useRouter();
  // const { authUser, loading, getUser, signOut } = useAuth();

  // const [pageNumber, setPageNumber] = useState(8);
  // const [data, setData] = useState([]);
  // const [hasMore, setHasMore] = useState(true);

  // const dataArray = new Array(30).fill(0).map((_, i) => i + 1);

  // const { onOpen, onClose, isOpen } = useDisclosure();
  // const refBtn = useRef();

  // useEffect(() => {
  //   if (!loading && !authUser) router.push('/');
  // }, [authUser, loading]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`YOUR_API_URL?page=${pageNumber}`);
  //     const newData = await response.json();
  //     setData((prevData) => [...prevData, ...newData]);
  //     setHasMore(newData.length > 0);
  //   }

  //   fetchData();
  // }, [pageNumber]);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const refBtn = useRef();

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
          title="Nailed By Ingelosi"
        />
        <About
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. A sequi
              vitae doloremque quas ex fugiat earum obcaecati quod laudantium
              aliquam dicta, sapiente in cum. Culpa vitae quam obcaecati
              nesciunt incidunt."
          street="1234 Maddison Str"
          city="Protea Glen, Soweto"
        />
        <Service />
        <Contact />
        <MyFooter date="2023" rights="All rights reserved." />
      </main>
    </>
  );
}

