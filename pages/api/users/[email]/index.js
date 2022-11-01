import { authOptions } from "/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "/prisma/client";

export default async function handle(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  // Only allow a user to access their own account operations on this endpoint

  session ? {} : res.status(401).json({ error: "Unauthorized" });
  if (session?.user?.email !== req.query.email) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: req.query.email,
          },
        });
        res.status(200).json(user);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    case "PUT":
      try {
        const user = await prisma.user.update({
          where: {
            email: req.query.email,
          },
          data: {
            name: req.body.name,
          },
        });
        res.status(204);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    case "DELETE":
      try {
        const user = await prisma.user.delete({
          where: {
            email: req.query.email,
          },
        });
        res.status(200).json(user);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
