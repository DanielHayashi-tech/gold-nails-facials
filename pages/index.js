import Link from 'next/link'


export default function HomePage() {
  return (
    <div>
      <h3>Home</h3>
            <p>
              This page does not require authentication, so it won't redirect to
              the login page if you are not signed in.
            </p>
            <ul>
                <li><Link href="/login">Login</Link></li>
            </ul>
    </div>
  );
}