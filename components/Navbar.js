import { Container, Navbar, Button } from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";

export default function NavBar({ session }) {
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container className="justify-content-between">
          <NavBarBrand session={session} />
          <SignInOutButtton session={session} className="justify-content-end" />
        </Container>
      </Navbar>
    </>
  );
}

export function SignInOutButtton({ session }) {
  if (session) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  } else {
    return (
      <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
    );
  }
}

export function NavBarBrand({ session }) {
  if (session) {
    return <Navbar.Brand>{session.user.name}</Navbar.Brand>;
  } else {
    return <Navbar.Brand>Public Checklist</Navbar.Brand>;
  }
}
