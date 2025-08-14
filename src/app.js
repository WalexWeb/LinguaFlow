import express from "express";
import { PORT } from "./config/env.js";
import { authRouter } from "./routes/auth.routes.js";
import connectToDb from "./db/mongodb.js"

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectToDb();
});
