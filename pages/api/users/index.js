import prisma from "/prisma/client";

export default async function handle(req, res) {
  // This is the only route that is not protected
  switch (req.method) {
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
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
