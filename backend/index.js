const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
const app = express();
const socket = require("socket.io");

// middlewares used by express
app.use(cors()); 
app.use(express.json());


// use router
app.use("/api/auth",userRoutes);
app.use("/api/messages", messageRoutes);

// database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database connected...");
}).catch((err) => console.log(err.message));

const PORT = process.env.PORT || 4040;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

const io = socket(server, {
    cors:{
        origin:"http://localhost:5173",
        Credential:true
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});



