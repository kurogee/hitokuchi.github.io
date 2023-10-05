async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}

async function sendip(username, content, service_name) {
    const url = "https://script.google.com/macros/s/AKfycbz0sfNc5k9tWn9locQAka1HLWLenWtK4h4vY8G117es-dlozFGKKK_CsdL-R6VtvuS-mw/exec";
    const ip = await getip();
    const response = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify({
                "request" : "sendIP",
                "username": username,
                "content": content,
                "ip_address": ip,
                "service_name": service_name
            })
        }
    );
}

const key = {
    message_fetch_url : "https://script.google.com/macros/s/AKfycbyupdYFWpSQyp-nbizVhpTbGzgp8JxTvyfnEdo9lOf8oP0Io88zCs-R9ZF0RRTugVcPLw/exec",
    point_fetch_url : "https://script.google.com/macros/s/AKfycbxd3mqvKtBJn95__0IvnnV1giGUwfl_Vj0ZTWx7x-vvfUVLvIUgVoyW6VRvwKQwOOPkfA/exec"
};