import express from "express";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";
import userRouter from "./routes/userRouter.js";
import characterRouter from "./routes/characterRouter.js";

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: { error: "Too many requests, please try again later." },
  headers: true, // Send RateLimit headers in the response
});

app.use(limiter);
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
  console.log(`Waldo Backend listening on port ${port}`);
});
