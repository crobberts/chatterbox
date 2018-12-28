const socket = io();

socket.emit("setUsername", document.getElementById('username').innerHTML);

const sendMessage = (event) => {
    socket.emit('chatmessage', {content: document.getElementById('send').value});
    document.getElementById('send').value = "";
}

socket.on("broadcast", (message) => {
    let asd = document.getElementById('chat_messages');
    let mbd = document.createElement('LI');

    mbd.innerHTML = message.username + ": " + message.message;
    asd.appendChild(mbd);
});

socket.on("username", (usr) => {
    let asd = document.getElementById('chat_messages');
    let mdb = document.createElement('LI');
    mdb.innerHTML = usr.username + " JOINED THE SERVER";
    asd.appendChild(mdb);
})
