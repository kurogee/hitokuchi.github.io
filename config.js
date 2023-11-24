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

async function easyfetch(url, body) {
    const response = await fetch(url, JSON.stringify(body))
                           .then(response => response.text())
                           .then(data => JSON.parse(data))
                           .catch(err => "error");
    return response;
}

const key = {
    message_fetch_url : "https://script.google.com/macros/s/AKfycbyupdYFWpSQyp-nbizVhpTbGzgp8JxTvyfnEdo9lOf8oP0Io88zCs-R9ZF0RRTugVcPLw/exec",
    point_fetch_url : "https://script.google.com/macros/s/AKfycbyuB0EeKklcgVdR0YgVw8yRQnZ3NIB4VuOzmnw0xWY-FpR3jOfB896TMPHNk7z6_t3iGQ/exec",
    note_url : "https://script.google.com/macros/s/AKfycbwGcFWIzfhl5ynyOdMhpK7Qo7tLoANkVQpFN0Nr-56Wr4F2IVZBW1hFSg7pEAqLVnsJ/exec",
    mail_url : "https://script.google.com/macros/s/AKfycbyAXfSTgwGR1aA3c3yk9b2stJJs0YwKbfIrir2ynvnIlXkrn7SHLiZCLk2GTnTpXEl8gw/exec"
};