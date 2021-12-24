const { User } = require("../models");
const addresses = {};

module.exports = (socket) => {
  socket.on("load", (payload) => {
    console.log(payload);
    socket.emit("greeting", "Hello, World! Socket.io is configured.");
  });
};
