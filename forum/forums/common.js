// https://script.google.com/macros/s/AKfycbw_HPP9vJ_0BqBFpxd00jZHD2SPubpMggk04HOzR-E4Zmc336q9mNkYn8xZx8iQGch7Jw/exec

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}

async function get_messages(name="main") {
    const response = await fetch(
        url,
        {
            method : "POST",
            body : JSON.stringify({
                "request" : "get_comment",
                "whereToGet" : name
            })
        }
    )
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(_ => { return "no" });

    if (response == "no") {
        return "no";
    } else {
        const messages_box = document.getElementById("messages_box");
        let result = response.result.filter(_ => { return _.message == "" ? undefined : _ });

        if (result.indexOf(undefined) != -1) {
            result = {"parentID" : "", "messageID": "", "username" : "", "message" : "メッセージなし", "date" : ""};
        }

        messages_box.innerHTML = "<br>";
        for (const message of result) {
            console.log(message);
            if (message.parentID != "") {
                document.getElementById("ID" + message.parentID).innerHTML += `
                    <div class="message reply">
                        <p id="username">${message.username}<small id="date">　${message.date}</small></p>
                        <p id="text">${message.message}</p>
                    </div>`;
            } else {
                messages_box.innerHTML += `
                    <div class="message" id="ID${message.messageID}">
                        <p id="username">${message.username}<small id="date">　${message.date}</small></p>
                        <p id="text">${message.message}</p>
                    </div>
                    <br>`;
            }
            
        }
        messages_box.innerHTML += "";
    }
}

async function send_new_message(name="main") {
    const date = new Date();
    const status = document.getElementById("status");

    const data = {
        "request" : "send_new_comment",
        "whereToSend" : name,
        "username" : document.getElementById("username_box").value,
        "message" : document.getElementById("message_box").value,
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
    .catch(_ => { console.error(_); return "no" });

    if (response.result == "ok") {
        status.innerText = "送信しました";
        document.getElementById("username_box").value = "";
        document.getElementById("message_box").value = "";
        get_messages(document.getElementById("this_forum_name").value);
    } else {
        status.innerText = "送信に失敗しました";
    }
}

onload = async () => {
    if (location.href.match("forum") != null) {
        get_messages(document.getElementById("this_forum_name").value);
    }
}