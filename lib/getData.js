import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

 
export async function newClient() {
    const query = await prisma.clients.create({

    })
} 