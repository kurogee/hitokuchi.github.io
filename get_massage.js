async function get_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";

    if (document.getElementById("user").value != "") {
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
    } else {
        document.getElementById("status").innerHTML = "ユーザー名を入力してください！";
    }
    
}

window.onload = () => {
    const username = localStorage.getItem("user");
    if (username != null) {
        document.getElementById("user").value = username;
    }
}
