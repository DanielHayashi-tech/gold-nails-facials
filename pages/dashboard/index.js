import { initFirebase } from '../../lib/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/header';


export default function Dashboard() {
    const auth = getAuth();
    const router = useRouter();
    const userName = "Blah";
    const[user, loading] = useAuthState(auth);

    if (loading) {
        return <div> Loading... </div>
      }
    
      if (!user) {
        router.push("/")
        return <div> Please Sign in to Continue </div>
      }

    return (
      <div>
        <Header />

        <h2> Welcome {user.displayName} </h2>
        <br></br>
        <h5> Click the button below me to signout!</h5>
        <button onClick={() => auth.signOut()}>Log Out</button>
      </div>
    );
  }