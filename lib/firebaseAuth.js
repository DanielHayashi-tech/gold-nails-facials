import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth'
import { useState, useEffect } from 'react'
import app from './firebaseApp';
  


const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const auth = getAuth();
  const cart = [];
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);    
    setLoading(false);
  };

    const signIN = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
    
    const create_account = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password).then(async (authUser) => {
      await sendVerificationEmail(); // Add 'await' here
      return authUser.user; // Return the 'user' property of 'authUser'
    });
    const sendVerificationEmail = () => {
      const user = auth.currentUser;
      if (user) {
        return sendEmailVerification(user) // Add 'return' here
          .then(() => {
            console.log('Verification email sent');
          })
          .catch((error) => {
            console.log('Error sending verification email:', error.message);
          });
      }
    };

    const signOut = () =>
    auth.signOut();

    const getToken = () => 
    auth.currentUser.getIdToken();
  const resetPassword = (email) =>

  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });


// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    cart,
    authUser,
    loading,
    signIN,
    create_account,
    signOut,
    resetPassword,
    sendEmailVerification,
    getToken
  };
}