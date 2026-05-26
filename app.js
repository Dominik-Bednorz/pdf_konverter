const konvertbuttonstatus = document.querySelector(".kb");
konvertbuttonstatus.disabled = true;

const input = document.getElementById("fotoinput");

input.addEventListener("change", () => {
  const name = input.files[0].name;
  document.getElementById("label").textContent = name + " ausgewählt";
  document.getElementById("convert").textContent = "Konvertieren";
  konvertbuttonstatus.disabled = false;});

// Hier speichern wir später das Bild
let imageData = null;


// HTML Element holen
const fileInput = document.getElementById("fotoinput");


// Reagiert wenn User Datei auswählt
fileInput.addEventListener("change", function(event) {

  // Erste Datei holen
  const file = event.target.files[0];

  // FileReader erstellen
  const reader = new FileReader();

  // Läuft wenn Datei fertig gelesen wurde
  reader.onload = function(loadEvent) {

    // Bilddaten speichern
    imageData = loadEvent.target.result;

    console.log("Bild geladen!");
  };

  // Datei als Bilddaten lesen
  reader.readAsDataURL(file);
});



// Button holen
const pdfButton = document.getElementById("convert");


// Reagiert auf Klick
pdfButton.addEventListener("click", function() {

  // Prüfen ob Bild existiert
  if (!imageData) {
    alert("Bitte zuerst ein Bild auswählen!");
    return;
  }

  // jsPDF aus der Library holen
  const { jsPDF } = window.jspdf;

  // Neues PDF erstellen
  const pdf = new jsPDF();

  // Bild einfügen
  pdf.addImage(imageData, "JPEG", 10, 10, 180, 160);

  // PDF speichern
  pdf.save("meinBild.pdf");
});