const ApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmE2NDM4MzRiZjAwMTUwMDA3MDIiLCJpYXQiOjE3NDI1NDc1NTYsImV4cCI6MTc0Mzc1NzE1Nn0.Qq5YAAgqKvzBcpoY_W16XAtBDEE4OG-wpiCguKXLvXc";

const URLparameters = new URLSearchParams(location.search);

const wineId = URLparameters.get("id");

const winesURL = "https://striveschool-api.herokuapp.com/api/product/";

const URLid = winesURL + wineId;

const getWineDetails = function () {
  fetch(URLid, {
    headers: {
      Authorization: ApiKey,
    },
  })
    .then((response) => {
      console.log("responso", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli del vino");
      }
    })
    .then((data) => {
      console.log("DETTAGLI VINO", data);
      const pic = document.getElementById("pic");
      const name = document.getElementById("name");
      const brand = document.getElementById("brand");
      const description = document.getElementById("description");
      const price = document.getElementById("price");

      pic.src = data.imageUrl;
      name.innerText = data.name;
      brand.innerText = data.brand;
      description.innerText = data.description;
      price.innerText = data.price + "€";
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI DEL VINO", err);
    });
};

const editWine = function () {
  const confirmation = confirm("Sei sicuro di voler modificare questo vino?");
  if (confirmation) {
    location.assign("../BO.html?id=" + wineId);
  }
};

const deleteWine = function () {
  const confirmation = confirm("Sei sicuro di voler eliminare questo vino?");
  if (confirmation) {
    fetch(winesURL + "/" + wineId, {
      method: "DELETE",
      headers: {
        Authorization: ApiKey,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("VINO ELIMINATO");
          location.assign("./HomeP.html");
        } else {
          throw new Error("eliminazione NON andata a buon fine!");
        }
      })
      .catch((err) => {
        console.log("ERRORE NELLA CANCELLAZIONE", err);
      });
  }
};

getWineDetails();

const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();
