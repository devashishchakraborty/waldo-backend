import express from "express";
import path from "path";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import characterRouter from "./routes/characterRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/characters", characterRouter);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Blog API listening on port ${port}`);
});
