async function send_change() {
    if (document.getElementById("uuid").value == "") {
        document.getElementById("states").innerHTML = "IDを入力してください！";
        return;
    }

    document.getElementById("states").innerHTML = "お待ちください...";

    const response = await fetch("https://script.google.com/macros/s/AKfycbz4EWqBOmSCQNYiJiv-XG6gO39bur4CLlgeGn7BzBU0ITRMgGoMb7NuNnffCQK1b7d-GQ/exec",
        {
            method: "POST",
            body: JSON.stringify({
                "req": document.getElementById("req").value,
                "id": document.getElementById("user_id").value,
                "uuid": document.getElementById("uuid").value
            })
        })
    .then(res => {
        return res.text();
    })
    .then(data => {
        return JSON.parse(data)
    });

    if (response.result == "nouuid") {
        document.getElementById("states").innerHTML = "IDが存在しません。";
    } else if (response.result == "used") {
        document.getElementById("states").innerHTML = "既に使用されたIDです。";
    } else if (response.result == "ok") {
        document.getElementById("states").innerHTML = "交換完了。再読込してください。";
    }
}

function logout() {
    localStorage.setItem("login_data_name", "");
    location.reload();
}