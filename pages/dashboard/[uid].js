import { useRouter } from 'next/router'


export default function AdminDash(props) {
    const router = useRouter();
    const { uid } = router.query;
    console.log(router);

    

    return (
        <div>
            <h1> Admin Dash - {uid} </h1>
        </div>
    )
}