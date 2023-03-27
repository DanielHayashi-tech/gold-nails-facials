import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import ActiveLink from './ActiveLink';


export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Golden Nails and Facials</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <li>
              <ActiveLink href='/profile'>
                Profile
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/dashboard">
                Dashboard
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/reports">
                Reports
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/settings">
                Settings
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/about">
                Mock data
              </ActiveLink>
            </li>
            <li>
              {/* TODO: this logout button does not work */}
              <ActiveLink href="/Logout">
                Logout
              </ActiveLink>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};