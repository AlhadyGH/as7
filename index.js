import express from "express";
import bootstrap from "./src/app.controller.js";

const app = express();

bootstrap(app, express);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server has been running on http://${process.env.HOST}:${process.env.SERVER_PORT}`,
  );
});
