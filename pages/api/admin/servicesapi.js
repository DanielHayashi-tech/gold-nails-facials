import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const serviceTypes = await prisma.serviceTypes.findMany({
    include: {
      services: true,
    },
  })

  res.status(200).json(serviceTypes)
}
