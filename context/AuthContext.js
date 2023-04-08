import { createContext, useContext } from 'react';
import useFirebaseAuth from '../lib/firebaseAuth';
import { resetPassword } from 'firebase/auth'; // Import resetPassword from firebase/auth


const authUserContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => {},
  create_account: async () => {},
  signOut: async () => {},
  getUser: async () => {},
  resetPassword: async () => {},
});

// Add resetPassword function to the value provided by AuthUserProvider
const sendResetEmail = async (email) => {
  try {
    console.log(auth)
    await resetPassword(auth.auth, email); // Call resetPassword with auth instance
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();

  return (
    <authUserContext.Provider
      value={{ ...auth}}
    >
      {children}
    </authUserContext.Provider>
  );
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
