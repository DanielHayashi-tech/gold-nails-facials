// pages/ChartsForAdmin/DisplayServiceOrders.js

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const DisplayServiceOrders = () => {
    const { getToken } = useAuth();

    const [chartData, setChartData] = useState(null);

    const fetchChartData = async () => {
        try {
            const token = await getToken();

            const response = await fetch('/api/admin/getServiceOrderData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log(data);
            setChartData(data);
        } catch (error) {
            console.log(error);
            alert('Read the error message and try again, you got this :) ');
        }
    };

    useEffect(() => {
        const fetchChart = async () => {
            const token = await getToken();
            if (token) {
                await fetchChartData();
            }
        };
        fetchChart();
    }, [getToken]);

    return (
        <div className="flex">
            {chartData && (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Service Order ID</th>
                            <th>Client ID</th>
                            <th>Quote</th>
                            <th>Date</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Client Status ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((item) => (
                            <tr key={item.ServiceOrderID}>
                                <td>{item.ServiceOrderID}</td>
                                <td>{item.ClientID}</td>
                                <td>{item.service_order_quote}</td>
                                <td>{item.service_order_date}</td>
                                <td>{item.Clients.first_name}</td>
                                <td>{item.Clients.last_name}</td>
                                <td>{item.Clients.Client_statusID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DisplayServiceOrders;