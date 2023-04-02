import { PrismaClient } from "@prisma/client";
import { initFirebase } from '@/lib/firebaseApp';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';


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
    <div className="container my-5 py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-lg mt-5">
          <div className="card-header">
            <h3
              className="text-center"
              style={{
                fontFamily: "cursive",
                fontWeight: "600",
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              My Golden Nails N' Facials
            </h3>
          </div>
          <div className="card-body">
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

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
                className="btn-block"
                style={{ backgroundColor: "#007bff" }}
              >
                Login
              </Button>
            </Form>
          </div>
          <div className="card-footer text-center">
            <div className="small">
              Don't have an account?{" "}
              <Button
                variant="success"
                className="p-0 m-0"
                onClick={goToSignUp}
              >
                Sign Up Now
              </Button>
            </div>
            <hr className="my-2" />
            <div className="text-center">
              <Button
                variant="outline-primary"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
