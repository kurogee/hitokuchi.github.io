const url = "https://script.google.com/macros/s/AKfycbxieuyrIx10yjdtKzHO_KVrccGOHdRok4WN2GPtGnexIhCBkQQvpx0UnEnt8UEZHABdGQ/exec";

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}