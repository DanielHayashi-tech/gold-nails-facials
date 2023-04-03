import { useAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';



export default function LogoutButton() {
    const router = useRouter();
    const { authUser, loading, signOut } = useAuth();


    useEffect(() => {
      if (!loading && !authUser)
        router.push('/')
    }, [authUser, loading])


    return (
      <div>
        <button style={{ 
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '10px', 
        width: '100px',
        height: '50px',
        position: 'absolute',
        top: '120%', 
        left: '50%',
        transform: 'translate(-50%, -50%)'}}
        onClick={() => signOut()}>Log Out</button>
      </div>
    );
  }