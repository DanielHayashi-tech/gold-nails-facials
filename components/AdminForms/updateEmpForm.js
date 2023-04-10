// components/UpdateEmployeeForm.js
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function UpdateEmployeeForm({ handleCancelForm }) {
    const router = useRouter();
    const [EmployeeID, setEmployeeID] = useState('');
    const [employeeData, setEmployeeData] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address_1, setAddress_1] = useState('');
    const [address_2, setAddress_2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [error, setError] = useState(null);

    const { getToken } = useAuth();

    useEffect(() => {
        if (EmployeeID) {
            fetchEmployeeData();
        }
    }, [EmployeeID]);

    const fetchEmployeeData = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`/api/employees/${EmployeeID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            setEmployeeData(data);
            setFirstName(data.first_name || '');
            setLastName(data.last_name || '');
            setPhoneNumber(data.phone_number || '');
            setEmail(data.email_address || '');
            setAddress_1(data.address_1 || '');
            setAddress_2(data.address_2 || '');
            setCity(data.city || '');
            setState(data.state || '');
            setZipCode(data.zip_code || '');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        try {
            if (!EmployeeID) {
                throw new Error('Employee ID is required');
            }
    
            const token = await getToken();
    
            const response = await fetch(`/api/employees/${EmployeeID}`, {

                method: 'PUT',
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
                throw new Error(response.statusText);
            }
    
            const data = await response.json();
            console.log(data);
            alert('Employee updated successfully');
        } catch (error) {
            console.log(error);
            setError(error.message);
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
                                }}> Update Employee Form
                            </h3>
                        </div>

                        <div className="card-body text-center place-content-center">
                            <Form onSubmit={handleUpdateEmployee}>
                                <Form.Group controlId="formBasicEmployeeID" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem"
                                        }}> Employee ID </Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="w-24 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder=" Emp ID"
                                        value={EmployeeID}
                                        onChange={(event) => setEmployeeID(event.target.value)}
                                        required />
                                </Form.Group>
                                <br></br>

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
                                        }}> Address 1</Form.Label>
                                    <Form.Control
                                        type="address"
                                        className="w-96 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Address 1"
                                        value={address_1}
                                        onChange={(event) => setAddress_1(event.target.value)}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicAddress" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Address 2</Form.Label>
                                    <Form.Control
                                        type="address"
                                        className="w-96 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Address 2"
                                        value={address_2}
                                        onChange={(event) => setAddress_2(event.target.value)}
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
                                        fontFamily: "Open Sans",
                                        fontWeight: "400",
                                        backgroundColor: "#FFE1F8",
                                        fontSize: '19px'
                                    }}>
                                    Update Employee
                                </Button>

                                <div className="card-footer pt-20">
                                    <Button
                                        variant="light"
                                        onClick={handleCancelForm}
                                        className="btn-block custom-button mt-2 absolute bottom-5 right-4"
                                        style={{
                                            fontFamily: "Open Sans",
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
