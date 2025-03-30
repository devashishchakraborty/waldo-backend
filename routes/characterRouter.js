import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const characterRouter = Router();
const prisma = new PrismaClient();

characterRouter.get("/:characterId", async (req, res) => {
  const { x, y } = req.query;
  const character = await prisma.character.findUnique({
    where: {
      id: parseInt(req.params.characterId),
    },
  });

  if (!character) return res.sendStatus(500);

  const isSelected =
    x > character.left &&
    x < character.right &&
    y > character.top &&
    y < character.bottom;

  res.send({ success: isSelected });
});

characterRouter.get("/", async (req, res) => {
  const characters = await prisma.character.findMany();
  if (!characters) return res.sendStatus(500);
  res.send(characters);
});

export default characterRouter;
