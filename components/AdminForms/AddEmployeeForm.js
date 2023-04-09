import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';





export default function AddEmployeeForm({ handleCancelForm }) {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);




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
                            <Form >
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
                                        placeholder="Enter First Name"
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
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicDate" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
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
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Button
                                    variant="light"
                                    //   type="submit"
                                    className="btn-block custom-button w-32 mt-2 mb-3"
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
