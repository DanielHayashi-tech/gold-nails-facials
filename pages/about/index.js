import { initFirebase } from '../../lib/firebaseApp';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/navBar';
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import About from '../../components/about';

export default function Dashboard() {
  const router = useRouter();
  const { authUser, loading, getUser, signOut } = useAuth();

  const [pageNumber, setPageNumber] = useState(8);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const dataArray = new Array(30).fill(0).map((_, i) => i + 1);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const refBtn = useRef();

  useEffect(() => {
    if (!loading && !authUser) router.push('/');
  }, [authUser, loading]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`YOUR_API_URL?page=${pageNumber}`);
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]);
      setHasMore(newData.length > 0);
    }

    fetchData();
  }, [pageNumber]);

  function loadMore() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  return (

    <head>
      
    </head>,
    
    <NavBar onOpen={onOpen} isOpen={isOpen} ref={refBtn}/>,

    <main>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0 }}>Welcome Back sample user</h2>
        <br />
        
        <button onClick={() => signOut()}>Log Out</button>

        <div style={{ backgroundColor: 'white', height: '250px', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="goldennailslogo.png" alt="Company logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {dataArray.slice(21).map((item) => (
            <div
              key={item}
              style={{
                flexBasis: '30%',
                margin: '5px',
                backgroundColor: 'white',
                height: '50px',
                border: '1px solid black',
              }}
            >
              {`Menu Item `}
            </div>
          ))}
        </div>

        {hasMore && (
          <div>
            {/* Render whatever you want to indicate that more data is loading */}
          </div>
        )}

        {!hasMore && (
          <div>
            {/* Render whatever you want to indicate that there is no more data */}
          </div>
        )}

        <About style={{ marginTop: '50px', borderTop: '1px solid black' }}>
          <h3>About Us</h3>
          <p>Or we can add an Image here to reflect the company</p>
         </About>
      </div>
    </div>
    </main>
  );
}