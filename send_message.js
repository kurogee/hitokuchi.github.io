async function send_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";
    
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwHjj8vxfB-2BbnTaYWr14jTgIHmjUa8_DQj-BThCt7ZLn9WwMU5m7ZYm7IVHjEJliOBQ/exec",
        {
            method: "POST",
            body: JSON.stringify({
                "type": document.getElementById("type").value,
                "user": document.getElementById("user").value,
                "message": document.getElementById("area").value.replace("\n", "<br>")
            })
        }
    )
    .then((response) => response.text())

    .then((data)=>{
        return JSON.parse(data);
    })

    document.getElementById("status").innerHTML = "送信完了";
}