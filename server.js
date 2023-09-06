const express = require("express");
const { testRunDB } = require("./dbConnection");
const projectsRoute = require("./routes/cat");
var app = express();
var port = process.env.port || 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/cat", projectsRoute);

io.on("connection", (socket) => {
    console.log("a client is connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    setInterval(() => {
        socket.emit("number", parseInt(Math.random() * 10));
    }, 1000);
});
http.listen(port, () => {
    console.log("App listening to: " + port);
    testRunDB().catch(console.dir);
});
