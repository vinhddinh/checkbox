import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import CheckListItem from "../components/CheckList";

export default function Home() {
  const { data: session, status } = useSession();
  var item = {
    text: "This is a test",
    isComplete: false,
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
        <ListGroup>
          <CheckListItem item={item} />
        </ListGroup>
      </main>
    </div>
  );
}
