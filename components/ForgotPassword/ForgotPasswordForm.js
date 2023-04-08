import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function ForgotPasswordForm({ onCancel }) {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("Password reset email sent. Check your inbox.");
      router.push("/");
      } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  const handletakemebacktologin = async () => {
    router.push("/");
  }

  return (
    <div className="container my-5 py-5" style={{

      backgroundColor: "white"
      }} >
      <div className="row justify-content-center" >
        <div className="col-md-8" >
          <div className="card shadow-lg rounded-lg">
            <div className="card-header">
              <h3
                className="text-center"
                style={{
                  fontFamily: "Lobster", // Change to the desired cursive font
                  fontWeight: "600",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#FFE1F8",
                  // textShadow: "0 0 5px black", // add text-shadow property 
                }}>
                My Golden Nails
              </h3>

            </div>
            <div>
              <Form onSubmit={handleSubmit} className="">
                <Form.Group controlId="formBasicEmail" className="grid place-content-start md:place-content-center">
                  <Form.Label className='text-center pt-10'

                  >Email address</Form.Label>
                  <Form.Control
                    type="email"
                    className="w-96 text-center "
                    style={{ backgroundColor: "#FFE1F8" }}

                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </Form.Group>
                <br></br>
                <div className="pt-10">

                  {error && <p className="text-danger mb-3">{error}</p>}
                  <Button
                    variant="light"
                    type="submit"
                    className="btn-block custom-button mt-2  absolute bottom-3 left-4"
                    style={{ backgroundColor: "#FFE1F8", fontSize: '18px' }} >
                    Send Reset Email
                  </Button>
                </div>

                <Button
                  variant="light"
                  className="btn-block custom-button mt-2 absolute bottom-3 right-4"
                  onClick={handletakemebacktologin}
                  style={{ backgroundColor: '#FFE1F8', fontSize: '18px' }}>
                  Cancel
                </Button>
              </Form>

            </div>
          </div>
       </div>     
     </div>
  </div>   
  );
}
