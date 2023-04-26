const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const authAdminRoutes = require("./routes/authAdmin");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `${process.env.BASE_URL}`,
  },
});

//config
dotenv.config();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/authAdmin", authAdminRoutes);

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });

  console.log("::::socket Users:::::::", users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user 1connected.");
  socket.on("addUser", (userId) => {
    console.log("add a new connection");
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user 1disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
