import '../public/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from '../components/navBar';
import { AuthUserProvider } from '../context/AuthContext';
import { initFirebase } from '../lib/firebaseApp';


initFirebase()

export default function App({ Component, pageProps }) {
  return <>
  <NavBar />
    {/* <Component {...pageProps} /> */}
  <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
  </>
}

