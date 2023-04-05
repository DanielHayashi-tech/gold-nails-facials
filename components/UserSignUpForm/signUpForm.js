import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';


  

export default function SignUpForm() {
  
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [error, setError] = useState(null);

  const { create_account } = useAuth();


  const handleSignUps = async (e) => {
    e.preventDefault();
    try {
      const authUser = await create_account(email, passwordOne);
      console.log("Success. The user is created in Firebase")
      const { uid } = authUser.user;
      console.log(uid)
      const token = await authUser.user.getIdToken();
      console.log(token)
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          birthday: birthday,
          email_address: email,
          phone_number: phoneNumber,
          firebaseuID: uid,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json();
      console.log(data)
      router.push("/");
    } catch (error) {
      console.log(error)
      alert("Try again dummy.")
      // An error occurred. Set error message to be displayed to user
      setError(error.message)
    }
  };


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
      <h1 className="text-center my-20"
    style={{
      fontSize: "6rem",
      fontWeight: "bold",
      color: "#ffe2e7",
      textShadow: "0 0 5px #000000"
    }}>
  Sign Up
</h1>

      <Form onSubmit={handleSignUps}>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            onChange={(event) => setFirstName(event.target.value)}
            required
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label> Last Name</Form.Label>
          <Form.Control
            onChange={(event) => setLastName(event.target.value)}
            required
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirthday">
          <Form.Label> Birthdate</Form.Label>
          <Form.Control
            onChange={(event) => setBirthday(event.target.value)}
            required
            type="date"
            placeholder="Format MM/DD/YYYY"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label> Phone Number</Form.Label>
          <Form.Control
            onChange={(event) => setPhoneNumber(event.target.value)}
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
        <Button 
  variant="primary" 
  type="submit" 
  className="btn-block custom-button cursor-pointer hover:text-pink-900"
  style={{ backgroundColor: "#ffe5e9", fontSize: "1.5rem" }}
>
  Sign Up
</Button>

      </Form>
    </div>
  );
};


