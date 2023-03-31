import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import ActiveLink from './ActiveLink';


export default function NavBar() {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Golden Nails and Facials</Navbar.Brand>
        </Link>
      </Container>
      <Container>  
        <Link href="/dashboard" passHref>
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </Link>
        <Link href="/about" passHref>
          <Navbar.Brand>About</Navbar.Brand>
        </Link>
        <Link href="/service" passHref>
          <Navbar.Brand>Service</Navbar.Brand>
        </Link>
        <Link href="/quote" passHref>
          <Navbar.Brand>Quote</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};
