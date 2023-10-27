const url = "https://script.google.com/macros/s/AKfycbw_HPP9vJ_0BqBFpxd00jZHD2SPubpMggk04HOzR-E4Zmc336q9mNkYn8xZx8iQGch7Jw/exec";

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}