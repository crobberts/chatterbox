let connectedUsers = {};
let latestMessages = [];

const wsCommunication = (io) => {
    io.on("connection", (socket) => {

        socket.on("setUsername", (username) => {
            socket.username = username;
            socket.emit("updatedList", connectedUsers);

            if (!connectedUsers[socket.username]) {
                connectedUsers[socket.username] = true;

                io.sockets.emit("newUser", socket.username);
                socket.emit("messageHistory", latestMessages);
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
    });
};

module.exports = wsCommunication;
