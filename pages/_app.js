import '../public/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/globals.css";
import { AuthUserProvider } from '../context/AuthContext';
import { initFirebase } from '../lib/firebaseApp';

// Register the ChartDataLabels plugin globally




initFirebase()

export default function App({ Component, pageProps }) {
  return <>
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
    </>
}

