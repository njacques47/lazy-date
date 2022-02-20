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

function getRecipesApi(event) {
  event.preventDefault();
// Hides the placeholder information when API renders a recipe
  hideDivEl.classList.add("hide");
  
  fetch(requestMealUrl)
      .then(function(response) {
          return response.json();
        })
        .then(function(mealData) {
          var meal = mealData.meals;

          // Removes the old recipe after generating a new one
          randomMeal.empty();
          testingEl.empty();
          recipeHistoryEl.empty();

          for (var i = 0; i < meal.length; i++) {
            var recipeName = meal[i].strMeal;
            var recipeImage = meal[i].strMealThumb;
            var recipeSource = meal[i].strSource;
            var mealVideo = meal[i].strYoutube;
            
            // appends the recipe information to the html body
            var h3 = $("<h3 class= 'black'>")
            h3.text(recipeName)
            randomMeal.append(h3)
            var img = $("<img class='thumbnail' src=" + recipeImage + "><br>")
            randomMeal.append(img)
            var a1 = $("<a class='button primary' href=" + recipeSource + ">Source</a><br>")
            testingEl.append(a1)
            var a2 = $("<a class='button primary' href=" + mealVideo + ">Video</a>")
            testingEl.append(a2)

            // appends the list of previous results to the html body
            var intro = $("<h3 class= 'black'>")
            intro.text("Previous Recipes")
            recipeHistoryEl.append(intro)
            for (var i = 0; i < savedMeal.length; i++) {
              var mealArray = savedMeal[i].mealName;
              var sourceArray = savedMeal[i].mealSource;         
              var li = $("<li><a href='" + sourceArray + "'>" + mealArray + "</a>" + "<br></li>")
              recipeHistoryEl.append(li);
            }

            // binds the recipe together with the source html so that they can be called together
            var mealAdd = {
              mealName: recipeName,
              mealSource: recipeSource
            }
            // limits the amount of saved recipes to 10 and replaces the oldest recipe with the newest one
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

