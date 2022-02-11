function getApi() {
    var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7"

fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for (var i = 0; i < data.length; i++) {
          console.log(data);
      }
    });
    return fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function(response) {
        return response.json();
      })
      .then(function(mealData) {
        for (var i = 0; i < mealData.length; i++) {
            console.log(mealData);
        }
      });
}
getApi();