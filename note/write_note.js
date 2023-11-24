const note_url = key.note_url;

async function use_premium(request_auth, uuid) {
    const response = await fetch(key.point_fetch_url,
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

    return response.result == "ok" ? true : false;
}

async function send_note() {
    const status = document.getElementById("status");

    let auth = false;
    const premium_uuid = document.getElementById("premium_code").value;
    if (premium_uuid != "") {
        auth = use_premium("n", premium_uuid);
        if (!auth) {
            document.getElementById("status_for_premium").innerText = "プレミアムコードが無効です！";
            return;
        }
    }

    const url = document.getElementById("url").value;
    const radio_box = document.getElementsByName("check");
    let note = document.getElementById("area").value;
    note = note.split("&").join("&amp;");
    note = note.split("<").join("&lt;"); // &lt;&gt;
    note = note.split(">").join("&gt;");
    note = note.split("\n").join("<br>");

    if (auth) {
        note = note.replace(/\$\((.+?)\)\[(.+?)\]/g, "<a href='$1' target='_blank'>$2</a>");
        note = note.replace(/\[b (.+?)\]/g, "<span class='hutoji'>$1</span>");
        note = note.replace(/\[d (.+?)\]/g, "<span class='torikeshi'>$1</span>");
        note = note.replace(/\[i (.+?)\]/g, "<span class='shatai'>$1</span>");

        note = note.replace(/\[color (\#)?(.+?) (.+?)\]/g, "<span style='color: #$2;'>$3</span>");
        note = note.replace(/\[big (.+?)\]/g, "<span class='big'>$1</span>");
        note = note.replace(/\[small (.+?)\]/g, "<span class='small'>$1</span>");

        note = note.replace(/\[[ ]?img (.+?)\]/g, "<br><img src='$1' class='note_image'><br>");
    }

    if (note.trim() != "" || note.length >= 10) {
        status.innerHTML = "送信中...";
        const response = await fetch(note_url,
            {
                method: "POST",
                body: JSON.stringify({
                    "request": "SendNote",
                    "url": url,
                    "note": note,
                    "check": radio_box[1].checked ? "0" : "1"
                })
            }
        )
        .then((response) => response.text())
        .then((data) => JSON.parse(data))
        .catch((_) => "No");

        sendip("-", note + "\n\nURL: " + url, "note");
        
        status.innerHTML = `送信完了<br>表示URL(保存推奨): https://hitokuchi.f5.si/note/spread.html?id=${response.return_uuid}`;
        document.getElementById("url").value = "";
        document.getElementById("area").value = "";
    } else {
        status.innerHTML = "Note内容を入力してください<br>または文字数が少なすぎです";
    }
}