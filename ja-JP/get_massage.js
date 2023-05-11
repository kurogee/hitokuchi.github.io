async function get_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";

    // メッセージ取得数を変更
    let max;
    const day = new Date().getDay();
    if (day == 0 || day == 6 || day == 5) {
        max = 8;
        console.log("8通の日");
    } else {
        max = 5;
    }

    // 実際にメッセージを取得する
    if (document.getElementById("user").value != "") {
        if ( (localStorage.getItem("count") != null && parseInt(localStorage.getItem("count")) >= max) || document.cookie.match("yes") ) {
            document.cookie = "seigen=yes; max-age=43200";
            document.getElementById("status").innerHTML = "12時間に取得できるメッセージの最大数を超えました。12時間後にまた試してください。";
            return;
        }

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyupdYFWpSQyp-nbizVhpTbGzgp8JxTvyfnEdo9lOf8oP0Io88zCs-R9ZF0RRTugVcPLw/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    "type": document.getElementById("type").value,
                    "user": document.getElementById("user").value
                })
            }
        )
        .then((response) => response.text())

        .then((data)=>{
            return JSON.parse(data);
        })

        const message = response.message;
        const username = response.user;
        const flame = response.flame;

        console.log(flame);

        document.getElementById("user_name").innerHTML = username;
        document.getElementById("message").innerHTML = message;
        if (flame != "" && flame != undefined) {
            document.getElementById("getmes").style.backgroundImage = `url("./flame/Flame_${flame}.webp")`;
        } else {
            document.getElementById("getmes").style.backgroundImage = 'url("flame.webp")';
        }

        document.getElementById("status").innerHTML = "";

        if (localStorage.getItem("count") != null) {
            if (message != "申し訳ございません。只今あなたが受け取れるメッセージが一つもない状況です。<br>ぜひメッセージを新しく送信してください！<br>※もう一度メッセージを取得すると治るかもしれません") {
                localStorage.setItem("count", parseInt(localStorage.getItem("count"))+1);
            }
        } else {
            localStorage.setItem("count", 1);
        }
        
    } else {
        document.getElementById("status").innerHTML = "あなたはまだこの機能を利用いただけません<br>一回でもメッセージを送信してください！";
    }
}

window.onload = () => {
    const username = localStorage.getItem("user");
    if (username != null) {
        document.getElementById("user").value = username;
    }
    
    const count = localStorage.getItem("count");
    if (count == null) {
        localStorage.setItem("count", 0);
    }

    if (document.cookie == "" || document.cookie == null) {
        document.cookie = "seigen=no";
        localStorage.setItem("count", 0);
    }
}
