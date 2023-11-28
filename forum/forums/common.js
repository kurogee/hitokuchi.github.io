async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log("IP: " + res);

    return res;
}

function paste_url(url) {
    document.getElementById("message_box").value += `[img ${url}]`;
}

function delete_images_box() {
    document.getElementById("box_for_image").innerHTML = "";
}

function replace_text(text) {
    let result = text;
    
    result = result.split("&").join("&amp;");
    result = result.split("<").join("&lt;");
    result = result.split(">").join("&gt;");
    result = result.split("\n").join("<br>");

    result = result.replace(/\$\((.+?)\)\[(.+?)\]/g, "<a href='$1' target='_blank'>$2</a>");
    result = result.replace(/\[b (.+?)\]/g, "<span class='hutoji'>$1</span>");
    result = result.replace(/\[d (.+?)\]/g, "<span class='torikeshi'>$1</span>");
    result = result.replace(/\[i (.+?)\]/g, "<span class='shatai'>$1</span>");

    result = result.replace(/\[[ ]?img (.+?)\]/g, "<br><img src='$1' class='forum_image'><br>");
    result = result.replace(/\[[ ]?emoji (.+?)\]/g, "<img src='$1' class='emoji'>");

    console.log("Replaced text: " + result);
    return result;
}

function returnDate() {
    const date = new Date();
    return date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + ' ' + ('0' + date.getHours()).slice(-2)
            + ':' + ('0' + date.getMinutes()).slice(-2)
            + ':' + ('0' + date.getSeconds()).slice(-2);
}

function reply_prepare(messageID) {
    document.getElementById("reply_to").value = messageID;
}

function reply_reverse(messages) {
    const sorted_parentID = messages.filter(i => i.parentID != "");
    const sorted_normal = messages.filter(i => i.parentID == "");    

    const result = sorted_normal.reverse().concat(sorted_parentID);
    console.log(result);
    
    return result;
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
        result = reply_reverse(result);

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
                        <p id="username">${message.username}<small id="date">　${message.date}</small> <button onclick="reply_prepare('${message.messageID}');" class="button-reply">↩︎ 返信</button></p>
                        <p id="text">${message.message}</p>
                    </div>
                    <br>`;
            }
            
        }
        messages_box.innerHTML += "";
    }
}

async function send_reply_message(name="main") {
    const date = new Date();
    const status = document.getElementById("status");

    const data = {
        "request" : "send_reply_comment",
        "whereToSend" : name,
        "parentID" : document.getElementById("reply_to").value,
        "username" : replace_text(document.getElementById("username_box").value),
        "message" : replace_text(document.getElementById("message_box").value),
        "date" : returnDate(),
        "ip" : await getip(),
    };
    console.log("-+-Send data-+-");
    console.log(data);
    console.log("----------------");

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
    .catch(_ => { console.error(_); return "no"; });

    if (response.result == "ok") {
        status.innerText = "送信完了";
        document.getElementById("message_box").value = "";
        document.getElementById("reply_to").value = "";
        get_messages(document.getElementById("this_forum_name").value);
    } else {
        status.innerText = "送信に失敗しました";
    }
}

async function send_new_message(name="main") {
    const date = new Date();
    const status = document.getElementById("status");

    const data = {
        "request" : "send_new_comment",
        "whereToSend" : name,
        "username" : replace_text(document.getElementById("username_box").value),
        "message" : replace_text(document.getElementById("message_box").value),
        "date" : returnDate(),
        "ip" : await getip(),
    };
    console.log("-+-Send data-+-");
    console.log(data);
    console.log("----------------");

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
        status.innerText = "送信完了";
        document.getElementById("message_box").value = "";
        get_messages(document.getElementById("this_forum_name").value);
    } else {
        status.innerText = "送信に失敗しました";
    }
}

function sorting_message(name="main") {
    const message = document.getElementById("message_box").value;
    const username = document.getElementById("username_box").value;
    const status = document.getElementById("status");

    if (message.trim() == "" || username.trim() == "") {
        status.innerText = "メッセージまたはユーザー名を入力してください";
        return;
    }

    if (document.getElementById("reply_to").value == "") {
        send_new_message(name);
    } else {
        send_reply_message(name);
    }
}

onload = async () => {
    if (location.href.match("forum") != null) {
        get_messages(document.getElementById("this_forum_name").value);
    }
}