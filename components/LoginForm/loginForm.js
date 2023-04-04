import { PrismaClient } from "@prisma/client";
import { initFirebase } from '@/lib/firebaseApp';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from "react-bootstrap";
import styles from './LoginForm.module.css';

export default function LoginForm() {
  //initializing configuration
  initFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signIN } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    signIN(email, password)
      .then(authUser => {
        router.push("/dashboard");
      })
      .catch(error => {
        console.log(error)
        alert("Email/Password combination is incorrect.")
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
  }



  const goToSignUp = async () => {
    router.push("/signUp");

  }


  return (
    <div className="container my-5 py-5" style={{ backgroundColor: "" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <br></br>
              <h3
                className="text-center"
                style={{
                  fontFamily: "cyrillic",
                  fontWeight: "300",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#818CF8",
                }}
              >
                My Golden Nails
              </h3>
            </div>
            <div className="card-body"
            style={{
              fontFamily: "cyrillic",
              fontWeight: "300",
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#818CF8",
            }}>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label >Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && <p className="text-danger mb-3">{error}</p>}

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-block custom-button"
                >
                  Login
                </Button>


              </Form>
            </div>
            <div className="card-footer text-center"
            style={{
              fontFamily: "comic sans ms",
              fontWeight: "20",
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "#818CF8",
            }}>
              <div className="medium">
                Don't have an account?{" "}
                <br></br>
                <Button className="btn-block custom-button p-1 m-1" variant="success" type="submit" onClick={goToSignUp}>
                  Sign Up Now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
