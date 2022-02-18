// an object to make referencing user input easier??
var userInputData = {
  // figure out how to get user input to become key-value pair that I can pass over
  // keyword: document.getElementById("keyword-entry").value,
  // date: document.getElementById("date-entry").value,
  // zipcode: document.getElementById("zipcode-entry").value,

  keyword: 'concert',
  date: '2022-04-12T03:43:00Z',
  zipcode: '10001',
}; 

console.log(userInputData)

// get event list using params
function getEventList (keyword, date, zipcode) {
  JSON.stringify(userInputData);

  // stop reload [CURRENTLY NOT WORKING]
  $("#event-search-btn").click(function(event) {
    event.preventDefault();
  });

  // display seach results
  $('#event-panel').show();


  // call search events is happening here. confirms its hitting API [DONT KNOW HOW THIS BROKE]
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7&" + userInputData.keyword + "&postalCode=" + userInputData.zipcode,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                //getEventList.json = json;
                
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });
}


//getEventList();

// display event list
function displayEventList () {

}
// get specific event/attraction using id parameter 

// show event details

// save event 