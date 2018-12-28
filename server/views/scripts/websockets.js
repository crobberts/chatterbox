const socket = io();
socket.username = document.getElementById('username').innerHTML;
socket.emit("setUsername", socket.username);

const sendMessage = (event) => {
    socket.emit('chatmessage', {content: document.getElementById('send').value, username: socket.username});
    document.getElementById('send').value = "";
}

socket.on("broadcast", (message) => {
    let asd = document.getElementById('chat_messages');
    let mbd = document.createElement('LI');

    mbd.innerHTML = socket.username + ": " + message.message;
    asd.appendChild(mbd);
});

socket.on("username", (usr) => {
    let asd = document.getElementById('chat_messages');
    let mdb = document.createElement('LI');
    mdb.innerHTML = usr.username + " JOINED THE SERVER";
    asd.appendChild(mdb);
})
