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
        <Link href="/dashboard" passHref>
          <Navbar.Brand>Dashboard</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};
