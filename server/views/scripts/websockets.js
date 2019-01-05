const socket = io();

socket.emit("setUsername", document.getElementById('username').innerHTML);

const sendMessage = (event) => {
    let msg = document.getElementById('send').value;
    socket.emit('chatmessage', {content: msg});

    document.getElementById('send').value = "";
}

const logout = (event) => {
  socket.emit('logout');
}

socket.on("broadcast", (message) => {
    let chatDiv = document.getElementById('chat_messages');
    let chatMessage = document.createElement('LI');

    chatMessage.innerHTML = message.username + ": " + message.message;
    chatDiv.appendChild(chatMessage);
    chatMessage.scrollIntoView();
});

socket.on("removeUser", (user) => {
    let userList = document.getElementById('users');
    userList.innerHTML = "";

    for (let i in user.users) {
        newChild = document.createElement('LI');
        newChild.innerHTML = i;
        userList.appendChild(newChild);
    }

    let chatDiv = document.getElementById('chat_messages');
    let chatMessage = document.createElement('LI');
    chatMessage.className = "left";
    chatMessage.innerHTML = user.username + " LEFT THE SERVER";
    chatDiv.appendChild(chatMessage);
    chatMessage.scrollIntoView();
});

socket.on("updatedList", (list) => {
    let userList = document.getElementById('users');
    userList.innerHTML = "";

    for (let i in list) {
        newChild = document.createElement('LI');
        newChild.innerHTML = i;
        userList.appendChild(newChild);
    }
});

socket.on("newUser", (user) => {
    let userList = document.getElementById('users');
    newChild = document.createElement('LI');
    newChild.innerHTML = user;
    userList.appendChild(newChild);
    let chatDiv = document.getElementById('chat_messages');
    let chatMessage = document.createElement('LI');
    chatMessage.className = "joined";
    chatMessage.innerHTML = user + " JOINED THE SERVER";
    chatDiv.appendChild(chatMessage);
    chatMessage.scrollIntoView();
});

socket.on("messageHistory", (messages) => {
    let chatDiv = document.getElementById('chat_messages');
    for (let i in messages) {
        let nChatMessage = document.createElement('LI');
        nChatMessage.innerHTML = messages[i].username + ": " + messages[i].content;
        chatDiv.appendChild(nChatMessage);
    }
});

socket.on("emptyMsg", () => {
    let emptyMsgErr = document.getElementById('emptyMsgErr');
    emptyMsgErr.innerHTML = "no empty message allowed";

    setTimeout(() => {
        emptyMsgErr.innerHTML = "";
    }, 1000);
});

/*SOCKET CONNECTION ERROR HANDLING*/

socket.on("connect", () => {
    let errorDiv = document.getElementById('error');
    errorDiv.innerHTML= "Connected";
    errorDiv.className = "joined";
});

socket.on
socket.on("reconnect", () => {
    let errorDiv = document.getElementById('error');
    errorDiv.innerHTML= "reconnect";
    errorDiv.className = "joined";
});

socket.on('connect_error', (err) => {
    handleError();
});

const handleError = () => {
    let errorDiv = document.getElementById('error');
    errorDiv.innerHTML = "connect_failed";
    let loadingImg = document.createElement('img');
    loadingImg.src = "/public/images/spinning2.gif";
    errorDiv.appendChild(loadingImg);
    errorDiv.className = "left";
}
