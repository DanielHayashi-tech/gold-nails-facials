import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';


// can you delete this comment?



export default function SignUpForm() {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const { create_account } = useAuth();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  const handleSignUps = async (e) => {
    if (passwordOne !== confirmPassword) {
      alert("Passwords do not match. Please try again and ensure your password is 6 characters long.");
      return;
    }

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

      backgroundColor: "#FFE1F8"
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
                  color: "#EAC8E7",
                  // textShadow: "0 0 5px black", // add text-shadow property 
                }}>
                My Golden Nails
              </h3>

            </div>

            <div className="card-body text-center place-content-center">
              <Form onSubmit={handleSignUps} >
                <Form.Group controlId="formBasicFirstName" className="grid place-content-start md:place-content-center">
                  <Form.Label
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                  fontWeight: "400",
                  fontSize: "1.3rem",
                  }}>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicLastName" className="grid place-content-start md:place-content-center">
                  <Form.Label
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                  fontWeight: "400",
                  fontSize: "1.3rem",
                  }}>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicDate" className="grid place-content-start md:place-content-center">
                  <Form.Label
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                  fontWeight: "400",
                  fontSize: "1.3rem",
                  }}>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    className="w-40 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Fornat: YYYY/MM/DD"
                    value={birthday}
                    onChange={(event) => setBirthday(event.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formbasicphonenumber" className="grid place-content-start md:place-content-center">
                  <Form.Label
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                  fontWeight: "400",
                  fontSize: "1.3rem",
                  }}>Phone Number</Form.Label>
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
                  <Form.Label
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                  fontWeight: "400",
                  fontSize: "1.3rem",
                  }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicPassword" className="grid place-content-start md:place-content-center">
        <Form.Label style={{ fontFamily: "Open Sans", fontWeight: "400", fontSize: "1.3rem" }}>Password</Form.Label>
        <Form.Control
          type={password ? "text" : "password"}
          className="w-64 text-center"
          style={{ backgroundColor: "#FFE1F8" }}
          placeholder="Create Password"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          required
        />
      

      </Form.Group>
      <br />
      <Form.Group controlId="formBasicConfirmPassword" className="grid place-content-start md:place-content-center">
        <Form.Label style={{ fontFamily: "Open Sans", fontWeight: "400", fontSize: "1.3rem" }}>Confirm Password</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          className="w-64 text-center"
          style={{ backgroundColor: "#FFE1F8" }}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
  <Button
  variant="light"
  size="sm"
  onClick={togglePasswordVisibility}
  className="btn-block custom-button w-32 mt-2 mb-3"
  style={{
    fontFamily: "Open Sans", // Change to the desired cursive font
    fontWeight: "400",
    backgroundColor: "#FFE1F8",
    fontSize: '16px',
    padding: '5px 10px',
    border: 'none',
    boxShadow: 'none',
    textAlign: 'right'
  }}
>
  {showPassword ? "Hide Password" : "Show Password"}
</Button>



    </Form.Group>
    <br></br>
    
                <Button
                  variant="light"
                  type="submit"
                  className="btn-block custom-button w-32 mt-2 mb-3"
                  style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                  fontWeight: "400",
                    backgroundColor: "#FFE1F8",
                     fontSize: '19px' }}>
                  Sign Up
                </Button>
              </Form>
            </div>

            <div className="card-footer pt-20">
              <Button
                variant="light"
                onClick={handletakemebacktologin}
                className="btn-block custom-button mt-2 absolute bottom-5 right-4"
                style={{ fontFamily: "Open Sans", // Change to the desired cursive font
                fontWeight: "400",
                  backgroundColor: '#FFE1F8',
                 fontSize: '19px' }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
