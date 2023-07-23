const dateElem = document.querySelector(".weather-data .date");
const searchForm = document.querySelector(".main-weather form");
const defaultCityWeatherElem = document.querySelector(".default-city-weather");
const locationElem = document.querySelectorAll(".city-name");

// month list
const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// day list
const daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getCurrentTime = () => {
  let second = new Date().getSeconds();
  let minute = new Date().getMinutes();
  let hour = new Date().getHours();
  let day = new Date().getDay();
  let date = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let am_pm;
  setInterval(() => {
    am_pm = new Date().getHours() > 12 ? "PM" : "AM";
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute > 59) {
      hour++;
      minute = 0;
    }
    if (hour > 12) {
      hour = 1;
    }
    second++;
    dateElem.innerHTML = `
    <div>${hour}:${minute === 60 ? 0 : minute}:${
      second === 60 ? 0 : second
    } ${am_pm}</div>
    <div>${daysList[day]}, ${date} ${monthsList[month]}, ${year}</div>
    `;
  }, 1000);
};
getCurrentTime();

const showWeatherData = ({ current, location }) => {
  // const { weather_icons } = current;
  const { name, country, region } = location;
  locationElem.querySelector(
    "p"
  ).textContent = `${name}, ${country}, ${region}`;
  defaultCityWeatherElem
    .querySelector(".weather-icon")
    .setAttribute("src", current.weather_icons[0]);
};

const API_KEY = "70b7edac0b1ec947a50b3768989f4d69";

const getWeatherData = async (location) => {
  const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const getLocation = async (e) => {
  e.preventDefault();
  const searchInput = e.currentTarget[0];
  if (!searchInput.value) return;
  const location = searchInput.value;
  const weatherData = await getWeatherData(location);
  if (weatherData.error) {
    console.log(weatherData.error);
    return;
  }
  showWeatherData(weatherData);
};

searchForm.addEventListener("submit", getLocation);
