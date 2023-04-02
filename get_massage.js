async function get_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";

    if (document.cookie != "") {
        document.getElementById("status").innerHTML = "12時間に取得できるメッセージの最大は5通です。12時間後にまた来てください。";
        localStorage.setItem("count", 0);
        return;
    }

    if (document.getElementById("user").value != "") {
        if (localStorage.getItem("count") != null && parseInt(localStorage.getItem("count")) >= 5) {
            document.cookie = "seigen=yes; max-age=43200";
            document.getElementById("status").innerHTML = "12時間に取得できるメッセージの最大は5通です。12時間後にまた来てください。";
            return;
        }

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyZUMF4F932tAg6ztXMJ95nIQrb4tteMVne19MitpmOlphucLaMx1ChqzB5jRSBW4VFQg/exec",
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

        console.log(message);

        document.getElementById("user_name").innerHTML = username;
        document.getElementById("message").innerHTML = message;

        document.getElementById("status").innerHTML = "";

        if (localStorage.getItem("count") != null) {
            localStorage.setItem("count", parseInt(localStorage.getItem("count"))+1);
        } else {
            localStorage.setItem("count", 1);
        }
        
    } else {
        document.getElementById("status").innerHTML = "ユーザー名を入力してください！";
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

    if (document.cookie == "") {
        localStorage.setItem("count", 0);
    }
}
