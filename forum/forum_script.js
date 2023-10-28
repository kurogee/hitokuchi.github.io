const url = "https://script.google.com/macros/s/AKfycbwLj8hFgrGT6kR4YHFgI7mcZK-GENhNQqk7AMGw0SxmOtY2g96X5f0g2xmYQ6qxzMo0WA/exec";

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}