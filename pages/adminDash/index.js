import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import AdminDashNavbar from '../../components/Nav/AdminDashNavbar';
import AddEmployeeForm from '../../components/AdminForms/AddEmployeeForm';
import UpdateEmpForm from '../../components/AdminForms/updateEmpForm';
import UpdateServicePriceForm from '../../components/AdminForms/UpdateServicePriceForm';
 
 
 
export default function AdminDash() {
    const router = useRouter();
  const [addEmp, setAddEmp] = useState(false);
  const [error, setError] = useState(null);
  const [serviceOrderCount, setServiceOrderCount] = useState(0);
  const [clientCount, setclientCount] = useState(0);
  const [currentForm, setCurrentForm] = useState('');


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
          {currentForm === 'updateEmployee' && ( // Add this condition to render the UpdateEmployeeForm component
              <UpdateEmpForm handleCancelForm={handleCancelForm} />
          )}
      </div>
  );
}


   


    // const handleServiceTotal = async (e) => {
    //     e.preventDefault();
    //     const token = await getToken();
 
    //     try {
    //         const response = await fetch('/api/admin/addOrderTotal', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
 
    //         });
    //         if (!response.ok) {
    //             throw new Error(response.statusText)
    //         }
    //         const data = await response.json();
    //         setServiceOrderCount(data.total);
    //     } catch (error) {
    //         console.log(error)
    //         alert("Read the error message and try again, you got this :) ")
    //         // An error occurred. Set error message to be displayed to user
    //         setError(error.message)
 
    //     }
    // };
 
 
 
 
 
 
    // const handleCountAllMyClients = async (e) => {
    //     e.preventDefault();
    //     const token = await getToken();
 
    //     try {
    //         const response = await fetch('/api/admin/userCount', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
 
    //         });
    //         if (!response.ok) {
    //             throw new Error(response.statusText)
    //         }
    //         const data = await response.json();
    //         setclientCount(data.total);
    //     } catch (error) {
    //         console.log(error)
    //         alert("Read the error message and try again, you got this :) ")
    //         // An error occurred. Set error message to be displayed to user
    //         setError(error.message)
 
    //     }
    // };
 
 