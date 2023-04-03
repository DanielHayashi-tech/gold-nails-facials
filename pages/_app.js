import '../public/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../context/styles/globals.css";

import { AuthUserProvider } from '../context/AuthContext';
import { initFirebase } from '../lib/firebaseApp';
import { ChakraProvider } from "@chakra-ui/react";

initFirebase()

export default function App({ Component, pageProps }) {
  return <>
  <ChakraProvider>
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  </ChakraProvider>
  </>
}

