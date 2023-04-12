import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}-${Date.now()}`);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err);
        res.status(500).send('Multer error');
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
        res.status(500).send('Unknown error');
      } else {
        // Everything went fine.
        res.status(200).json({ success: true });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
