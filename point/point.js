const point_url = key.point_fetch_url;

async function account_auth(username, password) {
    const response = await fetch(
        point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "id": username,
                "pass": password,
                "req": "login"
            })
        }
    )
    .then((response) => response.text())
    
    .then((data)=>{
        return JSON.parse(data);
    });

    return response;
}

async function use_point(username, point) {
    const response = await fetch(point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "req": "use_point",
                "id": username,
                "use": point
            })
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            return JSON.parse(data);
        });

    return response.result == "ok" ? true : false;
}

async function use_premium(request_auth, uuid) {
    const response = await fetch(point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "req": "use_premium",
                "id": "",
                "pass": "",
                "request_auth": request_auth,
                "uuid": uuid
            })
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            return JSON.parse(data);
        });

    console.log(response);
    return response.result == "ok";
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
                "req": "use_point_code",
                "id": document.getElementById("user_id").value,
                "use_code": document.getElementById("uuid").value
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

async function add_point(id, password, point) {
    document.getElementById("status").innerText = "お待ちください...";

    const response = await fetch(point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "req": "add_point",
                "id": id,
                "pass": password,
                "add_point": point
            })
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            return JSON.parse(data);
        })
        .catch(err => {
            console.log(err);
            document.getElementById("status").innerText = "エラーが発生しました。";
        })
    
    if (response.result == "ok") {
        document.getElementById("status").innerText = "";
    } else {
        document.getElementById("status").innerText = "エラーが発生しました。";
    }
}

async function create_point_code(point) {
    const response = await fetch(point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "req": "create_point_code",
                "point": point
            })
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            return JSON.parse(data);
        })
        .catch(err => {
            console.log(err);
            document.getElementById("uuid_code").innerText = "エラーが発生しました。";
        });
    
    const uuid_code = response.result;
    document.getElementById("uuid_code").innerText = "ポイントコード: " + uuid_code;
    return uuid_code;
}

async function create_point_code_return_only_code(point) {
    const response = await fetch(point_url,
        {
            method: "POST",
            body: JSON.stringify({
                "req": "create_point_code",
                "point": point
            })
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            return JSON.parse(data);
        })
        .catch(err => {
            console.log(err);
            return "no";
        });
    
    const uuid_code = response.result;
    return uuid_code;
}

function logout() {
    localStorage.setItem("login_data_name", "");
    location.reload();
}