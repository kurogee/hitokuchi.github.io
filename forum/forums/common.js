const url = "https://script.google.com/macros/s/AKfycbxieuyrIx10yjdtKzHO_KVrccGOHdRok4WN2GPtGnexIhCBkQQvpx0UnEnt8UEZHABdGQ/exec";

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}

async function send_new_message(name="main") {
    const date = new Date();
    const status = document.getElementById("status");

    const data = {
        "request" : "send_new_comment",
        "whereToSend" : name,
        "username" : document.getElementById("username").value,
        "message" : document.getElementById("message").value,
        "date" : date.getFullYear()
                + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
                + '/' + ('0' + date.getDate()).slice(-2)
                + ' ' + ('0' + date.getHours()).slice(-2)
                + ':' + ('0' + date.getMinutes()).slice(-2)
                + ':' + ('0' + date.getSeconds()).slice(-2),
        "ip" : await getip(),
    }

    status.innerText = "送信中...";
    const response = await fetch(
        url,
        {
            method : "POST",
            body : JSON.stringify(data)
        }
    )
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(_ => { return "no" });

    if (response == "ok") {
        status.innerText = "送信しました";
    } else {
        status.innerText = "送信に失敗しました";
    }
}

async function get_messages(name="main") {
    
}