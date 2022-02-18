// an object to make referencing user input easier??
var userInputData = {
  keyword: document.getElementById("keyword-entry").value,
  date: document.getElementById("date-entry").value,
  postalCode: document.getElementById("zipcode-entry").value,

} 

console.log(userInputData)

// get event list using params
function getEventList (keyword, date, postalCode) {
  $("event-search")
  // display seach results
  $('#event-panel').show();


  // this completes the fetch request 
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7&" + userInputData.keyword + "&postalCode=" + userInputData.postalCode,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });
}


getEventList();

// display event list

// get specific event/attraction using id parameter 

// show event details

// save event 