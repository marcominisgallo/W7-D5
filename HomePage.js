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
          <div class="col-12 col-md-6 col-lg-4 col-xl-3 d-flex g-4">
            <div class="card rounded-3 d-flex flex-column">
              <img src="${wine.imageUrl}" alt="Wine-Pic" class="rounded-top-3"/>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${wine.name}</h5>
                <p class="card-text">${wine.brand}</p>
                <p class="card-text d-flex flex-grow-1">${wine.description}</p>
                <p class="card-text mt-1">${wine.price}€</p>
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
