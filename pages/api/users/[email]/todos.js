import prisma from "/prisma/client";

export default async function handle(req, res) {
  const todos = await prisma.todo.findMany({
    where: {
      user: {
        email: req.query.email,
      },
    },
  });
  res.status(200).json(todos);
}
