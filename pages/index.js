import { initFirebase } from '../lib/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';


export default function HomePage() {
  //initializing configuration
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const[user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div> Loading... </div>
  }

  if (user) {
    router.push("/dashboard")
    return <div> Welcome {user.displayName} </div>
  }


  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
  }
  return (
    <div>
      <h3>Click the button below to sign in:</h3>
      <br></br>
      <button onClick={() => signIn()}> Click me to if you want to see your dashboard!</button>
    </div>
  );
}