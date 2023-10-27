const url = "https://script.google.com/macros/s/AKfycbxuFs8sDL20wEVTc7Ewfyw6yA2Txxyr2ifwNZfFE0q63MuEZVxQsk9SVOgkT70yjMZu8g/exec";

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}