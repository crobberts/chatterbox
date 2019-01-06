let connectedUsers = {};
let latestMessages = [];
const CONNECTION = "connection";
const MESSAGE_HISTORY = "messageHistory";
const SET_USERNAME = "setUsername";
const CHAT_MESSAGE = "chatmessage";
const LOGOUT = "logout";
const DISCONNECT = "disconnect";


const wsCommunication = (io) => {

/**
	Callback function will be executed when a client socket is connected.
	
	@param CONNECTION - connection command
	@callback - Attaches username to the client-socket (not visible on client side), 
		adds the client to list of logged in users and broadcasts that a user has logged in.
		The function will keep listening for new requests while connected and will handle them appropriatly.
**/
    io.on(CONNECTION, (socket) => {
        socket.emit("messageHistory", latestMessages);
        
        socket.on(SET_USERNAME, (username) => {
            socket.username = username;
            socket.emit("updatedList", connectedUsers);

            if (!connectedUsers[socket.username]) {
                connectedUsers[socket.username] = true;
                io.sockets.emit("newUser", socket.username);
            }
        });

        socket.on(CHAT_MESSAGE (messageInfo) => {
            latestMessages.push({content: messageInfo.content, username: socket.username});
            io.sockets.emit("broadcast", {"message": messageInfo.content, "username": socket.username});
        });

        socket.on(LOGOUT, () => {
          connectedUsers[socket.username] = false;
          delete connectedUsers[socket.username];
          io.sockets.emit("removeUser", {users: connectedUsers, username: socket.username});
          socket.disconnect();
        });

        socket.on(DISCONNECT, () => {
            console.log('disonnected');
        });
    });
};

module.exports = wsCommunication;
