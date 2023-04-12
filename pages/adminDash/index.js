import Head from 'next/head';
import React, { useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

import AdminDashNavbar from '../../components/Nav/AdminDashNavbar';
import UpdateServicePriceForm from '../../components/AdminForms/UpdateServicePriceForm';
import AddEmployeeForm from '../../components/AdminForms/AddEmployeeForm';
import UpdateEmpForm from '../../components/AdminForms/updateEmpForm';
import UpdateEmpSkillForm from '../../components/AdminForms/updateEmpSkillForm';
import AddEmployeeSkillForm from '../../components/AdminForms/addEmployeeSkillForm';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import DisplayServices from '../ChartsForAdmin/DisplayServices';
import DisplayActiveInactive from '../ChartsForAdmin/DisplayActiveInactive';
import DisplayServiceTrends from '../ChartsForAdmin/DisplayServiceTrends';
import DisplayServiceOrders from '../ChartsForAdmin/DisplayServiceOrders';
import ApproveOrders from '../ChartsForAdmin/DisplayOrders'

const ADMIN_UID = "CFsOKUyXSicjCHYr3RwzJIK3Zgu2";

export default function AdminDash() {
    const { getToken } = useAuth();

    const router = useRouter();
    const [error, setError] = useState(null);
    const [serviceOrderCount, setServiceOrderCount] = useState(0);
    const [clientCount, setclientCount] = useState(0);
    const [currentForm, setCurrentForm] = useState('');
    const auth = getAuth();

    useEffect(() => {
        const checkUser = async () => {
          const authUser = auth.currentUser;
          if (!authUser) {
            router.push('/'); // Redirect to the login page if not authenticated
          } else if (authUser.uid !== ADMIN_UID) {
            router.push('/dashboard/' + authUser.uid); // Redirect to the user dashboard if not an admin
          }
        };
        checkUser();
      }, []);


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

            <AdminDashNavbar handleFormChange={handleFormChange} />
            {currentForm === 'addEmployee' && (
                <AddEmployeeForm handleCancelForm={handleCancelForm} />
            )}
            {currentForm === 'updateServicePrice' && (
                <UpdateServicePriceForm handleCancelForm={handleCancelForm} />
            )}
            {currentForm === 'addEmployeeSkill' && (
                <AddEmployeeSkillForm handleCancelForm={handleCancelForm} />
            )}
            {currentForm === 'updateEmployee' && (
                <UpdateEmpForm handleCancelForm={handleCancelForm} />
            )}
            {currentForm === 'updateEmployeeSkill' && (
                <UpdateEmpSkillForm handleCancelForm={handleCancelForm} />
            )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="mt-20">
                <div className="charts-container grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <DisplayServices />
                        </div>
                    </div>
                    <div className="col-span-1 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <DisplayActiveInactive />
                        </div>
                    </div>
                    <div className="col-span-3 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <DisplayServiceTrends  />

                        </div>
                    </div>
                    <div className="col-span-1 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <DisplayServiceOrders />
                        </div>
                    </div>
                    <div className="col-span-1 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
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
                    <div className="col-span-1 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
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
                    
                </div>
                <div className="col-span-1 text-center">
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <ApproveOrders />
                        </div>
                    </div>
            </div>
        </div>
    );
}


