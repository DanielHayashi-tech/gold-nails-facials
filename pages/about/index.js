import { useState, useEffect } from 'react'
import prisma from '../../lib/prismaApp'

export default function About({ data }) {
  const [myData, setMyData] = useState(data)
  

  return (
    <div>
      <h1>The About page! </h1>
      <p> This is using prsima to call out back end dummy data. </p>
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
