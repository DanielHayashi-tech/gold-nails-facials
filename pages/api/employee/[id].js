// /api/employee/[id].js
import { authMiddleware } from '@/lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {
    const EmployeeID = Number.parseInt(req.query.id);

    if (isNaN(EmployeeID)) {
        return res.status(400).json({ error: 'Invalid EmployeeID' });
    }

    if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            try {
                const employee = await prisma.employee.findUnique({
                    where: { EmployeeID: EmployeeID },
                    select: {
                        EmployeeID: true,
                        first_name: true,
                    },
                });

                if (!employee) {
                    return res
                        .status(404)
                        .json({ error: 'Employee not found', errorCode: 'EMPLOYEE_NOT_FOUND' });
                }

                return res.status(200).json({ data: employee });
            } catch (error) {
                console.log(error);
                console.log(EmployeeID);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    } else if (req.method === 'POST') {
        authMiddleware(req, res, async () => {
            const { SpecialtyID, employee_specialty_statusID } = req.body;

            const employeeSpecialtyStatusDescriptions = [
                "",
                "",
                "Not Learned",
                "Beginner",
                "Intermediate",
                "Advanced",
                "Expert",
            ];

            try {
                const newEmployeeSpecialty = await prisma.employee_Specialty.create({
                    data: {
                        Employee: {
                            connect: {
                                EmployeeID: EmployeeID,
                            },
                        },
                        Specialty: {
                            connect: {
                                SpecialtyID: parseInt(SpecialtyID),
                            },
                        },
                        Employee_Specialty_Status: {
                            connectOrCreate: {
                                where: {
                                    employee_specialty_statusID: employee_specialty_statusID,
                                },
                                create: {
                                    employee_specialty_statusID: employee_specialty_statusID,
                                    employee_specialty_status_description:
                                        employeeSpecialtyStatusDescriptions[parseInt(employee_specialty_statusID)], // Parse employee_specialty_statusID to an integer
                                },
                            },
                        },
                    },
                });


                return res.status(200).json({ success: true, data: newEmployeeSpecialty });
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ error: 'Internal server error', errorCode: 'INTERNAL_SERVER_ERROR' });
            }
        });
    }
}
