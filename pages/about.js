import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import prisma from '../lib/prismaApp'

export default function About({ data }) {
  const [myData, setMyData] = useState(data)
  

  return (
    <div>
      <h1>My Data:</h1>
      <ul>
        {myData.map((item) => (
          <li key={item.id}>
            {item.name} - {item.email}
          </li>
        ))}
      </ul>
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

