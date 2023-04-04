import { authMiddleware } from '../../../lib/authMiddleware';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {
      //prsima here

        //client posts what services are needed
        console.log(req.body)

        //get prices for services

        //create new order with clientid, total price and date

        //create order service line for each of services with orderid and serviceid
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 