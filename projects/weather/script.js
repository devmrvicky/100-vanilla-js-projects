const dateElem = document.querySelector(".weather-data .date");
const searchForm = document.querySelector(".main-weather form");
const defaultCityWeatherElem = document.querySelector(".default-city-weather");

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

const getFullDate = (ms) => {
  const dateObj = new Date(ms);
  const year = dateObj.getFullYear();
  const month = ("0" + dateObj.getMonth()).slice(-2);
  const day = ("0" + dateObj.getDay()).slice(-2);
  const date = ("0" + dateObj.getDate()).slice(-2);
  const hour = ("0" + dateObj.getMonth()).slice(-2);
  const minute = ("0" + dateObj.getMinutes()).slice(-2);
  const second = ("0" + dateObj.getSeconds()).slice(-2);
  console.log({
    year,
    month: [parseInt(month) + 1, monthsList[parseInt(month)]],
    day: daysList[parseInt(day)],
    date,
    hour,
    minute,
    second,
  });
};
getFullDate(1690166726);

const showWeatherData = (data) => {
  console.log(data);
  // const { weather_icons } = current;
  // const { name, country, region } = location;
  defaultCityWeatherElem.querySelector(
    ".city-name"
  ).textContent = `${data.name}, ${data.sys.country}`;
  // defaultCityWeatherElem
  //   .querySelector(".weather-icon")
  //   .setAttribute("src", current.weather_icons[0]);
  defaultCityWeatherElem.querySelector(
    ".temperature"
  ).innerHTML = `${data.main.temp}<sup>o</sup`;
};

const API_KEY = "a9eff1a8b2bc670c4017e376978cbcb5";

const getCoordinate = async (location) => {
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const getWeatherData = async ({ lat, lon }) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  console.log(URL);
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const getLocation = async (e) => {
  e.preventDefault();
  const searchInput = e.currentTarget[0];
  if (!searchInput.value) return;
  const location = searchInput.value;
  const coordinate = await getCoordinate(location);
  const weatherData = await getWeatherData(coordinate[0]);
  showWeatherData(weatherData);
};

searchForm.addEventListener("submit", getLocation);
