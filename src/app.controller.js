import dotenv from "dotenv";
import { commentRouter, userRouter, postRouter } from "./Modules/index.js";
import { syncDB, testConnection } from "./DB/connection.js";
import userModel from "./DB/Models/users.model.js";
import postModel from "./DB/Models/posts.model.js";
import commentModel from "./DB/Models/comments.model.js";

dotenv.config({ path: "./src/Config/dev.env" });

const bootstrap = async (app, express) => {
  app.use(express.json());
  await testConnection();
  await syncDB();

  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome from app.controller.js" });
  });

  

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/comments", commentRouter);
  app.use("/api/v1/posts", postRouter);

  app.use("/*dummy", (req, res) => {
    return res.status(404).json({message: "Not found handler!!!"});
  })
};

export default bootstrap;
