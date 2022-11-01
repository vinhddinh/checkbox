import { authOptions } from "/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "/prisma/client";

export default async function handle(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let emailToFind = req.query.email;
  // Protect all user routes except "public@dinh.cc", this should not be hard coded
  if (emailToFind !== "public@dinh.cc") {
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (session.user.email !== emailToFind) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
  }
  const todos = await prisma.todo.findMany({
    where: {
      user: {
        email: emailToFind,
      },
    },
  });
  res.status(200).json(todos);
}
