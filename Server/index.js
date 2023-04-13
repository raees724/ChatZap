require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const connection = require("./db");
const authAdminRoutes = require("./routes/authAdmin");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
// const postRoutes = require("./routes/post");

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// app.use("/api/posts", postRoutes);
app.use("/api/authAdmin", authAdminRoutes);


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });

      console.log("::::socket Users:::::::",users);
  };


const removeUser = (socketId) =>{
  users = users.filter((user) => user.socketId !== socketId);
}
 
const getUser = (userId) =>{
  return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    
  //when connect
    console.log("a user connected.");
    // io.emit("welcome","hello this is socket server") useEffect2

//take userId and SocketId from user
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    });

  //send and get message
  socket.on("sendMessage",({senderId,receiverId,text})=>{
    const user = getUser(receiverId)
    // console.log("usersnte ullil :",user.socketId)
    io.to(users.socketId).emit("getMessage",{
      senderId,
      text,
    })
  })

    //when disconnect
    socket.on("disconnect", ()=>{
      console.log("a user disconnected")
      removeUser(socket.id)
      io.emit("getUsers",users)
    })
})  


const port = process.env.PORT || 2000;
app.listen(port, console.log(`Listening on port ${port}...`));
