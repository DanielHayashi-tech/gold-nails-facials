import prisma from './prismaApp'

// I want to export a function that returns all the data from the database
export const getData = async () => {
  const data = await prisma.dannyExample.findMany()
  return data
}

// I want to export a function that returns a single user by id
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return user
}

// I want to export a function that creates a new user
export const createUser = async ({ name, email }) => {
  const newUser = await prisma.user.create({
    data: {
      name,
      email
    }
  })
  return newUser
}

// I want to export a function that updates a user by id
export const updateUser = async ({ id, name, email }) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name,
      email
    }
  })
  return updatedUser
}


// I want to export a function that deletes a user by id
export const deleteUser = async (id) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  })
  return deletedUser
}
