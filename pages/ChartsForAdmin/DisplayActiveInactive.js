import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DisplayActiveInactive = () => {
  const { getToken } = useAuth();

  const [chartData, setChartData] = useState(null);

  const updateClientStatus = async () => {
    try {
      const token = await getToken();

      const response = await fetch('/api/admin/updateClientStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

      const response = await fetch('/api/admin/getClientStatusCounts', {
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

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        await updateClientStatus();
        await fetchChartData();
      }
    };
    fetchData();
  }, [getToken]);

  return (
    <div className="flex">
    {chartData && (
      <div className="flex">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeframe" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="activeClients" fill="#8884d8" />
              <Bar dataKey="inactiveClients" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )}
  </div>
  );
};

export default DisplayActiveInactive;
