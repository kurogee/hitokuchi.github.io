// 英語未対応

async function send_change() {
    if (document.getElementById("uuid").value == "") {
        document.getElementById("states").innerHTML = "IDを入力してください！";
        return;
    }

    document.getElementById("states").innerHTML = "お待ちください...";

    const response = await fetch("https://script.google.com/macros/s/AKfycbxd3mqvKtBJn95__0IvnnV1giGUwfl_Vj0ZTWx7x-vvfUVLvIUgVoyW6VRvwKQwOOPkfA/exec",
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
    document.getElementById("uuid").value = "";
}

async function send_use(flame_type, number) {
    document.getElementById("states2").innerHTML = "お待ちください...";

    const response = await fetch("https://script.google.com/macros/s/AKfycbxd3mqvKtBJn95__0IvnnV1giGUwfl_Vj0ZTWx7x-vvfUVLvIUgVoyW6VRvwKQwOOPkfA/exec",
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
        document.getElementById("states2").innerHTML = "交換完了。";

        sessionStorage.flame_type = flame_type;
        const url = document.getElementById("url");
        url.href = "send.html";
        url.click();
    } else if (response.result == "zero") {
        document.getElementById("states2").innerHTML = "交換できません。";
        return;
    }
}

function logout() {
    localStorage.setItem("login_data_name", "");
    location.reload();
}
