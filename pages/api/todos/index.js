import prisma from "/prisma/client";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const todos = await prisma.todo.findMany();
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
                email: req.body.email,
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
          },
        });
        res.status(204);
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
