import { PrismaClient } from "@prisma/client";
import { initFirebase } from '../lib/firebaseApp';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';


export default function LoginForm() {
  //initializing configuration
  initFirebase();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signIN, googleSignIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    signIN(email, password)
      .then(authUser => {
        console.log("Success. The user is created in Firebase")
        router.push("/dashboard");
      })
      .catch(error => {
        console.log(error)
        alert("Email/Password combination is incorrect.")
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
  }


  const signInWithGoogle = async () => {
    const result = await googleSignIn()
    router.push("/dashboard")
  }

  const goToSignUp = async () => {
    router.push("/signUp");

  }


  return (
    <div>
       <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1 className="text-center my-3 ">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <br></br>
        <br></br>
      </Form>
      <Button onClick={() => goToSignUp()}>Create Account</Button>
      <br></br>
      <br/>
      <Button onClick={() => signInWithGoogle()}> Sign in with Google</Button>

    </div>
    </div>
  );
}