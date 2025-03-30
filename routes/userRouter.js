import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: {
      username: "asc",
    },
  });
  if (!users) return res.sendStatus(500);
  res.send(users);
});

userRouter.post("/", async (req, res) => {
  const { username, score } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      score: parseInt(score),
    },
  });
  if (!user) return res.sendStatus(500);
  res.sendStatus(200);
});

export default userRouter;
