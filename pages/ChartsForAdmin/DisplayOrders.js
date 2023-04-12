import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Example from '../testing/index';
import { Table } from 'react-bootstrap';


const DisplayOrders = () => {
  const { getToken } = useAuth();

  const [chartData, setChartData] = useState([]);

async function updateStatus(id, status) {
    try {
      const token = await getToken();

      const response = await fetch('/api/admin/updateOrderStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: id,
            status: status
          }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("updateClientStatus data:", data);
    

    } catch (error) {
      console.log(error);
    }
  };

  const fetchChartData = async () => {
    try {
      const token = await getToken();
      console.log("token:", token)

      const response = await fetch('/api/admin/approveOrders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log("response:", response)

      const data = await response.json();
      console.log("Chart data:", data);
      setChartData(data);
    } catch (error) {
      console.log(error);
      alert('Read the error message and try again, you got this :) ');
    }
  };

  function convertDate(data) {
    const date = new Date(data);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // months are zero-indexed, so add 1
    const day = date.getDate();

    return `${month}-${day}-${year}`
    

  }

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        await fetchChartData();
      }
    };
    fetchData();
  }, [getToken]);

  return (
    <div style={{ height: '400px', overflowY: 'scroll' }}>
        <div style={{ width: '100%', height: 400 }}>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Email</th>
                <th scope="col">Order Date</th>
                <th scope="col">Order Cost</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {chartData.map((table) => (
                <tr key={table.ServiceOrderID}>
                    <td>{table.Clients.first_name + table.Clients.last_name}</td>
                    <td>{table.Clients.email_address}</td>
                    <td>{convertDate(table.service_order_date)}</td>
                    <td>${table.service_order_quote}.00</td>
                    <td>
                        {/* <button onClick={updateStatus(table.ServiceOrderID, 3)}>
                            Approve
                        </button>
                        <br></br>
                        <button onClick={updateStatus(table.ServiceOrderID, 6)}>
                             Deny
                        </button> */}
                    </td>

                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
};

export default DisplayOrders;
