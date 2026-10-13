import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "./src/Config/dev.env" });

console.log(process.env.SERVER_PORT, process.env.HOST);

export const sequelize = new Sequelize("social_app", "root", "root", {
  dialect: "mysql",
  host: process.env.HOST,
  port: process.env.DB_PORT,
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const syncDB = async () => {
  try {
    await sequelize.sync({force: false, alter: false});
    console.log("All models has been synchronized successfully");
  } catch (error) {
    console.log("Unable to synchronize DB!!!", error)
  }
};
