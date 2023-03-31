import '../public/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from '@/components/Nav/MyNavbar';
import { AuthUserProvider } from '../context/AuthContext';
import { initFirebase } from '../lib/firebaseApp';
import "../context/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

initFirebase()

export default function App({ Component, pageProps }) {
  return <>
  <MyNavbar />
    {/* <Component {...pageProps} /> */}
    <ChakraProvider>
  <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
  </ChakraProvider>
  </>
}

