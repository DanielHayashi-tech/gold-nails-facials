import '../public/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from '../components/navBar';



export default function App({ Component, pageProps }) {
  return <>
  <NavBar />
  <Component {...pageProps} />
  </>
}

