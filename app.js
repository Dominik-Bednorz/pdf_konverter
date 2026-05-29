const konvertbuttonstatus = document.querySelector(".kb");
konvertbuttonstatus.disabled = true;
const hackingMode = false;
const input = document.getElementById("fotoinput");


document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
  const hackingMode = true;
  localStorage.setItem("hackingMode", hackingMode);
  location.reload(); //beta
  }
  if (event.key === "n") {
  const hackingMode = false;
  localStorage.setItem("hackingMode", false);
  location.reload(); //beta
  }
});
// location.reload(); um die Seite neu zu laden, damit die Änderungen sofort sichtbar sind
console.log("Hacking Mode: jetz var " + hackingMode);
console.log("Hacking Mode: speicher" + localStorage.getItem("hackingMode"));

document.addEventListener("DOMContentLoaded", () => {
  if (hackingMode || localStorage.getItem("hackingMode") === "true") {
    document.body.style.background = "black";
    document.body.style.color = "lime";
    document.body.style.fontFamily = "Courier New, monospace";
    document.body.style.textShadow = "0 0 5px lime, 0 0 10px lime, 0 0 20px lime";
  }
});



input.addEventListener("change", () => {
  const name = input.files[0].name;
  document.getElementById("label").textContent = name + " ausgewählt";
  document.getElementById("convert").textContent = "Konvertieren";
  konvertbuttonstatus.disabled = false;});

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
      format: [img.width, img.height]
    });

    pdf.addImage(
      imageData,
      "JPEG", 0, 0, img.width, img.height
    );

    pdf.save("bild.pdf");

    document.getElementById("convert").textContent = "Erneut konvertieren";
  };
});