var fetchTicketsEl = document.querySelector("#search-btn");
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

fetchTicketsEl.addEventListener("click", saveEvents);
