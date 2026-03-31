function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
}

function generateQRCode(str) {
    document.getElementById("qrcode").innerHTML = "";
    var size = Math.min(window.innerWidth, window.innerHeight);
    var scale = 3;
    new QRCode(document.getElementById("qrcode"), {
        text: str,
        width: size / scale,
        height: size / scale
    });
}

var textInput = document.getElementById("textInput");
var generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", function () {
    var text = textInput.value.trim();
    generateQRCode(text || uuidv4());
});

textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        generateBtn.click();
    }
});

generateQRCode(uuidv4());
