const ApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmE2NDM4MzRiZjAwMTUwMDA3MDIiLCJpYXQiOjE3NDI1NDc1NTYsImV4cCI6MTc0Mzc1NzE1Nn0.Qq5YAAgqKvzBcpoY_W16XAtBDEE4OG-wpiCguKXLvXc";

class wineC {
  constructor(_name, _brand, _description, _price, _imageUrl) {
    this.name = _name;
    this.brand = _brand;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }
}

const URLparameters = new URLSearchParams(location.search);
const wineId = URLparameters.get("id");

const nameInput = document.getElementById("name");
const brandInput = document.getElementById("brand");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("imageUrl");

const winesURL = "https://striveschool-api.herokuapp.com/api/product/";

if (wineId) {
  fetch(winesURL + wineId, {
    headers: {
      Authorization: ApiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      brandInput.value = data.brand;
      descriptionInput.value = data.description;
      priceInput.value = data.price;
      imageUrlInput.value = data.imageUrl;
    })
    .catch((err) => console.log("ERRORE", err));
}

const form = document.getElementById("wine-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const wine = new wineC(
    nameInput.value,
    brandInput.value,
    descriptionInput.value,
    priceInput.value,
    imageUrlInput.value
  );

  console.log("WINE", wine);

  let metodo;
  let URLdaUsare;

  if (wineId) {
    metodo = "PUT";
    URLdaUsare = winesURL + "/" + wineId;
  } else {
    metodo = "POST";
    URLdaUsare = winesURL;
  }

  fetch(URLdaUsare, {
    method: metodo,
    body: JSON.stringify(wine),
    headers: {
      "Content-Type": "application/json",
      Authorization: ApiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO VINO COMPLETATO!");
        form.reset();
        location.assign("./HomeP.html");
      } else {
        throw new Error("response non OK");
      }
    })
    .catch((err) => {
      console.log("errore nel salvataggio!", err);
    });
});

const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();
