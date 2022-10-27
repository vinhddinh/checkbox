import prisma from "/prisma/client";

export default async function handle(req, res) {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}
