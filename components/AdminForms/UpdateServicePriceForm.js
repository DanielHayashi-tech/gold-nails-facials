import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'

export default function UpdateServicePriceForm({ handleCancelForm }) {
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
                body: JSON.stringify({
                    ServiceID: ServiceID,
                    service_price: service_price
                })
            });
    
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json();
            console.log(data);
    
            // Add success alert and navigate back to adminDash
            alert("Success! Service price updated.");
            router.push('/adminDash');
    
        } catch (error) {
            console.log(error)
            alert("Read the error message and try again, you got this :)  ")
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
                            }}> Update Service Price Form
                        </h3>
                    </div>
            <Form onSubmit={handleUpdateServicePrice}>
                <Form.Group controlId="formBasicServiceID" className="grid place-content-start md:place-content-center">
                    <Form.Label
                        style={{
                            fontFamily: "Open Sans",
                            fontWeight: "400",
                            fontSize: "1.3rem"
                        }}> Service ID </Form.Label>
                    <Form.Control
                        type="text"
                        className="w-64 text-center"
                        style={{ backgroundColor: "#FFE1F8" }}
                        placeholder="Enter Service ID"
                        value={ServiceID}
                        onChange={(event) => setServiceID(event.target.value)}
                        required />
                </Form.Group>
                <br></br>

                <Form.Group controlId="formBasicServicePrice" className="grid place-content-start md:place-content-center">
                    <Form.Label
                        style={{
                            fontFamily: "Open Sans",
                            fontWeight: "400",
                            fontSize: "1.3rem"
                        }}> Service Price </Form.Label>
                    <Form.Control
                        type="number"
                        className="w-64 text-center"
                        style={{ backgroundColor: "#FFE1F8" }}
                        placeholder="Enter New Service Price"
                        value={service_price}
                        onChange={(e) => setServicePrice(e.target.value)}
                        required />
                </Form.Group>
                <br></br>

                <Button
                    variant="light"
                    type="submit"
                    className="btn-block custom-button w-32 mt-2 mb-3"
                    style={{
                        fontFamily: "Open Sans",
                        fontWeight: "400",
                        backgroundColor: "#FFE1F8",
                        fontSize: '19px'
                    }}>
                    Update Price
                </Button>

                <div className="card-footer pt-20">
                    <Button
                        variant="light"
                        onClick={handleCancelForm}
                        className="btn-block custom-button mt-2 absolute bottom-5 right-4"
                        style={{
                            fontFamily: "Open Sans",
                            fontWeight: "400",
                            backgroundColor: "#FFE1F8",
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
    );
}