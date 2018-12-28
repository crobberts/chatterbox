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


socket.on("updatedList", (list) => {
    let userList = document.getElementById('users');

    for (let i in list) {
        newChild = document.createElement('LI');
        newChild.innerHTML = i;
        userList.appendChild(newChild);
    }
});

socket.on("addConnectedUser", (user) => {
    let userList = document.getElementById('users');
    newChild = document.createElement('LI');
    newChild.innerHTML = user;
    userList.appendChild(newChild);
    let asd = document.getElementById('chat_messages');
    let mdb = document.createElement('LI');
    mdb.innerHTML = user + " JOINED THE SERVER";
    asd.appendChild(mdb);
});
