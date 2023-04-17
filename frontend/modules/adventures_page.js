import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  const city = urlParams.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let adventures = await res.json();
    return adventures;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";
    ele.innerHTML = `
    <a href="detail/?adventure=${key.id}" id="${key.id}">
    <div class="activity-card">
     <div class="category-banner">${key.category}</div>
      <img class="img-responsive" src="${key.image}" id="${key.id}" />
      </div>
      <div class="activity-card-text text-md-center w-100 mt-3">
        <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
          <h6 class="text-left">${key.name}</h6>
          <p>${key.costPerHead}</p>
          </div>
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
          <h6 class="text-left">Duration</h6>
          <p>${key.duration}</p>
          </div>
        
     
    </div>
  </a>`;
    document.getElementById("data").appendChild(ele);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log("filterByDuration=",list);
  // let bigCity = [];
  // for (let i = 0; i < list.length; i++) {
  //   if (list[i].duration > low && list[i].duration <= high) {
  //     bigCity.push(list[i]);
  //   }
  // }

  // return bigCity;
  return list.filter(adventure =>adventure.duration > low && adventure.duration <= high );
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log("filterByCategory=",list);
  let bigCity = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (list[i].category == categoryList[j]) {
        bigCity.push(list[i]);
      }
    }
  }
  return bigCity;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
  let varr = filters.duration;
  let result = varr.split("-");
  const low = result[0];
  const high = result[1];
  let filterList = [];
  if (filters["duration"] && filters["category"].length > 0) {
    filterList = filterByCategory(list, filters.category),
      filterList = filterByDuration(filterList, low, high);
      console.log("filterFunction",filterList);

  } else if (filters["category"].length > 0) {
    filterList = filterByCategory(list, filters.category);
    console.log("filterFunction",filterList);

  } else if (filters["duration"]) {
    filterList = filterByDuration(filterList, low, high);
    console.log("filterFunction",filterList);
  } else {
    filterList = list;
  }
 
  // Place holder for functionality to work in the Stubs
  return filterList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  const json = JSON.stringify(filters);
  localStorage.setItem("filters", json);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const json = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return json;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
//  console.log("generateFilterPillsAndUpdateDOM",filters);
  filters.category.forEach((Element) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
  <span class="border border-warning">${Element}</span>;`;
    let divRolEle = document.getElementById("category-list");
    divRolEle.append(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
