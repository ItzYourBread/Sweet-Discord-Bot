$.getJSON('https://api.sweet.cf/servers', response => typeText(response.servers)).catch(o_O => typeText());

function typeText(server = null) {
    const strings = ["Sweet is a another multipurpose Discord bot"];
    strings.push(...[
        "Make your best server with Sweet today!",
        "Sweet is already in 38 servers"
    ]);

    new TypeIt("#typingtext", {
        breakLines: false,
        strings,
        speed: 80,
        loop: true,
        deletespeed: 1,
        nextStringDelay: 4000,
        waitUntilVisible: true
    });
};