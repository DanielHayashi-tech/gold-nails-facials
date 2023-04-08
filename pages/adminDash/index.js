import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DisplaySales from '../ChartsForAdmin/DisplaySales';
import DisplayServices from '../ChartsForAdmin/DisplayServices';
import DisplayActiveInactive from '../ChartsForAdmin/DisplayActive-Inactive';




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
                    ServiceID: ServiceID,
                    service_price: service_price
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
        <div className="">
            <h1 className="text-center text-3xl font-bold text-pink-500"> Admin dash congrats!</h1>
            <br></br>
            <div className="grid grid-cols-3 gap-4 align-content-center">
                <div className="text-center">
        

                </div>
                <div className="text-center">


                </div>
                <div className="text-center">
                    

                </div>
                <div className="col-span-1 text-center"><DisplayServices /></div>

                <div className="col-span-2 text-center"><DisplaySales /></div>

                <div className="col-span-2 text-center"> Count how many Clients have a 
                INACTIVE & ACTIVE status 
                today, this week, this year. <DisplayActiveInactive /> </div>

                <div className="col-span-1 text-center">
                <Form onSubmit={handleCountAllMyClients}>
                        <p>Total Clients: {clientCount}</p>
                        <Button
                            variant="primary"
                            type="submit"
                            className="btn-block custom-button cursor-pointer hover:text-pink-900"
                            style={{ backgroundColor: "#ffe5e9", fontSize: "1rem" }}>
                            Total Number of Clients!
                        </Button>
                    </Form>
                </div>

                <div className="text-center"> 
                    <Form onSubmit={handleServiceTotal}>
                        <p> Total Service Orders: {serviceOrderCount} </p>
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn-block custom-button cursor-pointer hover:text-pink-900"
                                style={{ backgroundColor: "#ffe5e9", fontSize: "1rem" }}>
                                Total the Service Orders!
                            </Button>
                    </Form>
                </div>

                <div className="..."> 
                Owner needs to be able to approve quotes and
                this means change the status to IN PROGRSS and display how many    
                </div>

                <div className="..."> Sales on Services Made Today, this week, this month, this year.</div>

                

                <div className="col-span-3 ..."> I need to add an employee </div>

                <div className="col-span-3 mx-auto">
                    <Form onSubmit={handleUpdateServicePrice}>
                        <Form.Group>
                            <Form.Label>What Service ID would you like to update? </Form.Label>
                            <Form.Control
                                className="w-48 text-center"
                                style={{ backgroundColor: "#FFE1F8" }}
                                onChange={(event) => setServiceID(event.target.value)}
                                required
                                type="text" placeholder="Service ID" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>What is the new price? </Form.Label>
                            <Form.Control
                                className="w-48 text-center"
                                style={{ backgroundColor: "#FFE1F8" }}
                                onChange={(event) => setServicePrice(event.target.value)}
                                required
                                type="text" placeholder="New Price" />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="btn-block custom-button cursor-pointer hover:text-pink-900"
                            style={{ backgroundColor: "#ffe5e9", fontSize: "1rem" }}>
                            Submit Update!
                        </Button>
                    </Form>
                    <br></br>
                </div>
            </div>
        </div>
    )
}