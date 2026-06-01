//--Variablen--
let hackingMode = false;
const warte_bis_ausgewählt = document.getElementById("fotoinput");
const codeHackingMode = [
  "arrowleft",
  "arrowleft",
  "arrowup",
  "arrowup",
  "arrowright",
  "arrowright",
  "arrowdown",
  "arrowdown",
  "a",
  "d",
  "m",
  "i",
  "n",
  "enter",
];

let inputTastatur = [];
document.addEventListener("keydown", (event) => {
  inputTastatur.push(event.key.toLowerCase());

  input = inputTastatur.slice(-codeHackingMode.length);
  if (JSON.stringify(input) === JSON.stringify(codeHackingMode)) {
    console.log("Konsami Code aktiviert!");
    hackingMode = !hackingMode;
    localStorage.setItem("hackingMode", hackingMode);
    hackingModechange();
  }
});

//--Hacking Mode--//
document.addEventListener("keydown", (event) => {
  if (event.key === "h" ) {
  hackingMode = true;
  localStorage.setItem("hackingMode", true);
  hackingModechange();
  }
  if (event.key === "n") {
  hackingMode = false;
  localStorage.setItem("hackingMode", false);
  hackingModechange();
  }
});


function hackingModechange() {
  if (hackingMode || localStorage.getItem("hackingMode") === "true") {
    document.body.style.background = "black";
    document.body.style.color = "lime";
    document.body.style.fontFamily = "Courier New, monospace";
    document.body.style.textShadow = "0 0 5px lime, 0 0 10px lime, 0 0 20px lime";
  }
  else {
    document.body.style.background = "";
    document.body.style.color = "";
    document.body.style.fontFamily = "";
    document.body.style.textShadow = "";
  }
}

addEventListener("DOMContentLoaded", () => {
  hackingModechange();
});

//--Datei auswählen; Button an--//
document.getElementById("convert").disabled = true;
warte_bis_ausgewählt.addEventListener("change", () => {
  const name = warte_bis_ausgewählt.files[0].name;
  document.getElementById("label").textContent = name + " ausgewählt";
  document.getElementById("convert").textContent = "Konvertieren";
  document.getElementById("convert").disabled = false;
  document.getElementById("convert").classList.add("glow_green");
});

//--Bild zu PDF konvertieren--//
let imageData = null;

// Input holen
const fileInput = document.getElementById("fotoinput");

// Bild laden
fileInput.addEventListener("change", (event) => {

  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imageData = e.target.result;
    console.log("Bild geladen!");
  };

  reader.readAsDataURL(file);
});


// Button
const pdfButton = document.getElementById("convert");

pdfButton.addEventListener("click", () => {

  const img = new Image();
  img.src = imageData;

  img.onload = () => {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
      unit: "px",
      orientation: img.width > img.height ? "landscape" : "portrait",
      format: [img.width, img.height]
    });

    pdf.addImage(
      imageData,
      "JPEG", 0, 0, img.width, img.height
    );

    pdf.save("bild.pdf");

    document.getElementById("convert").textContent = "Erneut konvertieren";
    document.getElementById("convert").classList.remove("glow_green");
    setTimeout(() => {
      document.getElementById("convert").classList.add("glow_green");
    }, 200);
  };
});

// Quellen anzeigen
document.getElementById("quellen-button").addEventListener("click", () => {
  document.getElementById("main").style.display = "none";
  document.getElementById("quellen").style.display = "";
});

document.getElementById("quellen-zurueck-button").addEventListener("click", () => {
  document.getElementById("main").style.display = "";
  document.getElementById("quellen").style.display = "none";
});