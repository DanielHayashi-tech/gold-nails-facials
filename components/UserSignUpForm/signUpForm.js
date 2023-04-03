import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function SignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
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
      <h1 className="text-center my-20 ">Sign Up</h1>
      <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            // onChange={(event) => setEmail(event.target.value)}
            required
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label> Last Name</Form.Label>
          <Form.Control
            // onChange={(event) => setEmail(event.target.value)}
            required
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirthday">
          <Form.Label> Birthdate</Form.Label>
          <Form.Control
            // onChange={(event) => setEmail(event.target.value)}
            required
            type="date"
            placeholder="Format MM/DD/YYYY"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label> Phone Number</Form.Label>
          <Form.Control
            // onChange={(event) => setEmail(event.target.value)}
            required
            type="tel"
            placeholder="Format 123-456-7890"
          />
        </Form.Group>
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
