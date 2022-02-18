// an object to make referencing user input easier??
var userInputData = {
  keyword: 'concert',
  date: '2022-04-12T03:43:00Z',
  zipcode: '10001',
}; 

console.log(userInputData)

// get event list using params
function getEventList () {
  //JSON.stringify(userInputData);

  // stop reload [CURRENTLY NOT WORKING]
  //$("#event-search-btn").click(function(event) {
    //event.preventDefault();
  //});

  // display search results
  $('#event-panel').show();

  // temp hardcoded data to render eventList
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=concert&postalCode=10001&locale=*&startDateTime=2022-04-12T03:43:00Z",
    async:true,
    dataType: "json",
    success: function(json) {
                getEventList.json = json;
                displayEventList(json);

                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                console.log(error);
             }
  });

};


getEventList();

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
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    // item.off("click"); // don't need this
    // item.click(events[i], function(eventObject) {
    //   console.log(eventObject.data);
    //   try {
    //     getAttraction(eventObject.data._embedded.attractions[0].id);
    //   } catch (err) {
    //   console.log(err);
    //   }
    // });
    item=item.next();
  }
  //create new elements for display
  //don't forget error handling

  //display relevant data using modal here??
}
// get specific event/attraction using id parameter 

// show event details

// save event 

//hopefully this makes the modal work
//$(document).foundation();
