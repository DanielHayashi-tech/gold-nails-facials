import { PrismaClient } from "@prisma/client";
import { initFirebase } from '@/lib/firebaseApp';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Courgette } from "next/font/google";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from './LoginForm.module.css';
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPasswordForm'; // Import the ForgotPasswordForm component

const cougerette = Courgette({
  weight: ["400", "400"],
  subsets: ["latin"],
});

export default function LoginForm() {
  //initializing configuration
  initFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { resetPassword } = useAuth();

  const auth = getAuth();


  
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIN } = useAuth();


    const handleLogin = async (e) => {
      e.preventDefault();
      signIN(email, password)
        .then((authUser) => {
          if (!authUser.user.emailVerified) {
            console.log("Please verify your email.");
            alert("Please verify your email.");
            setError("Please verify your email.");
            return;
          }
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              router.push("/dashboard/" + uid);
            }
        });
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

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    router.push("/forgotPass");
  }

  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false);
  }

  if (showForgotPassword) {
    return (
      <div className="container my-5 py-5" style={{ backgroundColor: "#FFE1F8" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3
                  className="text-center"
                  style={{
                    fontFamily: "Lobster",
                    fontWeight: "600",
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    color: "#EAC8E7",
                  }}
                >
                  My Golden Nails
                </h3>
              </div>      
              <div className="card-body">
                <ForgotPasswordForm onCancel={handleCancelForgotPassword} />
              </div>         
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 py-5" style={{ backgroundColor: "#FFE1F8" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3
                className="text-center"
                style={{
                  fontFamily: "Lobster", // Change to the desired cursive font
                  fontWeight: "600",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#EAC8E7",
                  // textShadow: "0 0 5px black", // add text-shadow property 
                }}>
                My Golden Nails
              </h3>

            </div>
            <br></br>
            <div className="card-body text-center place-content-center">
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail" className="grid place-content-start md:place-content-center">
                  <Form.Label 
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                    fontWeight: "400",
                    fontSize: "1.3rem",
                  }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    className="w-96 text-center"
                    style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                    fontWeight: "500",
                    fontSize: "1rem",
                    backgroundColor: "#FFE1F8" }}
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicPassword" className="grid place-content-start md:place-content-center">
                  <Form.Label 
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                    fontWeight: "500",
                    fontSize: "1.3rem",
                  }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="w-96 text-center"
                    style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                    fontWeight: "500",
                    fontSize: "1rem",
                    backgroundColor: "#FFE1F8" }}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </Form.Group>
                <br></br>
                {error && <p className="text-danger mb-3">{error}</p>}
              


            <Button
              variant="light"
              type="submit"
              className="btn-block custom-button w-32 mt-2 mb-3"
              style={{ fontFamily: "Open Sans", // Change to the desired cursive font
              fontWeight: "400",
              backgroundColor: "#FFE1F8", 
              fontSize: '19px' }}>
              Login
            </Button>
            </Form>
            </div>
            <br></br>



            <div className="card-footer text-center" >
              <br></br>
              
              <div className="grid grid-cols-2 gap-32"><div>
              <div className="text-medium"  style={{
                    fontFamily: "Open Sans",
                    fontWeight: "540",
                    fontSize: "1.2rem",
                  }}>
                Don't have an account? </div>

                <Button
                variant="light"
                className="btn-block custom-button mt-2"
                onClick={goToSignUp}
                style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                fontWeight: "400",
                backgroundColor: "#FFE1F8", 
                fontSize: '18px'  }} >
                Sign Up Here
              </Button>
                </div>
                <div>
                <div className="text-medium"  style={{
                    fontFamily: "Open Sans",
                    fontWeight: "540",
                    fontSize: "1.2rem",
                  }}>
                Forgot your password? </div>

                <Button
                variant="light"
                className="btn-block custom-button mt-2"
                onClick={handleForgotPassword}
                style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                fontWeight: "400",
                backgroundColor: "#FFE1F8", 
                fontSize: '18px'  }}>
                Forgot Password
              </Button>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
