const fetch_url = key.message_fetch_url;

const emoji_dir = "../emoji/";
const emoji_table = [
    {name: ":hitokuchi:", path: "hitokuchi.webp"},
    {name: ":a:", path: "a!.webp"},
    {name: ":bikkuri:", path: "bikkuri.webp"},
    {name: ":ganbare:", path: "ganbare.webp"},
    {name: ":hanataka:", path: "hanataka.webp"},
    {name: ":iine:", path: "iine.webp"},
    {name: ":sleep:", path: "sleep.webp"},
    {name: ":yatta:", path: "yatta.webp"},
    {name: ":yorokobi:", path: "yorokobi.webp"},
    {name: ":tako:", path: "tako.webp"},
].map(i => { return { name: i.name, path: emoji_dir + i.path } });

function replace_emoji(text) {
    let result = text;
    for (const i of emoji_table) {
        result = result.split(i.name).join(`<img src="${i.path}" class="emoji" alt=" (emoji) ">`);
    }

    return result;
}

async function get_mes() {
    document.getElementById("status").innerHTML = "お待ちください...";

    // 実際にメッセージを取得する
    if (document.getElementById("user").value != "") {
        const response = await fetch(
            fetch_url,
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

        const message = replace_emoji(response.message);
        const username = response.user;
        const frame = response.flame; // スペルミスがあるので後々修正していく

        console.log(frame);

        document.getElementById("user_name").innerHTML = username;
        const icon = document.getElementById("special_icon");
        switch (username) {
            case "@ei-max": {
                icon.innerHTML = "<img src='../special_icon/hitokuchi_developer.webp' class='special_icon' alt='開発者'>";
                break;
            }
            case "kuroge@admin": {
                icon.innerHTML = "<img src='../special_icon/hitokuchi_developer.webp' class='special_icon' alt='認証済み'>";
                break;
            }
            default: break;
        }
        document.getElementById("message").innerHTML = message;
        if (frame != "" && frame != undefined) {
            document.getElementById("getmes").style.backgroundImage = `url("../frame/Frame_${frame}.webp")`;
        } else {
            document.getElementById("getmes").style.backgroundImage = 'none';
        }

        document.getElementById("status").innerHTML = "";
    } else {
        document.getElementById("status").innerHTML = "あなたはまだこの機能を利用いただけません<br>一回でもメッセージを送信してください！";
    }
}

window.onload = () => {
    const username = localStorage.getItem("user");
    if (username != null) {
        document.getElementById("user").value = username;
    }
}
