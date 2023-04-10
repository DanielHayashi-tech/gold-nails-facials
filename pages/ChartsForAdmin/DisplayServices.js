import { Pie } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const DisplayServices = () => {
  const [serviceTypes, setServiceTypes] = useState([])

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const res = await fetch('/api')
      const data = await res.json()
      setServiceTypes(data)
    }

    fetchServiceTypes()
  }, [])

  const data = {
    labels: serviceTypes.map((serviceType) => serviceType.service_type_description),
    datasets: [
      {
        label: 'Services',
        data: serviceTypes.map((serviceType) => serviceType.services.length),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#32a852',
          '#FF9F40',
          '#a8326e',
          '#3987c6',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Services',
      },
    },
  }

  return (
    <div>
      <h2> Highest Service In Demand ! </h2>
      <Pie data={data} options={options} />
    </div>
  )
}

export default DisplayServices
