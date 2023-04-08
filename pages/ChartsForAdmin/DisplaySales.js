import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';

import { registerables} from 'chart.js';
Chart.register(...registerables);


const DisplaySales = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        type: 'category',
        scaleLabel: {
          display: true,
          labelString: 'Month'
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      }
    }
  };

  return (
    <div>
      <h2> SALES SALES SALES SALES!!! </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default DisplaySales;
