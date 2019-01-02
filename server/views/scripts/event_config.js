document
.getElementById("send")
.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("sendbtn").click();
    }
});
