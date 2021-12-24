require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const server = app.listen(PORT, () =>
  console.log(`🚢 Server listening on port ${PORT} 🚢`)
);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: CLIENT_URL, //whatever port client runs on!
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require("./middleware/headers"));

db.sync({ 
  // force: true 
});

const { user, socket } = require("./controllers");

app.use("/user", user);
io.on("connection", socket);
