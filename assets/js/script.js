var userInput = document.querySelector("form#from-submit input");
var eventErrorHandle = function() {
  $("#event-api-error").show()
  $("#placeholder-content").hide();
}

//when this document is ready, do this
$(document).ready(function() {
  //make sure to update the form to have this id
  $("#form-submit").submit(function(event) {
    event.preventDefault();
    var formData = $("#form-submit").serialize();
    searchEvents(formData);
    $("#placeholder-content").hide();
  }); 
});


// get event list using params from user inputs
function searchEvents (formData) {
  if (userInput === "null" || userInput === "" || formData === "keyword=&postalCode="){
    eventErrorHandle();
    console.log(formData);
  } else {
    console.log(formData)
    $("#event-panel").show();
    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events?apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7&" + formData,
      async:true,
      dataType: "json",
      success: function(json) {
                  searchEvents.json = json;
                  displayEventList(json);
                  //console.log(json)
               },
      error: function(xhr, status, err) {
                  eventErrorHandle();
               }
    });
  
  }
  
};


// display event list
function displayEventList (json) {
  //hide original text
  var items = $("#event .list-item")
  items.hide();

  //create a variable reference to interact with the returned data
  var events = json._embedded.events;
  var item = items.first(); //first matching elements

  //loop through data to display
  for (var i=0;i<events.length;i++) {
    item.children('.list-item-heading').text(events[i].name);
    item.children('.list-item-info').text(events[i].dates.start.localDate);

    //try looks for it & will throw an error if its not available
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      eventErrorHandle(err);
    }
    item.show();

    item.children(".get-tickets").click(events[i], function(eventObject) {
      //add event ticket url to btn 
      ticketUrl = eventObject.data.url;
      $(this).attr("href", ticketUrl);
    });
    item = item.next(); //next matching element replaced here
  }
}; 
