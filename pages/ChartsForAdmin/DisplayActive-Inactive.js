// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { useAuth } from '../../context/AuthContext';

// export default function InactiveUsersChart() {
//   const { getToken } = useAuth();
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchInactiveUsers = async (range) => {
//     const token = await getToken();

//     try {
//       const response = await fetch(`/api/admin/inactiveUsers?range=${range}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }

//       const data = await response.json();
//       setData(data);
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while fetching inactive users.');
//     }
//   };

//   useEffect(() => {
//     fetchInactiveUsers('year');
//   }, []);

//   const handleFilterChange = (event) => {
//     const range = event.target.value;
//     fetchInactiveUsers(range);
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//             stepSize: 1,
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <div className="w-full">
//       <h2 className="text-lg font-medium mb-2">Inactive Users</h2>
//       <div className="flex items-center mb-4">
//         <label htmlFor="inactiveUsersFilter" className="mr-2">
//           Filter:
//         </label>
//         <select
//           id="inactiveUsersFilter"
//           className="py-1 px-2 border border-gray-300 rounded-md mr-4"
//           onChange={handleFilterChange}
//         >
//           <option value="day">Today</option>
//           <option value="week">This Week</option>
//           <option value="month">This Month</option>
//           <option value="year">This Year</option>
//         </select>
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//       {data && (
//         <Bar
//           data={{
//             labels: data.labels,
//             datasets: [
//               {
//                 label: 'Inactive Users',
//                 data: data.inactiveUsers,
//                 backgroundColor: '#FF6384',
//               },
//             ],
//           }}
//           options={options}
//         />
//       )}
//     </div>
//   );
// }


import { Bar } from 'react-chartjs-2';

const chartData = {
    labels: ['Today', 'This Week', 'This Month', 'This Year'],
    datasets: [
      {
        label: 'Active Users',
        data: [2, 5, 10, 25],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
        borderColor: '#777',
      },
      {
        label: 'Inactive Users',
        data: [1, 3, 8, 15],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderWidth: 1,
        borderColor: '#777',
      },
    ],
  };
  
  const DisplayActiveInactive = () => {
    return (
      <div className="w-full h-full">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: 'Active/Inactive Users', display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  };
  
  export default DisplayActiveInactive;
  


