const note_url = key.note;

async function send_note() {
    const status = document.getElementById("status");

    const url = document.getElementById("url").value;
    const radio_box = document.getElementsByName("check");
    let note = document.getElementById("area").value;
    note = note.split("&").join("&amp;");
    note = note.split("<").join("&lt;"); // &lt;&gt;
    note = note.split(">").join("&gt;");
    note = note.split("\n").join("<br>");

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