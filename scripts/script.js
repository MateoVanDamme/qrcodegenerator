import qrcodegen from "https://cdn.jsdelivr.net/npm/nayuki-qr-code-generator@1.8.0/index.js";

const QRC = qrcodegen.QrCode;

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
}

function generateQRCode(text) {
    var canvas = document.getElementById("qrcode");
    var qr = QRC.encodeText(text, QRC.Ecc.MEDIUM);
    var size = Math.min(window.innerWidth, window.innerHeight);
    var scale = 3;
    var total = Math.floor(size / scale);
    var border = 2;
    var cellSize = Math.floor(total / (qr.size + border * 2));
    var canvasSize = cellSize * (qr.size + border * 2);

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = "#000000";
    for (var y = 0; y < qr.size; y++) {
        for (var x = 0; x < qr.size; x++) {
            if (qr.getModule(x, y)) {
                ctx.fillRect((x + border) * cellSize, (y + border) * cellSize, cellSize, cellSize);
            }
        }
    }
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
