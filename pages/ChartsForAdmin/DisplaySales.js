import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DisplaySales = () => {
  const { getToken } = useAuth();

  const [chartData, setChartData] = useState(null);

  const fetchChartData = async () => {
    try {
      if (!getToken) {
        throw new Error('You must be logged in to view this page');
      }

      const token = await getToken();

      const response = await fetch('/api/admin/ServiceTypeCount', {
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
      // Transform the data to be compatible with Recharts
      const formattedData = data.map((serviceType) => ({
        service_type_description: serviceType.service_type_description.toString(),
        count: serviceType.count,
      }));

      setChartData(formattedData);
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
        <div className="flex">
          <LineChart width={600} height={300} data={chartData}>
            <XAxis dataKey="service_type_description" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default DisplaySales;