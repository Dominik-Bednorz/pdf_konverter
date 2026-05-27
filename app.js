const konvertbuttonstatus = document.querySelector(".kb");
konvertbuttonstatus.disabled = true;

const input = document.getElementById("fotoinput");

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