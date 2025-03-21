const nascondiCaricam = function () {
  const div = document.getElementById("spinnerDiv");
  div.classList.add("d-none");
};

const ApiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmE2NDM4MzRiZjAwMTUwMDA3MDIiLCJpYXQiOjE3NDI1NDc1NTYsImV4cCI6MTc0Mzc1NzE1Nn0.Qq5YAAgqKvzBcpoY_W16XAtBDEE4OG-wpiCguKXLvXc";

const getWines = function () {
  const winesURL = "https://striveschool-api.herokuapp.com/api/product/";

  fetch(winesURL, {
    method: "GET",
    headers: {
      Authorization: ApiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta non è andata a buon fine");
      }
    })
    .then((data) => {
      nascondiCaricam();
      console.log("DATA", data);

      const row = document.getElementById("allWine");
      data.forEach((wine) => {
        row.innerHTML += `
          <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
            <div class="card">
              <img src="${wine.imageUrl}" alt="Wine-Pic" />
              <div class="card-body">
                <h5 class="card-title">${wine.name}</h5>
                <p class="card-text">${wine.brand}</p>
                <p class="card-text">${wine.description}</p>
                <p class="card-text">${wine.price}€</p>
                <a href="./DescriptionP.html?id=${wine._id}" class="btn" style="background-color: #ff5db2">Vai ai dettagli</a>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch((error) => {
      nascondiCaricam();
      console.log("ERRORE", error);
    });
};

getWines();

const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();
