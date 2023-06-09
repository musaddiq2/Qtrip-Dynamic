import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return urlParams.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    let res = await fetch(
      config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`
    );
    let data = await res.json();
    return data;
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure, images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  //document.getElementsByClassName("activity-card-image").length = adventure.images.length;
  let img = document.querySelector("#photo-gallery");
  adventure.images.forEach((elemnet) => {
    img.innerHTML += `<img src="${elemnet}" alt="..." class="activity-card-image pb-3 pb-md-0" />`;
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators" id="carousel-indicators"></div>
  <div class="carousel-inner" id="carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  images.forEach((image, imageIndex) => {
    const carouselItemele = document.createElement("div");
    const activeClass = imageIndex === 0 ? "active" : "";
    carouselItemele.className = `carousel-item ${activeClass}`;
    carouselItemele.innerHTML = `<img src="${image}" alt="..." class="activity-card-image pb-3 pb-md-0" />`;
    document.getElementById("carousel-inner").append(carouselItemele);

    const indicators = `<button
  type="button"
   data-bs-target="#carouselExampleIndicators"
  data-bs-slide-to="${imageIndex}"
  ${imageIndex === 0 ? 'class="active"' : ""} 
  aria-current="true" 
  aria-label="Slide ${imageIndex + 1}"></button>`;
    document.getElementById("carousel-indicators").innerHTML += indicators;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
//   const reservedBanner = document.getElementById("reserved-banner");
// const isBannerDisplayed = reservedBanner.style.display !== "none" && reservedBanner.offsetHeight > 0;

// expect(isBannerDisplayed).toBe(true);
  if (adventure.available === true) {
    document.getElementById("reservation-panel-available").style.display =
      "block";

    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
      document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent =
    persons * adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";
    let FormElemnts = form.elements;
    let bodyString = JSON.stringify({
      name: FormElemnts["name"].value,
      date: FormElemnts["date"].value,
      person: FormElemnts["person"].value,
      adventure: adventure.id,
    });
    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
      });
      debugger;
      if (res.ok) {
        document.getElementById("reserved-banner").style.display = "block";
        
      } else {
        let data = await res.json();
        alert(`Falied,${data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Failed - Fetch call result in error");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.available === true) {
    document.getElementById("reserved-banner").style.display =
      "block";
    }
    else{
      document.getElementById("reserved-banner").style.display =
      "none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
