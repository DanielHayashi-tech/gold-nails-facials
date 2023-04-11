// /api/skills/[id].js
import { authMiddleware } from '@/lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {
  const Employee_SpecialtyID = Number.parseInt(req.query.id);

  if (isNaN(Employee_SpecialtyID)) {
    return res.status(400).json({ error: 'Invalid Employee_SpecialtyID' });
  }

  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      try {
        const employeeSpecialties = await prisma.employee_Specialty.findUnique({
          where: { Employee_SpecialtyID: Employee_SpecialtyID },
          include: {
            Specialty: true,
            Employee_Specialty_Status: true,
            Employee: true,
          },
        });

        if (!employeeSpecialties) {
          return res
            .status(404)
            .json({ error: 'Employee Specialty not found', errorCode: 'EMPLOYEE_SPECIALTY_NOT_FOUND' });
        }

        return res.status(200).json({ data: employeeSpecialties });
      } catch (error) {
        console.log(error);
        console.log(Employee_SpecialtyID);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else if (req.method === 'PUT') {
    authMiddleware(req, res, async () => {
      const { Employee, Specialty, Employee_Specialty_Status } = req.body;

      try {
        const updatedEmployee = await prisma.employee.update({
          where: { EmployeeID: Employee.EmployeeID },
          data: {
            first_name: Employee.first_name,
          },
        });

        const updatedSpecialty = await prisma.specialty.update({
          where: { SpecialtyID: Specialty.SpecialtyID },
          data: {
            specialty_description: Specialty.specialty_description,
          },
        });

        const updatedEmployeeSpecialtyStatus = await prisma.employee_Specialty_Status.update({
          where: { employee_specialty_statusID: parseInt(Employee_Specialty_Status.employee_specialty_statusID) }, // Convert to integer
          data: {
            employee_specialty_status_description: Employee_Specialty_Status.employee_specialty_status_description,
          },
        });

        const updatedEmployeeSkill = await prisma.employee_Specialty.update({
            where: { Employee_SpecialtyID: Employee_SpecialtyID },
            data: {
              Employee: {
                connect: {
                  EmployeeID: Employee.EmployeeID,
                },
              },
              Specialty: {
                connect: {
                  SpecialtyID: Specialty.SpecialtyID,
                },
              },
              Employee_Specialty_Status: {
                connect: {
                  employee_specialty_statusID: parseInt(
                    Employee_Specialty_Status.employee_specialty_statusID
                  ),
                },
              },
            },
          });

        return res.status(200).json({ success: true, data: updatedEmployeeSkill });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
