import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'

export default function UpdateServicePriceForm({ handleCancelForm }) {
  const router = useRouter();
  const { getToken } = useAuth();
  const [ServiceID, setServiceID] = useState('');
  const [service_title, setServiceTitle] = useState('');
  const [service_price, setServicePrice] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    if (router.query.ServiceID) {
      setServiceID(router.query.ServiceID);
      fetchServiceData(router.query.ServiceID);
    }
  }, [router.query.ServiceID]);
  const fetchServiceData = async (ServiceID) => {
    if (!ServiceID || isNaN(ServiceID)) {
      return;
    }
    try {
      const token = await getToken();

      const response = await fetch(`/api/admin/${ServiceID}`, {
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
      console.log(data)

      if (data) {
        setServicePrice(data.service_price);
        setServiceTitle(data.service_title.trim());
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleUpdateServicePrice = async (e) => {
    e.preventDefault();
    try {
      if (!ServiceID) {
        throw new Error('Service ID is required');
      }

      const token = await getToken();

      const response = await fetch(`/api/admin/${ServiceID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_price: service_price,
          service_title: service_title,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errorCode === 'SERVICE_NOT_FOUND') {
          setError('Service not found');
        } else {
          console.error('Error details:', errorData);
          throw new Error(response.statusText);
        }
      }
      const data = await response.json();
      console.log(data);
  
      // Add success alert and call handleCancelForm
      alert("Success! Service price updated.");
      handleCancelForm(); // Replace the router.push('/adminDash') with handleCancelForm()
  
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

            <div className="card-body text-center place-content-center">
              <Form onSubmit={handleUpdateServicePrice}>
                <Form.Group controlId="formBasicServiceID" className="grid place-content-start md:place-content-center">
                  <Form.Label
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "400",
                      fontSize: "1.3rem"
                    }}>Service ID </Form.Label>
                  <Form.Control
                    type="number"
                    className="w-20 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="ID"
                    value={ServiceID}
                    onChange={(event) => {
                      const newServiceID = event.target.value;
                      setServiceID(newServiceID);
                      // Call the function to fetch the data for the selected employee
                      fetchServiceData(newServiceID);
                    }}
                    required />
                </Form.Group>
                <br></br>
                    
                <Form.Group controlId="formBasicServiceTitle" className="grid place-content-start md:place-content-center">
                  <Form.Label
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "400",
                      fontSize: "1.3rem"
                    }}> Service Title </Form.Label>
                  <Form.Control
                    type="text"
                    className="w-64 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="Enter New Service Title"
                    value={service_title}
                    onChange={(event) => {
                      setServiceTitle(event.target.value);
                      
                    }}
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
                    className="w-24 text-center"
                    style={{ backgroundColor: "#FFE1F8" }}
                    placeholder="$"
                    value={service_price}
                    onChange={(event) => {
                      setServicePrice(event.target.value);
                      
                    }}
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
    </div>
  );
}