import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connection from "./mongo/connection.js";

import userRouter from "./routes/user.routes.js";
import bonsaiRouter from "./routes/bonsai.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use("/api/user", userRouter);
app.use("/api/bonsai", bonsaiRouter);

const startServer = async () => {
  try {
    connection(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => console.log("Server UP on port:",process.env.PORT));
  } catch (error) {
    console.log(error);
  }
};

startServer();
