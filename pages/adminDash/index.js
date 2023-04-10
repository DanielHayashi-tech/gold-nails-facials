import Head from 'next/head';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import AdminDashNavbar from '../../components/Nav/AdminDashNavbar';
import UpdateServicePriceForm from '../../components/AdminForms/UpdateServicePriceForm';
import AddEmployeeForm from '../../components/AdminForms/AddEmployeeForm';
import UpdateEmpForm from '../../components/AdminForms/updateEmpForm';
import Link from 'next/link';
import DisplaySales from '../ChartsForAdmin/DisplaySales';
import DisplayServices from '../ChartsForAdmin/DisplayServices';
import DisplayActiveInactive from '../ChartsForAdmin/DisplayActive-Inactive';

 
 
export default function AdminDash() {
    const { getToken } = useAuth();

    const router = useRouter();
    const [addEmp, setAddEmp] = useState(false);
    const [error, setError] = useState(null);
    const [ServiceID, setServiceID] = useState("");
    const [service_price, setServicePrice] = useState("");
    const [serviceOrderCount, setServiceOrderCount] = useState(0);
    const [clientCount, setclientCount] = useState(0);
    const [currentForm, setCurrentForm] = useState('');
    const [serviceTypes, setServiceTypes] = useState([]);



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


  const handleFormChange = (form) => {
      setCurrentForm(form);
  };

  const handleCancelForm = () => {
      setCurrentForm('');
  };
 

  return (
      <div>
        <Head>
      <style>{`
        .chart-container {
            position: relative;
            height: 100%;
            width: 100%;
            border: 2px solid #ccc;
            padding: 16px;
            border-radius: 8px;
            background-color: #fff;
            box-sizing: border-box;
            z-index: 1; 
        }
        .labels-container {
            z-index: 2;
        }
      `}</style>
    </Head>


        <AdminDashNavbar handleFormChange={handleFormChange} />
        {currentForm === 'addEmployee' && (
            <AddEmployeeForm handleCancelForm={handleCancelForm} />
        )}
        {currentForm === 'updateServicePrice' && (
            <UpdateServicePriceForm handleCancelForm={handleCancelForm} />
        )}
        {currentForm === 'updateEmployee' && (
            <UpdateEmpForm handleCancelForm={handleCancelForm} />
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>



        
        <div className="charts-container grid grid-cols-3 gap-4 align-content-center">
          <div className="text-center">
          </div>
          <div className="text-center">
          </div>
          <div className="text-center">
          </div>

          <div className="col-span-1 text-center">
            <div className="chart-container">
                <DisplayServices />
            </div>
          </div>

          <div className="col-span-2 text-center">
            <div className="chart-container">
                <DisplaySales />
            </div>
          </div>

          <div className="col-span-2 text-center">
            <div className="chart-container">
                <DisplayActiveInactive />
            </div>
          </div>

          <div className="col-span-1 text-center">
          <div className="text-center">
            Owner needs to be able to approve quotes and
            this means change the status to IN PROGRSS and display how many
          </div>
          </div>


          <div className="col-span-1 text-center">
            <div className="chart-container">
                <Form onSubmit={handleServiceTotal}>
                    <p>Total Service Orders: {serviceOrderCount}</p>
                    <Button
                    variant="primary"
                    type="submit"
                    className="btn-block custom-button cursor-pointer hover:text-pink-900"
                    style={{ backgroundColor: "#ffe5e9", fontSize: "1rem" }}>
                    Total the Service Orders!
                    </Button>
                </Form>
            </div>
          </div>

          <div className="text-center">
            Owner needs to be able to approve quotes and
            this means change the status to IN PROGRSS and display how many
          </div>

          <div className="col-span-1 text-center">
            <div className="chart-container">
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
          </div>
          <br></br>


          <div className="text-center">
            Sales on Services Made Today, this week, this month, this year
          </div>
    
          </div>
      </div>
  );
}

 
 