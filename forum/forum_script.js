const url = "https://script.google.com/macros/s/AKfycbwwdm4Cr3AzXw96KsbKnZixvxNSOMUXcM_Qf9RK_Em4dDUNyYBc64j2HQVG5MSsdQDWMg/exec";

async function getip() {
    const res = await fetch('https://ipinfo.io?callback').then(res => res.json()).then(json => json.ip);
    console.log(res);
    return res;
}