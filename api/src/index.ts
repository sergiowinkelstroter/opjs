import express from "express";
import path from "node:path";
import mongoose from "mongoose";
import http from "node:http";
import { router } from "./router";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const port = process.env.PORT || 3001;
const mongoDB = process.env.MONGO_URL;

if (!mongoDB) {
  throw new Error("MONGO_URL não está definido");
}

mongoose
  .connect(mongoDB, {
    authSource: "admin",
  })
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    app.use(express.json());

    app.use(router);

    server.listen(port, () => {
      console.log("Server is running on http://localhost:3001");
    });
  })
  .catch((error) => console.log("Erro ao conectar no MongoDB:", error));
