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
    return <div> [] </div>
  }


  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)

    // await prisma.Clients.create({
    //   first_name: result.user.displayName,
    //   email: result.user.email,
    //   phone_number: result.user.phoneNumber,
    //   client_status_description: 'active'
    // })

  }
  return (
    <div>
      <h3>Click the button below to sign in:</h3>
      <br></br>
      
      <button onClick={() => signIn()}> Click me to if you want to see your dashboard!</button>
    </div>
  );
}