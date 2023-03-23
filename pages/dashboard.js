import { initFirebase } from '../lib/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client'

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const posts = await prisma.Client_status.findMany()
  console.log(posts)
  return {
    props : { posts }
  }
}



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
        <h2> Welcome {user.displayName} </h2>
        <p> Looks like you were authenticaed bc you wouldn't be here otherwise! </p>
        <br></br>
        <h5> Click the button below me to signout!</h5>
        <button onClick={() => auth.signOut()}>Log Out</button>
      </div>
    );
  }