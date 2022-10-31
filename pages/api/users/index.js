import prisma from "/prisma/client";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (e) {
        res.status(500).json({ error: e });
      }
      break;
    case "POST":
      try {
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
          },
        });
        res.status(201).json(user);
      } catch (e) {
        if (e.code === "P2002") {
          res.status(409).json({ error: "User already exists" });
        } else {
          res.status(500).json({ error: e });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
