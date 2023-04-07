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
    const [serviceOrderCount, setServiceOrderCount] = useState(0);
    const [clientCount, setclientCount] = useState(0);



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
                body: JSON.stringify({
                    ServiceID : ServiceID,
                    service_price : service_price
                })
            });


            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
            alert("Read the error message and try again, you got this :)  ")
            // An error occurred. Set error message to be displayed to user
            setError(error.message)
        }
    };

    const handleServiceTotal = async (e) => {
        e.preventDefault();
        const token = await getToken();

        try {
            const response = await fetch('/api/admin/addOrderTotal', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json();
            setServiceOrderCount(data.total);
        } catch (error) {
            console.log(error)
            alert("Read the error message and try again, you got this :) ")
            // An error occurred. Set error message to be displayed to user
            setError(error.message)

        }
    };


    const handleCountAllMyClients = async (e) => {
        e.preventDefault();
        const token = await getToken();

        try {
            const response = await fetch('/api/admin/userCount', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json();
            setclientCount(data.total);
        } catch (error) {
            console.log(error)
            alert("Read the error message and try again, you got this :) ")
            // An error occurred. Set error message to be displayed to user
            setError(error.message)

        }
    };





    return (
        <div>
            <h1 className="text-center" > Admin dash congrats!</h1>
            <br></br>

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
            <br></br>
            <Form onSubmit={handleServiceTotal}>
                <Button
                    variant="primary"
                    type="submit"
                    className="btn-block custom-button cursor-pointer hover:text-pink-900"
                    style={{ backgroundColor: "#ffe5e9", fontSize: "1.5rem" }}>
                    Total the Service Orders!
                </Button>
                <h2>Total Service Orders: {serviceOrderCount}</h2>

            </Form>
            <br></br>
            <Form onSubmit={handleCountAllMyClients}>
                <Button
                    variant="primary"
                    type="submit"
                    className="btn-block custom-button cursor-pointer hover:text-pink-900"
                    style={{ backgroundColor: "#ffe5e9", fontSize: "1.5rem" }}>
                    Total Number of Clients!
                </Button>
                <h2>Total Clients: {clientCount}</h2>

            </Form>

            {/* handleCountAllMyClients */}
        </div>
    )
}