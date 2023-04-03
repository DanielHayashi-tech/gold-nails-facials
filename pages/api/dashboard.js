//import firebase admin 
//npm install firebase-admin --save
//const { initializeApp } = require('firebase-admin/app');
//const app = initializeApp();

export default function handler(req, res) {
  const { token } = req.query
  console.log(token)
    res.status(200).json({ name: token})

    //if token vaild send data
  }

  // to check if token is valid 
  //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web

