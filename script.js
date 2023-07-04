"use strict";

const weatherContainer = document.querySelector(".weather-container");

// Elements for displaying weather information
const cityWeatherTemperature = document.getElementById(
  "cityWeatherTemperature"
);
const cityWeatherDescription = document.getElementById(
  "cityWeatherDescription"
);
const cityWeatherIcon = document.getElementById("cityWeatherIcon");

// Navigation links and info containers
const navLinks = document.querySelectorAll(".nav-link");
const navInfoContainers = document.querySelectorAll(".nav-info");

// Weather API URL
const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=35.5558&lon=45.4351&appid=b186afe85fabe53c8ab91946ad3d3d94";

// Fetch weather data from the API
const fetchData = async function () {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();

    // Display temperature and weather description
    const temp = Math.round(json.main.temp - 273.15);
    cityWeatherTemperature.innerHTML = `${temp}&#8451;`;
    cityWeatherDescription.innerHTML = json.weather[0].description;

    // Display weather icon
    const html = `<img
      class="city-weather-icon"
      id="cityWeatherIcon"
      src=${"https://openweathermap.org/img/w/" + json.weather[0].icon + ".png"}
      alt="sun-svg"
    />`;
    weatherContainer.insertAdjacentHTML("beforeend", html);
  } catch {
    console.log("Error retrieving weather data.");
    weatherContainer.innerHTML = "Error retrieving weather data.";
  }
};

// Fetch weather data when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

// Function to handle navigation link clicks
const handleNavLinkClick = function (e) {
  e.preventDefault();

  const target = e.target;
  navLinks.forEach((link) => {
    if (link !== target) {
      link.classList.remove("selected");
    }
  });
  target.classList.add("selected");

  // Show/hide corresponding info containers
  navInfoContainers.forEach((info) => {
    if (info.id !== target.dataset.target) {
      info.classList.add("hide");
    } else {
      info.classList.remove("hide");
    }
  });
};

// Add click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinkClick);
});
