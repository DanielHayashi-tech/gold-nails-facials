import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';



const DisplayServices = () => {
  const { getToken } = useAuth();

  const [chartData, setChartData] = useState(null);

  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)',
  ];


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
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="service_type_description"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={backgroundColors[index % backgroundColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default DisplayServices;
