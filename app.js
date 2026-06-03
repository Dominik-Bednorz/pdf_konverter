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
let esc_holdtime_zähler = null;
let inputTastatur = [];

//--Hacking Mode an--//
document.addEventListener("keydown", (event) => {
  inputTastatur.push(event.key.toLowerCase());

  input = inputTastatur.slice(-codeHackingMode.length);
  if (JSON.stringify(input) === JSON.stringify(codeHackingMode)) {
    hackingMode = !hackingMode;
    localStorage.setItem("hackingMode", hackingMode);
    setTimeout(() => {
    hackingModechange();
    }, 100); //Enter wird sofort ausgelöst und schickt Sachen zum Server//
}
});

//--Hacking Mode Log in an--//
document.addEventListener("keydown", (event) => {
  if (event.key === "h" ) {
  hackingMode = !hackingMode;
  localStorage.setItem("hackingMode", hackingMode);
  hackingModechange();
  }
});

//--Hacking Mode Log in aus--//
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && hackingMode) { //esc soll nur im Login "main" zeigen können//
    setTimeout(() => {
      if(event.key === "Escape") {
      hackingMode = false;
      localStorage.setItem("hackingMode", hackingMode);
      hackingModechange();
      }
    }, 1000);
  }

  
});


//--Hacking Mode Log in an/aus Funktion--//
function hackingModechange() {
  if (hackingMode || localStorage.getItem("hackingMode") === "true") {
    document.getElementById("body").classList.add("hackingModelogon");
    document.getElementById("main").style.display = "none";
    document.getElementById("quellen").style.display = "none";
    document.getElementById("HackingLogOn").style.display = "";
  }
  else {
    document.getElementById("body").classList.remove("hackingModelogon");
    document.getElementById("main").style.display = "";
    document.getElementById("HackingLogOn").style.display = "none";
  }
}

//--Hacking Mode Login--//
document.getElementById("login-button").addEventListener("click", () => {
  connect_to_backend();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && hackingMode) {
    connect_to_backend();
  }
});

function connect_to_backend() {
  console.log("Verbinde...");
  let inputedCode = document.getElementById("passwordInput");
  fetch("https://pdf-konverter-backend.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      inputedCode: inputedCode.value
    }),
  })

.then(res => res.json())
.then(data => {
  if (data.success) {
    console.log("Login erfolgreich!");
  }
  else {
    console.log("Login fehlgeschlagen!");
  }
});
};

//--Auto an--//
addEventListener("DOMContentLoaded", () => { //auto an am Beginn//
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

// Quellen anzeigen//
document.getElementById("quellen-button").addEventListener("click", () => {
  document.getElementById("main").style.display = "none", "important";
  document.getElementById("quellen").style.display = "";
});

document.getElementById("quellen-zurueck-button").addEventListener("click", () => {
  document.getElementById("main").style.display = "";
  document.getElementById("quellen").style.display = "none";
});