import prisma from "/prisma/client";

export default async function handle(req, res) {
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
