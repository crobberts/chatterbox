let connectedUsers = {};

const wsCommunication = (io) => {
    io.on("connection", (socket) => {

        socket.on("setUsername", (username) => {
            socket.username = username;
            socket.emit("updatedList", connectedUsers);

            if (!connectedUsers[socket.username]) {
                connectedUsers[socket.username] = true;

                io.sockets.emit("addConnectedUser", socket.username);
            }
        });

        socket.on("chatmessage", (messageInfo) => {
            io.sockets.emit("broadcast", {"message": messageInfo.content, "username": socket.username});
        });

        socket.on("logout", () => {
          connectedUsers[socket.username] = false;
        });
    });
};

module.exports = wsCommunication;
