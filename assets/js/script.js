
//this isn't working.....yet
var error = function() {
  $("#event-form-container").effect("shake");
};

//when this document is ready, do this
$(document).ready(function() {
  //make sure to update the form to have this id
  $("#form-submit").submit(function(event) {
    function searchEvents(event) {
      formData = $("form").serialize();
    };
    $("#event-panel").show();
    //stop auto refresh
    event.preventDefault();
    
  }); 
});

// get event list using params
function searchEvents (event) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events?apikey=B7SeHPlCAJjIFj2rmXfNVhHuwqaxGrA7",
    async:true,
    dataType: "json",
    success: function(json) {
                searchEvents.json = json;
                displayEventList(json);
             },
    error: function(xhr, status, err) {
                console.log(err);
             }
  });

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
      console.log(err);
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

searchEvents();