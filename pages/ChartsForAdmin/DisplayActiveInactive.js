import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Example from '../testing/index';


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
      <div style={{ width: '100%', height: 400 }}>
        <Example data={chartData} />
      </div>
    )}
  </div>
  );
};

export default DisplayActiveInactive;
