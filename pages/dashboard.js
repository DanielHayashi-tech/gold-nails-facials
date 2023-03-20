import { initFirebase } from '../lib/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';

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
        <h3> Looks like you were authenticaed bc you wouldn't be here otherwise! </h3>
        <br></br>
        <h5> Click the button below me to signout!</h5>
        <button onClick={() => auth.signOut()}>Log Out</button>
      </div>
    );
  }