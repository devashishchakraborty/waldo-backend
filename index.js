import express from "express";
import path from "path";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(cors());

app.post("/api/:characterId/check", async (req, res) => {
  const { x, y, height, width } = req.body;
  const { characterId } = req.params;
  const character = await prisma.character.findUnique({
    where: {
      id: parseInt(characterId),
    },
  });

  const normFactor =
    (character.scene_height / parseFloat(height) +
      character.scene_width / parseFloat(width)) /
    2;

  const [normalizedX, normalizedY] = [x * normFactor, y * normFactor];

  const isSelected =
    character.left < normalizedX < character.right &&
    character.top < normalizedY < character.bottom;
  
  res.send({isSelected});
});

app.get("/api/characters", async (req, res) => {
  const characters = await prisma.character.findMany();
  res.send(characters);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Blog API listening on port ${port}`);
});
