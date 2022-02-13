var fetchTicketsEl = document.querySelector("#ticketMaster");
var fetchRecipesEl = document.querySelector("#mealDB");
var submitBtn = $("#btn");
var renderRightEl = $(".split-right");
var requestEventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7"
var requestMealUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

function getTicketsApi(event) {
event.preventDefault();
fetch(requestEventUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var items = data._embedded.events;
      renderRightEl.empty();
      for (var i = 0; i < items.length; i++) {
        var h3 = $("<h3>")
        h3.text(items[i].name)
        renderRightEl.append(h3)
      }
          console.log(data);
    });
}

function getRecipesApi(event) {
    event.preventDefault();
    fetch(requestMealUrl)
        .then(function(response) {
            return response.json();
          })
          .then(function(mealData) {
            var foods = mealData.categories;
            renderRightEl.empty();
            for (var i = 0; i < foods.length; i++) {
              var h3 = $("<h3>")
              h3.text(foods[i].strCategory)
              renderRightEl.append(h3)
              }  
             console.log(mealData);
          });
    }


fetchTicketsEl.addEventListener("click", getTicketsApi);
fetchRecipesEl.addEventListener("click", getRecipesApi);
