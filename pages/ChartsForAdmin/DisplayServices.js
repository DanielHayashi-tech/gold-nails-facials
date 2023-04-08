import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';

import { registerables} from 'chart.js';
Chart.register(...registerables);

const DisplayServices = () => {
  const data = {
    labels: ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5', 'Service 6', 'Service 7'],
    datasets: [
      {
        label: 'Services',
        data: [10, 20, 5, 15, 8, 12, 18],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#32a852',
          '#FF9F40',
          '#a8326e',
          '#3987c6'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Services'
      }
    }
  };

  return (
    <div>
      <h2> Services We Offer! </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DisplayServices;
