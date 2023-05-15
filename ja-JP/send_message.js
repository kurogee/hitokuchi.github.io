function replace_text(text) {
    let result = text;
    result = result.split("<").join("&lt;");
    result = result.split(">").join("&gt;");
    result = result.split("&").join("&amp;");
    result = result.split("\n").join("<br>");

    return result;
}

async function send_mes() {
    const status = document.getElementById("status");

    let flame_type = "";
    if (sessionStorage.flame_type != null && sessionStorage.flame_type != "") {
        flame_type = sessionStorage.flame_type;
        sessionStorage.flame_type = "";
        console.log(flame_type);
    }

    status.innerHTML = "お待ちください...";
    
    if (document.getElementById("user").value != "" && document.getElementById("area").value.replace("\n", "") != "") {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyupdYFWpSQyp-nbizVhpTbGzgp8JxTvyfnEdo9lOf8oP0Io88zCs-R9ZF0RRTugVcPLw/exec",
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
        status.innerHTML = "ユーザー名・テキストを入力してください！"
    }
    
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
