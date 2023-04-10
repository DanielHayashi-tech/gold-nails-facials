import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


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

  Chart.register(ChartDataLabels);

  const fetchChartData = async () => {
    try {
      if (!getToken) {
        throw new Error('You must be logged in to view this page');
      }

      const token = await getToken();
      console.log(token)

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
      const labels = data.map((serviceType) => serviceType.service_type_description.toString());
      const values = data.map((serviceType) => serviceType.count);
      console.log("Here are the labels: " + JSON.stringify(labels));
      console.log("Here are the values: " + JSON.stringify(values));



      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Service Type Count',
            data: values,
            backgroundColor: backgroundColors,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      alert('Read the error message and try again, you got this :) ');
    }
  };

  useEffect(() => {
    const fetchChart = async () => {
      if (getToken) {
        await fetchChartData();
      }
    };
    fetchChart();
  }, [getToken]);

  return (
    <div className="flex">
    {chartData && (
      <Pie
        data={chartData}
        height={600}
        width={400}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          plugins: {
            // Register the datalabels plugin
            datalabels: ChartDataLabels,
            // Add this block to configure the datalabels plugin
            datalabels: {
              color: 'white',
              formatter: (value) => `${value}`,
            },
          },
        }}
      />
    )}
    {chartData && (
      <ul className="pl-4">
        {chartData.labels.map((label, index) => (
          <li key={index} className="flex items-center">
            <span
              className="mr-2 rounded-full"
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: backgroundColors[index % backgroundColors.length],
              }}
            ></span>
            {label}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default DisplayServices;
