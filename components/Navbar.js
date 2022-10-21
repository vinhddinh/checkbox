import { Container, Navbar, Nav } from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";

export default function NavBar({ session }) {
  return (
    <div class="align-items-center">
      <Navbar bg="light" expand="lg">
        <Container>
          <NavBarBrand session={session} />
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <SignInOutLink session={session} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export function SignInOutLink({ session }) {
  if (session) {
    return <Nav.Link onClick={() => signOut()}>Sign Out</Nav.Link>;
  } else {
    console.log("sign in");
    return <Nav.Link onClick={() => signIn("github")}>Sign in</Nav.Link>;
  }
}

export function NavBarBrand({ session }) {
  if (session) {
    return <Navbar.Brand href="#home">{session.user.name}</Navbar.Brand>;
  } else {
    return <Navbar.Brand href="#home">Public Checklist</Navbar.Brand>;
  }
}
