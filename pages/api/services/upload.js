import multer from "multer";
import { authMiddleware } from '../../../lib/authMiddleware';
import nextConnect from 'next-connect';

const upload = multer({
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  });
  
  const apiRoute = nextConnect({
    onError(error, req, res) {
        
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  
  apiRoute.use(upload.array('theFiles'));
  
  apiRoute.post((req, res) => {
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;
  
  export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };

// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         authMiddleware(req, res, async () => {
//             upload.single('file')(req, res, (err) => {
//                 if (err) {
//                   // Handle any errors that occurred during the upload process
//                   console.error(err);
//                   res.status(500).end('Error uploading file');
//                   return;
//                 }
            
//                 // If the file was successfully uploaded, you can access it via req.file
//                 console.log(req.file);
            
//                 // Do something with the uploaded file
            
//                 // Return a response indicating that the upload was successful
//                 res.status(200).json('File uploaded successfully');
//               });
//         }
//     )}
// }
// `${req.query.orderID}_${req.user.uid}`s