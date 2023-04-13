const dotenv = require("dotenv")
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authUserRoutes = require("./routes/authUser");
const authAdminRoutes = require("./routes/authAdmin");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");


const ConverstationRoutes = require("./routes/converstationRoutes");
const MessageRoutes= require("./routes/messagesRoutes");

//config
dotenv.config();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/authUser", authUserRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/authAdmin", authAdminRoutes);



app.use('/api/converstation', ConverstationRoutes);
app.use('/api/message', MessageRoutes);



let users = []

const addUser = (urId, socketId) => {
    !users.some(user => user.urId === urId) &&
        users.push({ urId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (id) => {
    return users.find(user => user.urId === id)
}

io.on('connection', (socket) => {
    console.log(' connection');
    // take urId and socketId from user
    socket.on('addUser', urId => {
        console.log('add new connection');
        addUser(urId, socket.id);
        io.emit('getUsers', users)
    })
    // Send and Get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log('new message');
        io.to(user?.socketId).emit('getMessage', {
            senderId, text
        })
    })

    // Disconnect
    socket.on('disconnect', () => {
        console.log('dissconnecte');
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})


const port = process.env.PORT || 2000;
app.listen(port, console.log(`Listening on port ${port}...`));