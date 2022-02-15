var fetchTicketsEl = document.querySelector("#searchButton");
var EventSearchInput = document.querySelector("#eventSearch");
var dateInput = document.querySelector("#eventDate");
var locationInput = document.querySelector("#eventLocation")
var user = JSON.parse(localStorage.getItem("user"));

function saveEvents(event) {
event.preventDefault();
    var user = {
      eventSearch: EventSearchInput.value,
      date: dateInput.value,
      location: locationInput.value
    };

    localStorage.setItem("user", JSON.stringify(user));
}

    console.log(user.eventSearch)
    console.log(user.date);
    console.log(user.location);

fetchTicketsEl.addEventListener("click", saveEvents);
