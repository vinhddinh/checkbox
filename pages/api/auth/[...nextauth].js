import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(`signIn: ${user.email}`);
      // create user if not exists
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
        }),
      });
      if (res.status === 201) {
        console.log(`Created user ${user.email}`);
      } else if (res.status === 409) {
        console.log(`User ${user.email} already exists`);
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
