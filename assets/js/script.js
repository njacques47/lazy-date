var startEl = document.querySelector("#start");
var inButtonEl = document.querySelector("#inButton");
var fetchTicketsEl = document.querySelector("#searchButton");
var footerEl = $("#saved");
var mealButtonsEl = $("#meal-buttons");
var randomMeal = $("#mealResults");
var recipeHistoryEl = $(".recipeHistory")
var favButtonEl = $("#favButton");
var locationInput = document.querySelector("#eventLocation");
var user = JSON.parse(localStorage.getItem("user"));
var savedMeal = JSON.parse(localStorage.getItem("savedMeal")) || [];
var requestMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
var hideTicketmaster = function () {
  $("#event-api-error").hide();
  $("#event-panel").hide();
  $("#placeholder-img").hide();
  $("#meal-results-section").show();
};
var hideMeals = function () {
  $("#placeholder-img").hide();
  $("#meal-results-section").hide();
};


var eventErrorHandle = function () {
  $("#event-api-error").show();
  hideMeals();
  $("#event-panel").hide(); // hide if showing when error is thrown
};

//when this document is ready, do this
$(document).ready(function () {
  //make sure to update the form to have this id
  $("#form-submit").submit(function (event) {
    event.preventDefault();
    var formData = $("#form-submit").serialize();
    searchEvents(formData);
    hideMeals(); // indivudal elements hidden so they can be shown again later
  });
});


// get event list using params from user inputs
function searchEvents(formData) {
  if (formData === "keyword=&postalCode=") {
    eventErrorHandle();
    console.log(formData);
  } else {
    console.log(formData)
    $("#event-panel").show();
    $("#event-api-error").hide() // if showing, then hide
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events?apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7&" + formData,
      async: true,
      dataType: "json",
      success: function (json) {
        searchEvents.json = json;
        displayEventList(json);
      },
      error: function (xhr, status, err) {
        eventErrorHandle();
      }
    });

  }
};


// display event list
function displayEventList(json) {

  //hide original text
  var items = $("#event .list-item")
  items.hide();

  //create a variable reference to interact with the returned data
  var events = json._embedded.events;
  var item = items.first(); //first matching elements

  //loop through data to display
  for (var i = 0; i < events.length; i++) {

    item.children('.list-item-heading').text(events[i].name);
    item.children('.list-item-info').text(events[i].dates.start.localDate);

    //try looks for it & will throw an error if its not available
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      eventErrorHandle(err);
    }
    item.show();

    item.children(".get-tickets").click(events[i], function (eventObject) {

      //add event ticket url to btn 
      ticketUrl = eventObject.data.url;
      $(this).attr("href", ticketUrl);
    });
    item = item.next(); //next matching element replaced here
  }
};

function getRecipesApi(event) {
  event.preventDefault();

  hideTicketmaster(); // hides TM api

  fetch(requestMealUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (mealData) {
      var meal = mealData.meals;

      // Removes the old recipe after generating a new one
      randomMeal.empty();
      mealButtonsEl.empty();
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
        mealButtonsEl.append(a1)
        var a2 = $("<a class='button primary' href=" + mealVideo + ">Video</a>")
        mealButtonsEl.append(a2)

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
    
function populateFooter() {
  var footer = $("<h3 class= 'black'>")
  footer.text("Previous Recipes")
  footerEl.append(footer)
  for (var i = 0; i < savedMeal.length; i++) {
    var mealArray = savedMeal[i].mealName;
    var sourceArray = savedMeal[i].mealSource;
    var li = $("<li><a href='" + sourceArray + "'>" + mealArray + "</a>" + "<br></li>")
    footerEl.append(li);
    console.log(sourceArray);
  }
}
populateFooter();
    
inButtonEl.addEventListener("click", getRecipesApi);
