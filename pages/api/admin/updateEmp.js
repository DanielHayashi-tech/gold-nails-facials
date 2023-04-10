import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {
  const employeeID = Number.parseInt(req.query.id);

  if (req.method === 'PUT') {
    authMiddleware(req, res, async () => {
      const { first_name, last_name, phone_number, email_address, address_1, address_2, city, state, zip_code } = req.body;

      try {
        const updatedEmployee = await prisma.employee.update({
          where: { EmployeeID: employeeID },
          data: {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email_address: email_address,
            address_1: address_1,
            address_2: address_2,
            city: city,
            state: state,
            zip_code: zip_code,
          },
        });
        return res.status(200).json({ success: true, data: updatedEmployee });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error });
      }
    });
  }
}