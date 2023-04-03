import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useState, useEffect } from 'react'
import app from './firebaseApp';
  

const provider = new GoogleAuthProvider();

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const auth = getAuth();

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
    
    const create_account = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

    const googleSignIn = () =>
    signInWithPopup(auth, provider)

    const signOut = () =>
    auth.signOut();

    const getToken = () => 
    auth.currentUser.getIdToken();

// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signIN,
    create_account,
    signOut,
    googleSignIn,
    getToken
  };
}