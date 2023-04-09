import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';



export default function AddEmployeeForm({ handleCancelForm }) {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address_1, setaddressOne] = useState("");
    const [address_2, setaddressTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [error, setError] = useState(null);

    const { getToken } = useAuth();


    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
          const token = await getToken();
    
          const response = await fetch('/api/admin/addEmployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                email_address: email,
                address_1: address_1,
                address_2: address_2,
                city: city,
                state: state,
                zip_code: zipCode,

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




    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center" >
                <div className="col-md-8" >
                    <div className="card shadow-lg rounded-lg">
                        <div className="card-header">
                            <h3 className="text-center"
                                style={{
                                    fontFamily: "Lobster",
                                    fontWeight: "600",
                                    fontSize: "3rem",
                                    marginBottom: "1rem",
                                    color: "#EAC8E7"
                                }}> Add a new Employee Form
                            </h3>
                        </div>

                        <div className="card-body text-center place-content-center">
                            <Form onSubmit={handleAddEmployee}>
                                <Form.Group controlId="formBasicFirstName" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem"
                                        }}> First Name </Form.Label>
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
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem"
                                        }}> Last Name </Form.Label>
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

                                <Form.Group controlId="formbasicphonenumber" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
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
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}>Email Address</Form.Label>
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

                                <Form.Group controlId="formBasicAddress" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Adress 1</Form.Label>
                                    <Form.Control
                                        type="address"
                                        className="w-96 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Address 1"
                                        value={address_1}
                                        onChange={(event) => setaddressOne(event.target.value)}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicAddress" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Adress 2</Form.Label>
                                    <Form.Control
                                        type="address"
                                        className="w-96 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Address 2"
                                        value={address_2}
                                        onChange={(event) => setaddressTwo(event.target.value)} 
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicCity" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> City </Form.Label>
                                    <Form.Control
                                        type="city"
                                        className="w-36 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="City"
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)} />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicState" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> State  </Form.Label>
                                    <Form.Control
                                        type="state"
                                        className="w-24 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="State"
                                        value={state}
                                        onChange={(event) => setState(event.target.value)} />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicZipcode" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Zipcode </Form.Label>
                                    <Form.Control
                                        type="zipcode"
                                        className="w-24 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Zipcode"
                                        value={zipCode}
                                        onChange={(event) => setZipCode(event.target.value)} />
                                </Form.Group>
                                <br></br>

                                <Button
                                    variant="light"
                                    type="submit"
                                    className="btn-block custom-button w-48 mt-2 mb-3"
                                    style={{
                                        fontFamily: "Open Sans", // Change to the desired cursive font
                                        fontWeight: "400",
                                        backgroundColor: "#FFE1F8",
                                        fontSize: '19px'
                                    }}>
                                    Add Employee
                                </Button>

                                <div className="card-footer pt-20">
                                    <Button
                                        variant="light"
                                        onClick={handleCancelForm}
                                        className="btn-block custom-button mt-2 absolute bottom-5 right-4"
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            backgroundColor: '#FFE1F8',
                                            fontSize: '19px'
                                        }}>
                                        Home
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
