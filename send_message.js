async function send_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";
    
    if (document.getElementById("user").value != "" && document.getElementById("area").value.replace("\n", "") != "") {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyZUMF4F932tAg6ztXMJ95nIQrb4tteMVne19MitpmOlphucLaMx1ChqzB5jRSBW4VFQg/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    "type": document.getElementById("type").value,
                    "user": document.getElementById("user").value,
                    "message": document.getElementById("area").value.split("\n").join("<br>")
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
