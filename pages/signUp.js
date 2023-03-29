import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';


export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const { create_account } = useAuth();


  const handleSignUp = async (e) => {
    e.preventDefault();
    create_account(email, passwordOne)
      .then(authUser => {
        console.log("Success. The user is created in Firebase")
        router.push("/");
      })
      .catch(error => {
        console.log(error)
        alert("That email is already in use.")
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
  }



  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1 className="text-center my-3 ">Sign Up</h1>
      <Form onSubmit={handleSignUp}>
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
            onChange={(event) => setPasswordOne(event.target.value)}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
