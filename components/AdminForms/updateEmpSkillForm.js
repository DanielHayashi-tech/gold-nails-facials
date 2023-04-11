// /components/AdminForms/updateEmpSkillForm.js
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function UpdateEmployeeSkillForm({ handleCancelForm }) {
    const router = useRouter();
    const { getToken } = useAuth();
    const [error, setError] = useState(null);
    const [Employee_SpecialtyID, setEmployeeSpecialtyID] = useState('');
    const [EmployeeID, setEmployeeID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [SpecialtyID, setSpecialtyID] = useState('');
    const [specialty_description, setSpecialtyDescription] = useState('');
    const [employee_specialty_statusID, setEmployeeSpecialtyStatusID] = useState('');
    const [employee_specialty_status_description, setEmployeeSpecialtyStatusDescription] = useState('');





    useEffect(() => {
        if (router.query.Employee_SpecialtyID) {
            setEmployeeSpecialtyID(router.query.Employee_SpecialtyID);
            fetchEmployeeData(router.query.Employee_SpecialtyID);
        }
    }, [router.query.Employee_SpecialtyID]);



    const fetchSpecialtyStatusDescription = async (employee_specialty_statusID) => {
        if (!employee_specialty_statusID || isNaN(employee_specialty_statusID)) {
          return;
        }
        try {
          const token = await getToken();
      
          const response = await fetch(`/api/specialtyStatus/${employee_specialty_statusID}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const result = await response.json();
          const data = result.data;
      
          if (data) {
            setEmployeeSpecialtyStatusDescription(data.employee_specialty_status_description);
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      };

    const fetchEmployeeData = async (Employee_SpecialtyID) => {
        if (!Employee_SpecialtyID || isNaN(Employee_SpecialtyID)) {
            return;
        }
        try {
            const token = await getToken();

            const response = await fetch(`/api/skills/${Employee_SpecialtyID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            const data = result.data;

            if (data) {
                setEmployeeID(data.Employee.EmployeeID);
                setFirstName(data.Employee.first_name);
                setSpecialtyID(data.Specialty.SpecialtyID);
                setSpecialtyDescription(data.Specialty.specialty_description);
                setEmployeeSpecialtyStatusID(data.Employee_Specialty_Status.employee_specialty_statusID);
                setEmployeeSpecialtyStatusDescription(data.Employee_Specialty_Status.employee_specialty_status_description);
            }

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const handleUpdateEmployeeSkill = async (e) => {
        e.preventDefault();
        try {
            if (!Employee_SpecialtyID) {
                throw new Error('Employee SpecialtyID ID is required');
            }

            const token = await getToken();

            const response = await fetch(`/api/skills/${Employee_SpecialtyID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Employee:{
                        EmployeeID: EmployeeID,
                        first_name: firstName,
                    },
                    Specialty: { 
                        SpecialtyID: SpecialtyID,
                        specialty_description: specialty_description,
                    },
                    Employee_Specialty_Status: {

                    employee_specialty_statusID: employee_specialty_statusID,
                    employee_specialty_status_description: employee_specialty_status_description,
                    }
                    
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errorCode === 'EMPLOYEE_SPECIALTY_NOT_FOUND') {
                    setError('Employee Specialty not found');
                } else {
                    console.error('Error details:', errorData);
                    throw new Error(response.statusText);
                }
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
                                }}> Update Employee Skill Form
                            </h3>
                        </div>

                        <div className="card-body text-center place-content-center">
                            <Form onSubmit={handleUpdateEmployeeSkill}>
                                <Form.Group controlId="formBasicEmployeeSpecialtyID" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem"
                                        }}> Employee Specialty ID </Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="w-24 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder=" Emp ID"
                                        value={Employee_SpecialtyID}
                                        onChange={(event) => {
                                            const newEmployeeSpecialtyID = event.target.value;
                                            setEmployeeSpecialtyID(newEmployeeSpecialtyID);
                                            // Call the function to fetch the data for the selected employee
                                            fetchEmployeeData(newEmployeeSpecialtyID);
                                        }}
                                        required
                                    />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicEmployeeID" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "400",
                                            fontSize: "1.3rem"
                                        }}> EmployeeID </Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="w-64 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Last Name"
                                        value={EmployeeID}
                                        readOnly
                                        onChange={(event) => {
                                            setEmployeeID(event.target.value);
                                            fetchEmployeeData(event.target.value);
                                        }}
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
                                            fontSize: "1.3rem"
                                        }}> SpecialtyID </Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="w-64 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Last Name"
                                        value={SpecialtyID}
                                        readOnly
                                        onChange={(event) => {
                                            setSpecialtyID(event.target.value);
                                            fetchEmployeeData(event.target.value);
                                        }}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formbasicSpecialtyDescription" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}>Specialty Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="w-48 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Format: XXXXXXXXXX"
                                        value={specialty_description}
                                        readOnly
                                        onChange={(event) => {
                                            setSpecialtyDescription(event.target.value);
                                            fetchEmployeeData(event.target.value);
                                        }}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicEmployeeSpecialtyID" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}>Specialty Status</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className="w-64 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Email"
                                        value={employee_specialty_statusID}
                                        onChange={(event) => {
                                            setEmployeeSpecialtyStatusID(event.target.value);
                                            fetchSpecialtyStatusDescription(event.target.value);
                                          }}
                                        required />
                                </Form.Group>
                                <br></br>

                                <Form.Group controlId="formBasicEmployeeStatusDescription" className="grid place-content-start md:place-content-center">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Open Sans", // Change to the desired cursive font
                                            fontWeight: "400",
                                            fontSize: "1.3rem",
                                        }}> Employee Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="w-96 text-center"
                                        style={{ backgroundColor: "#FFE1F8" }}
                                        placeholder="Address 1"
                                        value={employee_specialty_status_description}
                                        readOnly
                                        required />
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
