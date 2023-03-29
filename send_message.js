async function send_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";
    
    if (document.getElementById("user").value != "" || document.getElementById("area").value.replace("\n", "") != "") {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyO6U6tMg2DVvX6SWDwNWWCe0X8E2muzYGI7-hAN8tKotHroS7na7x08VXUqGBtB_lV7Q/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    "type": document.getElementById("type").value,
                    "user": document.getElementById("user").value,
                    "message": document.getElementById("area").value.replace("\n", "<br>")
                })
            }
        )
        .then(response => response.text())

        .then(data => {
            return JSON.parse(data);
        })

        document.getElementById("status").innerHTML = "送信完了";
        document.getElementById("area").value = "";
        localStorage.setItem("user", document.getElementById("user").value);
    } else {
        document.getElementById("status").innerHTML = "ユーザー名・テキストを入力してください！"
    }
    
}

window.onload = () => {
    const username = localStorage.getItem("user");
    if (username != null) {
        document.getElementById("user").value = username;
    }
}
