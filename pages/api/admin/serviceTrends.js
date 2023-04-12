import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handle(req, res) {
    if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            try {
                const servicesData = await prisma.$queryRaw`
                SELECT
                    ST.service_typeID,
                    ST.service_type_description,
                    CAST(SO.service_order_date AS DATE) as date,
                    COUNT(SO.ServiceOrderID) as count
                FROM
                    Service_Type ST
                JOIN
                    Service S ON ST.service_typeID = S.service_typeID
                JOIN
                    Service_Order_Line SOL ON S.ServiceID = SOL.ServiceID
                JOIN
                    Service_Order SO ON SOL.ServiceOrderID = SO.ServiceOrderID
                GROUP BY
                    ST.service_typeID,
                    ST.service_type_description,
                    CAST(SO.service_order_date AS DATE)
                ORDER BY
                    ST.service_typeID,
                    CAST(SO.service_order_date AS DATE)
                `;

                if (servicesData && servicesData.error) {
                    res.status(400).json(servicesData);
                } else {
                    res.status(200).json(Array.isArray(servicesData) ? servicesData : [servicesData]);
                }
            } catch (error) {
                console.error('Query execution error:', error);
                res.status(500).json({ message: 'Error executing the query' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}