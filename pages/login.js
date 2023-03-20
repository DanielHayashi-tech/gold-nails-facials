import { useState } from 'react';
import Link from 'next/link'

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {

  return (
    
    <div>
      <Header title="You made it to the login page! 👾" />
      <ul>
          <li><Link href="/">Take me back home</Link></li>
      </ul>
      
      
      <br>
      </br>
      
    </div>
  );
}