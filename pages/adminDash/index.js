import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';




export default function AdminDash() {
    const router = useRouter();
    const { getToken } = useAuth();

    const [ServiceID, setServiceID] = useState("");
    const [service_price, setServicePrice] = useState("");
    const [error, setError] = useState(null);
    


    const handleUpdateServicePrice = async (e) => {
        e.preventDefault();
        const token = await getToken();

        try {
            const response = await fetch('/api/admin/updatePrices', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify ({
                    ServiceID: ServiceID,
                    service_price: service_price,
                }),
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
            alert("Try again dummy.")
            // An error occurred. Set error message to be displayed to user
            setError(error.message)
        }
    };


    return (
        <div>
            <h1> Admin dash congrats!</h1>

            <Form onSubmit={handleUpdateServicePrice}>
                <Form.Group>
                    <Form.Label>What Service ID would you like to update? </Form.Label>
                    <Form.Control 
                    onChange={(event) => setServiceID(event.target.value)}
                    required
                    type="text" placeholder="Service ID" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>What is the new price? </Form.Label>
                    <Form.Control 
                    onChange={(event) => setServicePrice(event.target.value)}
                    required
                    type="text" placeholder="New Price" />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="btn-block custom-button cursor-pointer hover:text-pink-900"
                    style={{ backgroundColor: "#ffe5e9", fontSize: "1.5rem" }}>
                    Submit Update!
                </Button>
            </Form>
        </div>
    )
}