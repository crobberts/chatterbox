let connectedUsers = {};
let latestMessages = [];

const wsCommunication = (io) => {
    
    io.on("connection", (socket) => {
        socket.on("setUsername", (username) => {
            socket.username = username;
            socket.emit("updatedList", connectedUsers);

            if (!connectedUsers[socket.username]) {
                connectedUsers[socket.username] = true;

                socket.emit("messageHistory", latestMessages);
                io.sockets.emit("newUser", socket.username);
            }
        });

        socket.on("chatmessage", (messageInfo) => {
            latestMessages.push({content: messageInfo.content, username: socket.username});
            io.sockets.emit("broadcast", {"message": messageInfo.content, "username": socket.username});
        });

        socket.on("logout", () => {
          connectedUsers[socket.username] = false;
          delete connectedUsers[socket.username];
          io.sockets.emit("removeUser", {users: connectedUsers, username: socket.username});
          socket.disconnect();
        });

        socket.on("disconnect", () => {
            console.log('disonnected');
        });
    });
};

module.exports = wsCommunication;
