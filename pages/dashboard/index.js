import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../../components/logoutButton';
import ClientIntakeForm from '../../components/clientIntakeForm';


export default function Dashboard() {
    // const auth = getAuth();
    const router = useRouter();
    const userName = "";
    // const[user, loading] = useAuthState(auth);
    const { authUser, loading, getUser, signOut } = useAuth();


    useEffect(() => {
      if (!loading && !authUser)
        router.push('/')
    }, [authUser, loading])

    return (
      <div>
        <div style={{
                textAlign: 'center',
                fontSize: '50px',
                fontWeight: 'bold',
                color: 'red',
                margin: '10px',
                padding: '10px',
            }}>
            <h1>Dashboard</h1>
        </div>
        <ClientIntakeForm />
        <div>
        <LogoutButton />
        </div>
      </div>
    );
  }