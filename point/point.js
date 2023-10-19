const point_url = key.point_fetch_url;

async function send_change() {
    if (document.getElementById("uuid").value == "") {
        document.getElementById("status").innerText = "IDを入力してください！";
        return;
    }

    document.getElementById("status").innerText = "お待ちください...";

    const response = await fetch(point_url,
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
            return JSON.parse(data);
        });

    if (response.result == "nouuid") {
        document.getElementById("status").innerText = "IDが存在しません。";
    } else if (response.result == "used") {
        document.getElementById("status").innerText = "既に使用されたIDです。";
    } else if (response.result == "ok") {
        document.getElementById("status").innerText = "交換完了。";
    }
    document.getElementById("uuid").value = "";
}

async function send_use(flame_type, number) {
    document.getElementById("status2").innerText = "お待ちください...";

    const response = await fetch(point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "req": document.getElementsByClassName("req2")[number].value,
                "id": document.getElementsByClassName("user_id2")[number].value,
                "use": document.getElementsByClassName("use_point")[number].value
            })
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            return JSON.parse(data);
        });

    if (response.result == "ok") {
        document.getElementById("status2").innerText = "交換完了。";

        sessionStorage.flame_type = flame_type;
        const url = document.getElementById("url");
        url.href = "../ja-JP/send.html";
        url.click();
    } else if (response.result == "zero") {
        document.getElementById("status2").innerText = "交換できません。";
        return;
    }
}

function logout() {
    localStorage.setItem("login_data_name", "");
    location.reload();
}