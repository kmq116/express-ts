import * as http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { dbListeners } from "./mongodb/db";
import useRouter from "./routers";
// import swaggerUi from 'swagger-ui-express'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dbListeners();
app
  .use(cors())
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));
useRouter(app);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", () => {
  console.warn("a user connected");
});

server.listen(3000, () => {
  console.warn(`server started on port http://127.0.0.1:${PORT}`);
});
