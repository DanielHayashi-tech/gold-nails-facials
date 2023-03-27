import prisma from './prismaApp'

export const getData = async () => {
  const data = await prisma.dannyExample.findMany()
  return data
}





// export aysnc function _____ () {}

// export const getUserById = async (id) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: parseInt(id)
//     }
//   })
//   return user
// }

// export const createUser = async ({ name, email }) => {
//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       email
//     }
//   })
//   return newUser
// }

// export const updateUser = async ({ id, name, email }) => {
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: parseInt(id)
//     },
//     data: {
//       name,
//       email
//     }
//   })
//   return updatedUser
// }

// export const deleteUser = async (id) => {
//   const deletedUser = await prisma.user.delete({
//     where: {
//       id: parseInt(id)
//     }
//   })
//   return deletedUser
// }
