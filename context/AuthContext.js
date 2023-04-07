import { createContext, useContext } from 'react';
import useFirebaseAuth from '../lib/firebaseAuth';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import sendPasswordResetEmail from firebase/auth

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => {},
  create_account: async () => {},
  signOut: async () => {},
  getUser: async () => {},
  sendPasswordResetEmail: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();

  // Add sendPasswordResetEmail function to the value provided by AuthUserProvider
  const sendResetEmail = async (email) => {
    try {
      console.log(auth)
      await sendPasswordResetEmail(auth.auth, email); // Call sendPasswordResetEmail with auth instance
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <authUserContext.Provider
      value={{ ...auth, sendPasswordResetEmail: sendResetEmail }}
    >
      {children}
    </authUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
