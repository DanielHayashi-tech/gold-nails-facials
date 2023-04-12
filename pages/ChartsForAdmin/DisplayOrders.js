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
    <div className="h-96 overflow-y-scroll">
      <div className="w-full h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Email
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Cost
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((table) => (
              <tr key={table.ServiceOrderID}>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {table.Clients.first_name + table.Clients.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {table.Clients.email_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {convertDate(table.service_order_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  ${table.service_order_quote}.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 py-1 px-4 rounded"
                    onClick={() => updateStatus(table.ServiceOrderID, 3)}
                  >
                    Approve
                  </button>
                  <br />
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 py-1 px-4 mt-1 rounded"
                    onClick={() => updateStatus(table.ServiceOrderID, 6)}
                  >
                    Deny
                  </button>
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