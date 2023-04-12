// /components/AdminForms/addeEmpSkillForm.js
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';


export default function AddEmployeeSkillForm({ handleCancelForm }) {
    const router = useRouter();
    const { getToken } = useAuth();
    const [error, setError] = useState(null);
    const [EmployeeID, setEmployeeID] = useState('');
    const [SpecialtyID, setSpecialtyID] = useState('');
    const [employee_specialty_statusID, setEmployeeSpecialtyStatusID] = useState('');
    const [firstName, setFirstName] = useState('');

    const [specialty_description, setSpecialtyDescription] = useState('');

    const [employee_specialty_status_description, setEmployeeSpecialtyStatusDescription] = useState('');
    const [specialties, setSpecialties] = useState([]);






    useEffect(() => {
        if (router.query.EmployeeID) {
            setEmployeeID(router.query.EmployeeID);
            fetchEmployeeData(router.query.EmployeeID);
        }
    }, [router.query.EmployeeID]);
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const token = await getToken();
                const response = await fetch('/api/specialties', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const result = await response.json();
                setSpecialties(result.data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };

        fetchSpecialties();
    }, []);

    const fetchSpecialtyDescription = async (SpecialtyID) => {
        const selectedSpecialty = specialties.find((specialty) => specialty.SpecialtyID === parseInt(SpecialtyID, 10));
        if (selectedSpecialty) {
            setSpecialtyDescription(selectedSpecialty.specialty_description);
        }
    };
    const fetchEmployeeData = async (EmployeeID) => {
        if (!EmployeeID || isNaN(EmployeeID)) {
            return;
        }
        try {
            const token = await getToken();

            const response = await fetch(`/api/employee/${EmployeeID}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            console.log('API response:', result);
            const data = result.data;
            console.log('Employee data:', data);

            if (data) {
                setEmployeeID(data.EmployeeID);
                setFirstName(data.first_name);
                // You may need to update these lines based on the new API response structure
                // setSpecialtyID(data.Specialty.SpecialtyID);
                // setSpecialtyDescription(data.Specialty.specialty_description);
                // setEmployeeSpecialtyStatusID(data.Employee_Specialty_Status.employee_specialty_statusID);
                // setEmployeeSpecialtyStatusDescription(data.Employee_Specialty_Status.employee_specialty_status_description);
            }

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };


    const handleAddEmployeeSkill = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();

            const response = await fetch(`/api/employee/${EmployeeID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    SpecialtyID: parseInt(SpecialtyID),
                    employee_specialty_statusID,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error(response.statusText);
            }

            alert('Employee updated successfully');
            handleCancelForm();
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
                                }}> Add Employee Skill Form
                            </h3>
                        </div>

                        <div className="card-body text-center place-content-center">
                            <Form onSubmit={handleAddEmployeeSkill}>
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
                                        onChange={(event) => {
                                            const newEmployeeID = event.target.value;
                                            setEmployeeID(newEmployeeID);
                                            // Call the function to fetch the data for the selected employee
                                            fetchEmployeeData(newEmployeeID);
                                        }}
                                        required
                                    />
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
                                        readOnly
                                        onChange={(event) => {
                                            setFirstName(event.target.value);
                                            fetchEmployeeData(event.target.value);
                                        }}
                                        required
                                    />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="formBasicSpecialtyID" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Specialty </Form.Label>
                                    <Form.Select
                                        className="text-center w-48"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        value={SpecialtyID}
                                        onChange={(event) => setSpecialtyID(event.target.value)}>
                                        <option value="">Choose Status</option>
                                        <option value={1}>Pedicures</option>
                                        <option value={2}>Manicures</option>
                                        <option value={3}>Waxing</option>
                                        <option value={4}>Facials</option>
                                        <option value={5}>Powder Nails</option>
                                    </Form.Select>
                                </Form.Group>

                                <br></br>
                                <Form.Group controlId="formBasicEmployeeStatus" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Employee Status </Form.Label>
                                    <Form.Select
                                        className="text-center w-48"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        value={employee_specialty_statusID}
                                        onChange={(event) => setEmployeeSpecialtyStatusID(parseInt(event.target.value))}>
                                        <option value="">Choose Status</option>
                                        <option value={2}>Not Learned</option>
                                        <option value={3}>Beginner</option>
                                        <option value={4}>Intermediate</option>
                                        <option value={5}>Advanced</option>
                                        <option value={6}>Expert</option>
                                    </Form.Select>
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
                                        fontSize: '20px'
                                    }}>
                                    Add Employee
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
                                            fontSize: '23px'
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
