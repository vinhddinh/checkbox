import prisma from "/prisma/client";

export default async function handle(req, res) {
  const todos = await prisma.todo.findMany();
  res.status(200).json(todos);
}
