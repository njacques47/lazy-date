var fetchTicketsEl = document.querySelector("#ticketMaster");
var fetchRecipesEl = document.querySelector("#mealDB")
var requestEventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7"
var requestMealUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

function getTicketsApi() {
event.preventDefault();
fetch(requestEventUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
          console.log(data);
    });
}

function getRecipesApi() {
    event.preventDefault();
    fetch(requestMealUrl)
        .then(function(response) {
            return response.json();
          })
          .then(function(mealData) {
                console.log(mealData);
          });
    }
fetchTicketsEl.addEventListener("click", getTicketsApi);
fetchRecipesEl.addEventListener("click", getRecipesApi);
