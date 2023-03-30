import { initFirebase } from '../../lib/firebaseApp';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';


export default function Dashboard() {
    // const auth = getAuth();
    const router = useRouter();
    const userName = "";
    // const[user, loading] = useAuthState(auth);
    const { authUser, loading, getUser, signOut } = useAuth();


    useEffect(() => {
      if (!loading && !authUser)
        router.push('/')
    }, [authUser, loading])

    return (
      <div>
        <h2> Welcome {} </h2>
        <br></br>
        <h5> Click the button below me to signout!</h5>
        <button onClick={() => signOut()}>Log Out</button>
      </div>
    );
  }