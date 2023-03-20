import { initFirebase } from '../lib/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/router';


export default function HomePage() {
  //initializing configuration
  initFirebase();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();


  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
  }
  return (
    <div>
      <h3>Click the button bellow to sign in:</h3>
      <br></br>
      <button onClick={signIn}> Click me to reveal yourself!</button>
    </div>
  );
}