const point_url = key.point_fetch_url;

function wait_for_change(key, parent = sessionStorage) { // この辺がうまく行かない
    const memory = parent.getItem(key);
    console.log(memory);
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (parent.getItem(key) != memory) {
                clearInterval(interval);
                resolve(parent.getItem(key));
            }
        }, 100);
    });
}

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
    async function send() {
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
            url.href = "send.html";
            url.click();
        } else if (response.result == "zero") {
            document.getElementById("status2").innerText = "交換できません。";
            return;
        }
    }

    document.getElementById("status2").innerText = "お待ちください...";

    const auth = window.open("./auth.html", "auth", "width=500,height=500,scrollbars=yes");
    auth.sessionStorage.setItem("where_to_pay", "ポイントポータル");
    auth.sessionStorage.setItem("how_much", document.getElementsByClassName("use_point")[number].value);
    auth.sessionStorage.setItem("text", "pay");

    wait_for_change("agree", auth.sessionStorage) // ここを直すべき
    .then(i => {
        if (i == "false") {
            document.getElementById("status2").innerText = "認証に失敗しました。";
        } else {
            document.getElementById("status2").innerText = "";
            send();
        }
        auth.close();
    });
}

function logout() {
    localStorage.setItem("login_data_name", "");
    location.reload();
}