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
      console.log('here is my authuser', authUser);
      const user = authUser.user;
      const token = await user.getIdToken();


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
      console.log(data);
      router.push("/"); // Redirect to EmailVerification page

    } catch (error) {
      console.log(error)
      alert("Account Created! Please Check Your Email For Verification.")
      router.push("/");
      // An error occurred. Set error message to be displayed to user
      setError(error.message)
    }
  };


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

            <div className="card-body text-center place-content-center">
              <Form onSubmit={handleSignUps} >
                <Form.Group controlId="formBasicFirstName" className="grid place-content-start md:place-content-center">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicLastName" className="grid place-content-start md:place-content-center">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicDate" className="grid place-content-start md:place-content-center">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    className="w-40 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Fornat: YYY/MM/DD"
                    value={birthday}
                    onChange={(event) => setBirthday(event.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formbasicphonenumber" className="grid place-content-start md:place-content-center">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    className="w-48 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Format: XXXXXXXXXX"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required />
                </Form.Group>
                <br></br>


                <Form.Group controlId="formBasicEmail" className="grid place-content-start md:place-content-center">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicPassword" className="grid place-content-start md:place-content-center">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Password"
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                    required />
                </Form.Group>
                <br></br>
                <Button
                  variant="light"
                  type="submit"
                  className="btn-block custom-button w-32 mt-2 mb-3"
                  style={{ backgroundColor: "#FFE1F8", fontSize: '18px' }}>
                  Sign Up
                </Button>
              </Form>
            </div>

            <div className="card-footer pt-20">
              <Button
                variant="light"
                onClick={handletakemebacktologin}
                className="btn-block custom-button mt-2 absolute bottom-5 right-4"
                style={{ backgroundColor: '#FFE1F8', fontSize: '18px' }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
