import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import prisma from '../../lib/prismaApp'
import Link from 'next/link';
import Header from '../../components/header';

export default function About({ data }) {
  const [myData, setMyData] = useState(data)
  

  return (
    <div>
      <Header />
      <h1>My Data:</h1>
    
      <table style={{ margin: 'auto'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await prisma.dannyExample.findMany({
    orderBy: { created: 'desc' },
  })
  const formattedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    created: item.created.toISOString(),
  }))
  return {
    props: { data: formattedData },
  }
}
