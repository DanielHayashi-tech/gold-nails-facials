import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'


import { initializeApp } from "firebase/app";
import { getAuth, linkWithCredential, signInWithEmailAndPassword   } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrQ36nuiG1-xosnlh2AvW5uaSJS7IYPPo",
  authDomain: "goldennailsfacials.firebaseapp.com",
  projectId: "goldennailsfacials",
  storageBucket: "goldennailsfacials.appspot.com",
  messagingSenderId: "245392999579",
  appId: "1:245392999579:web:6dc628bba4fafef708f23e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Header({ title }) {

 
  
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const router = useRouter()
  console.log(auth)
  function signin() {
    const email = document.querySelector('#email').value
    const passwd = document.querySelector('#passwd').value


    signInWithEmailAndPassword(auth, email, passwd)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      router.push('/')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      alert(errorCode)
    });
  }

  return (
    
    <div>
      <Header title="You made it to the login page! 👾" />
      <button onClick={signin}>Login</button>
      <ul>
          <li><Link href="/">Take me back home</Link></li>
      </ul>
      <form onSubmit={signin}>
        <label>Email</label>
        <input type="text" name="email" id="email" required></input>
        <label>Password</label>
        <input type="password" name="passwd" id="passwd" required></input>
        <button type='submit'>Login</button>
      </form>
      
      <br>
      </br>
      
    </div>
  );
}