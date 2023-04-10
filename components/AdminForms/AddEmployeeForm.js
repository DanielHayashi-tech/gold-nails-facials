import React, { useState, useEffect } from 'react';
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

    // Add new states for specialties and selectedSpecialties
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [selectedSkillLevels, setSelectedSkillLevels] = useState({});


    const [specialties, setSpecialties] = useState([]);
    const [skillLevels, setSkillLevels] = useState([]);

    const [error, setError] = useState(null);

    const { getToken } = useAuth();



    useEffect(() => {
        async function fetchSpecialties() {
            try {
                const token = await getToken();
                const response = await fetch('/api/admin/getEmpSpecialties', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data)
                setSpecialties(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        }

        fetchSpecialties();
    }, []);

    useEffect(() => {
        async function fetchSkillLevels() {
            try {
                const token = await getToken();
                const response = await fetch('/api/admin/getEmpSkills', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                // console.log(data)
                setSkillLevels(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching skill levels:', error);
            }
        }

        fetchSkillLevels();
    }, []);

    const handleSpecialtyChange = (event, specialtyId, isSkillLevelChange = false) => {
        if (isSkillLevelChange) {
            const skillLevelId = +event.target.value;
            setSelectedSkillLevels((prevState) => ({ ...prevState, [specialtyId]: skillLevelId }));
        } else {
            if (event.target.checked) {
                setSelectedSpecialties((prevState) => [...prevState, specialtyId]);
            } else {
                setSelectedSpecialties((prevState) =>
                    prevState.filter((selectedSpecialty) => selectedSpecialty !== specialtyId)
                );
            }
        }
    };


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
                    specialties: selectedSpecialties.map((specialtyId) => ({
                        specialtyID: specialtyId,
                        skillLevelID: selectedSkillLevels[specialtyId],
                    })),

                }),
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            router.push('/adminDash');

        } catch (error) {
            console.log(error)
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
                                <div>
                                    {specialties.map((specialty, index) => (
                                        <div key={`${specialty.specialtyID}-${index}`}>
                                            <Form.Group controlId={`formSpecialtySkill${specialty.specialtyID}`}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label={specialty.specialty_description}
                                                    onChange={(event) => handleSpecialtyChange(event, specialty.specialtyID)}
                                                />
                                                {selectedSpecialties.includes(specialty.specialtyID) && (
                                                    <Form.Control
                                                        as="select"
                                                        value={selectedSkillLevels[specialty.specialtyID] || ''}
                                                        onChange={(event) => handleSpecialtyChange(event, specialty.specialtyID, true)}
                                                    >
                                                        <option value="" disabled>
                                                            Select skill level
                                                        </option>
                                                        {skillLevels.map((skillLevel) => (
                                                            <option key={`${specialty.SpecialtyID}-${skillLevel.Skill_LevelID}`} value={skillLevel.Skill_LevelID}>
                                                                {skillLevel.skill_level_description}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                )}

                                            </Form.Group>
                                        </div>
                                    ))}
                                </div>

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
