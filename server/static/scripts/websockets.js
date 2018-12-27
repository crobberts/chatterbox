const socket = io();

function sendMessage(event) {
    socket.emit('chatmessage', document.getElementById('send').value);
    document.getElementById('send').value = "";
}

socket.on("broadcast", function(message) {
    let asd = document.getElementById('chat_messages');
    let mbd = document.createElement('LI');
    mbd.innerHTML = message.message;
    asd.appendChild(mbd);
});
