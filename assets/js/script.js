//when this document is ready, do this
$(document).ready(function() {
  //make sure to update the form to have this id
  $("#form-submit").submit(function(event) {
    function searchEvents(event) {
      $('form').serialize();
    };
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
                alert("err"); //temp
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
  console.log(json)
  var item = items.first(); //first matching elements

  //loop through data to display
  for (var i=0;i<events.length;i++) {
    item.children('.list-item-heading').text(events[i].name);
    item.children('.list-item-info').text(events[i].dates.start.localDate);

    //try looks for it but doesn't throw an error if its not available
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    //item.off("click"); // don't need this???


    item.click(events[i].id, function(eventObject) {

      
      //successful return of the request provides event details & calls to 
      // id = eventObject.data;
      // console.log(id);
      // $.ajax({
      //   type:"GET",
      //   url:"https://app.ticketmaster.com/discovery/v2/events/" + eventObject.data + ".json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0",
      //   async:true,
      //   dataType: "json",
      //   success: function(json) {
      //         eventObject.json = json;
      //         showEventDetails(json);
      //        },
      //   error: function(xhr, status, err) {
      //         console.log("get attraction error");
      //        }
      // });
    });
    item = item.next(); //next matching element replaced here
  }
};


// show event details
function showEventDetails(json) {
  console.log("Event details loaded!", json); // it works! now use details to populate eventDetails or suggested events!
  var items = $("#attractions-container");
  items.hide();

  //use json to populate name, img

// check img for 
  $("#attraction-img")

};

//showAttraction();



// save event 

searchEvents();