const fetch_url = key.message_fetch_url;

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

    console.log(result);
    return result;
}

async function send_mes() {
    const status = document.getElementById("status");
    const button = document.getElementById("button");

    let flame_type = "";
    if (sessionStorage.flame_type != null && sessionStorage.flame_type != "") {
        flame_type = sessionStorage.flame_type;
        sessionStorage.flame_type = "";
        console.log(flame_type);
    }

    status.innerHTML = "お待ちください...";
    button.setAttribute("disabled", true);
    
    if (document.getElementById("user").value != "" && document.getElementById("area").value.replace("\n", "") != "") {
        const response = await fetch(
            fetch_url,
            {
                method: "POST",
                body: JSON.stringify({
                    "type": document.getElementById("type").value,
                    "user": document.getElementById("user").value,
                    "message": replace_text(document.getElementById("area").value),
                    "flame": flame_type
                })
            }
        )
        .then(response => response.text())

        .then(data => {
            sendip(document.getElementById("user").value, replace_text(document.getElementById("area").value), "hitokuchi");
            status.innerHTML = "送信完了";
            document.getElementById("area").value = "";
            localStorage.setItem("user", document.getElementById("user").value);
            return JSON.parse(data);
        })

        .catch(err => {
            console.error(err);
            status.innerHTML = "エラー";
            return;
        })
    } else {
        status.innerHTML = "ユーザー名・テキストを入力してください！";
    }
    button.removeAttribute("disabled");
}

window.onload = () => {
    const username = localStorage.getItem("user");
    if (username != null) {
        document.getElementById("user").value = username;
    }

    if (sessionStorage.flame_type != null && sessionStorage.flame_type != "") {
        document.getElementById("status").innerHTML = `フレームが今選択状態です。`;
    }
}
