const express = require("express");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");



require("dotenv").config();

const Profile = require("./models/profile")
const Chatroom = require("./models/chatroom");
const Message = require("./models/message");

const {checkMovieUser,checkMoviesUser} = require("./controller/movies")


const {notification} = require("./controller/transactions")


const app = express();

// Middleware
const verifyJWT = require("./middleware/verifyJWT");

// Connect
const sequelize = require("./config/connect");
// const { Socket } = require("dgram");

sequelize.authenticate().then(()=>{
    console.log("connected")
});

// Cors and Socket
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"]
    }
});


  
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("uploads"));


app.get("/api/v1/movies", checkMoviesUser);
app.get("/api/v1/movie/:id", checkMovieUser);

app.use("/api/v1", require("./routes/auth"));
app.post("/api/v1/notification",notification)


app.use(verifyJWT);

// ROUTES


app.use("/api/v1/", require("./routes/categories"));
app.use("/api/v1/" , require("./routes/movies"));
app.use("/api/v1/profile/", require("./routes/profiles"));
app.use("/api/v1/",require("./routes/users"))
app.use("/api/v1/", require("./routes/chats"));
app.use("/api/v1/", require("./routes/transactions"));
app.use("/api/v1/",require("./routes/favorites"));

//Socket

io.on("connection", (socket)=>{
    console.log(socket.id + "  connected")

    socket.on("get_profile",async(data)=>{
        const id = data.id;

        try {

        const profile = await Profile.findOne({
            where:{
                   user_id : id
                  },
                
            attribute:["profile_img"]
                });
        

        if(!profile.profile_img){
            return socket.emit("profile_updated", {image:null})
        }
        
        const image = process.env.SERVER_URL + profile.profile_img;

        socket.emit("profile_updated",{image}) 
    
       } catch(err) {

        console.log(err)

       }

        
    })

    socket.on("join_room", (data)=>{
         const rooms = data.room_ids;
         
         socket.join(rooms);
         
    });

    socket.on("send_message", async(data)=>{
        const {userId,roomID,message} = data;
        

        // insert and update database
        try {
             
            // Create and update
             const chatSent = await Message.create({
             room_id : roomID,
             sender_id : userId,
             body :  message ,
             });
      
             await Chatroom.update({last_msg:chatSent.body},{
               where : {room_id:chatSent.room_id}
             });


             return io.in(roomID).emit("message_sent", {
                roomid: roomID
             });

           
      
             } catch(err) {
                return socket.emit("message_fail",{
                message:"Server Error"
              })
             };
    })


    socket.on("disconnect" , ()=>{
        console.log(socket.id + "disconnected")
    })
})



server.listen(5000,()=>{
    console.log("connected to 5000")
});
