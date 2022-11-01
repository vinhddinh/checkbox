import { authOptions } from "/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "/prisma/client";

export default async function handle(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  let emailToQuery = req?.body?.email;

  // If no session, add todos to email "public@dinh.cc"
  if (!session) {
    emailToQuery = "public@dinh.cc";
  }

  switch (req.method) {
    case "GET":
      try {
        const todos = await prisma.todo.findMany({
          where: {
            id: parseInt(req.query.id),
          },
        });
        res.status(200).json(todos);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    case "POST":
      try {
        const todo = await prisma.todo.create({
          data: {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            user: {
              connect: {
                email: emailToQuery,
              },
            },
          },
        });
        res.status(201).json(todo);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    case "PUT":
      try {
        const todo = await prisma.todo.update({
          where: {
            id: parseInt(req.query.id),
          },
          data: {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            dueDate: req.body.dueDate,
          },
        });
        res.status(204).json();
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    case "DELETE":
      try {
        const todo = await prisma.todo.delete({
          where: {
            id: parseInt(req.query.id),
          },
        });
        res.status(200).json(todo);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
