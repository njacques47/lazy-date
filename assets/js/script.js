//var outButtonEl = document.querySelector("#outButton");
var startEl = document.querySelector("#start");
var inButtonEl = document.querySelector("#inButton");
var eventFormEl = document.querySelector("#eventForm")
var fetchTicketsEl = document.querySelector("#searchButton");

var EventSearchInput = document.querySelector("#eventSearch");
var dateInput = document.querySelector("#eventDate");
var hideDivEl = document.querySelector("#hide")
var testingEl = $("#testing")
var randomMeal = $("#mealResults");
var recipeHistoryEl = $("#recipeHistory")
var favButtonEl = $("#favButton");
var locationInput = document.querySelector("#eventLocation");
var user = JSON.parse(localStorage.getItem("user"));
var savedMeal = JSON.parse(localStorage.getItem("savedMeal")) || [];
var requestMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

function eventChoice() {
  startEl.classList.add("hide")
  eventFormEl.classList.remove("hide")
}

function saveEvents(event) {
event.preventDefault();
    var user = {
      eventSearch: EventSearchInput.value,
      date: dateInput.value,
      location: locationInput.value
    };

    localStorage.setItem("user", JSON.stringify(user));
}

function getRecipesApi(event) {
  event.preventDefault();

  hideDivEl.classList.add("hide");
  
  fetch(requestMealUrl)
      .then(function(response) {
          return response.json();
        })
        .then(function(mealData) {
          var meal = mealData.meals;

          randomMeal.empty();
          recipeHistoryEl.empty();
          for (var i = 0; i < meal.length; i++) {
            var recipeName = meal[i].strMeal;
            var recipeImage = meal[i].strMealThumb;
            var recipeSource = meal[i].strSource;
            var mealVideo = meal[i].strYoutube;

            var h3 = $("<h3 class= 'black'>")
            h3.text(recipeName)
            randomMeal.append(h3)
            var img = $("<img class='thumbnail' src=" + recipeImage + "><br>")
            randomMeal.append(img)
            var a1 = $("<a class='button primary' href=" + recipeSource + ">Source</a><br>")
            testingEl.append(a1)
            var a2 = $("<a class='button primary' href=" + mealVideo + ">Video</a>")
            testingEl.append(a2)

            var intro = $("<h3 class= 'black'>")
            intro.text("Previous Recipes")
            recipeHistoryEl.append(intro)
            for (var i = 0; i < savedMeal.length; i++) {
              var mealArray = savedMeal[i].mealName;
              var sourceArray = savedMeal[i].mealSource;         
              var li = $("<li><a href='" + sourceArray + "'>" + mealArray + "</a>" + "<br></li>")
              recipeHistoryEl.append(li);
            }
            var mealAdd = {
              mealName: recipeName,
              mealSource: recipeSource
            }
            savedMeal.push(mealAdd);
            if (savedMeal.length > 10) {
              savedMeal.shift();
          }  
            localStorage.setItem("savedMeal", JSON.stringify(savedMeal));
            }
        });
  }

//outButtonEl.addEventListener('click', eventChoice);
inButtonEl.addEventListener('click', getRecipesApi);
