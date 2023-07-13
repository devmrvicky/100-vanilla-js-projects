// selected dom element
const timeLine = document.querySelector(".time-line");
const datesElem = document.querySelector(".dates");
const daysElem = document.querySelector(".days");
const eventsElem = document.querySelector(".events");
const module = document.querySelector(".module");
const addEventBtn = document.querySelector(".add-event-btn");

// global variable
const dateObj = new Date();
let currentMonth;
let currentDay = dateObj.getDay();
let currentDate = dateObj.getDate();
// let selected year, month, day, date
let selectedFullDate, selectedYear, selectedMonth, selectedDay, selectedDate;
let dateTimeObj = {
  eventDate: dateObj.getDate(),
  eventDay: dateObj.getDay(),
  eventMonth: dateObj.getMonth(),
  eventYear: dateObj.getFullYear(),
  eventHour: dateObj.getHours(),
  eventMinute: dateObj.getMinutes(),
  getEventTime: function () {
    if (this.eventMinute < 10) {
      this.eventMinute = "0" + this.eventMinute;
    }
    if (this.eventHour < 10) {
      this.eventHour = "0" + this.eventHour;
    }
    return `${this.eventHour}:${this.eventMinute}`;
  },
  getEventDate: function () {
    if (this.eventMonth < 10) {
      this.eventMonth = "0" + this.eventMonth;
    }
    if (this.eventDate < 10) {
      this.eventDate = "0" + this.eventDate;
    }
    return `${this.eventYear}-${this.eventMonth}-${this.eventDate}`;
  },
};

// All month's name
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
// All day's name
const daysList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// create day list at the top to cldr prev
const createDayList = () => {
  daysList.forEach((day) => {
    const dayElem = document.createElement("div");
    dayElem.classList.add("day");
    dayElem.textContent = day.toUpperCase();
    daysElem.append(dayElem);
  });
};

// get year (current year and next year)
const getYearElem = (year) => {
  const yearElem = document.createElement("div");
  yearElem.classList.add("year");
  yearElem.textContent = year;
  return yearElem;
};

// get all months list
const getMonthsElem = () => {
  const ul = document.createElement("ul");
  ul.classList.add("months");
  monthsList.forEach((month, index) => {
    const li = document.createElement("li");
    li.classList.add("month");
    li.setAttribute("data-month", month);
    if (index === dateObj.getMonth()) {
      currentMonth = month;
      li.classList.add("active");
    }

    li.textContent = month;
    ul.append(li);
  });
  return ul;
};

// create year and month list
const createMonthsList = () => {
  createDayList();
  // current year
  const currYear = getYearElem(dateObj.getFullYear());
  timeLine.insertAdjacentElement("afterbegin", currYear);
  // months
  const ul = getMonthsElem();
  currYear.insertAdjacentElement("afterend", ul);
  // next year
  const nextYear = getYearElem(dateObj.getFullYear() + 1);
  ul.insertAdjacentElement("afterend", nextYear);
};
createMonthsList();

// create all date list
const createDateList = (currentMonth) => {
  datesElem.innerHTML = "";
  let lastDate;
  if (
    currentMonth === "January" ||
    currentMonth === "March" ||
    currentMonth === "May" ||
    currentMonth === "July" ||
    currentMonth === "August" ||
    currentMonth === "October" ||
    currentMonth === "December"
  ) {
    lastDate = 31;
  } else if (currentMonth === "February") {
    lastDate = 28;
  } else if (
    currentMonth === "April" ||
    currentMonth === "June" ||
    currentMonth === "September" ||
    currentMonth === "November"
  ) {
    lastDate = 30;
  }

  let num = 0;
  let date = 1;
  while (num < lastDate + new Date(`1-${currentMonth}-2023`).getDay()) {
    const dateElem = document.createElement("div");
    if (currentDate + monthsList[dateObj.getMonth()] === date + currentMonth) {
      dateElem.className = "date curr-date active-date";
    } else {
      dateElem.className = "date curr-date";
    }
    dateElem.setAttribute(
      "title",
      `${monthsList.indexOf(currentMonth) + 1}-${date}-${dateObj.getFullYear()}`
    );
    if (num >= new Date(`1-${currentMonth}-2023`).getDay()) {
      dateElem.innerHTML += `<span>${date}</span>`;
      date++;
    }
    datesElem.append(dateElem);
    num++;
    dateElem.onclick = (e) => {
      showSelectedDate(dateElem);
      selectedFullDate = e.currentTarget.title;
      selectedMonth = selectedFullDate.split("-")[0] - 1;
      selectedDate = selectedFullDate.split("-")[1];
      selectedYear = selectedFullDate.split("-")[2];
      selectedDay = new Date(selectedFullDate).getDay();
      dateTimeObj = {
        ...dateTimeObj,
        eventDate: selectedDate,
        eventDay: selectedDay,
        eventMonth: selectedMonth,
        eventYear: selectedYear,
        dateElem,
      };
      if (e.currentTarget.classList.contains("selected-date")) {
        getFullDate(selectedDate, selectedDay, selectedMonth, selectedYear);
      } else {
        showFullDate(currentDate, currentDay, currentMonth);
      }
    };
  }
};
createDateList(currentMonth);

// function to show selected date
function showSelectedDate(dateElem) {
  if (!dateElem.classList.contains("active-date")) {
    if (dateElem.classList.contains("selected-date")) {
      dateElem.classList.remove("selected-date");
    } else {
      const dateElems = document.querySelectorAll(".date");
      dateElems.forEach((elem) => {
        elem.classList.remove("selected-date");
      });
      dateElem.classList.toggle("selected-date");
    }
  }
}

// check for active date
const months = document.querySelectorAll(".months li");
months.forEach((month) => {
  month.addEventListener("click", (e) => {
    months.forEach((month) => {
      month.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    createDateList(e.currentTarget.dataset.month);
  });
});

const showFullDate = (date, day, month, year = dateObj.getFullYear()) => {
  if (date < 10) {
    date = "0" + date;
  }
  let monthInNum = monthsList.indexOf(month) + 1;
  if (monthInNum < 10) {
    monthInNum = "0" + monthInNum;
  }
  const selectedDate = eventsElem.querySelector(".selected-date");
  selectedDate.innerHTML = `
  <div class="current-year">${month}</div>
  <div class="current-date">${date}-${monthInNum}-${year}</div>
  <div class="current-day">${daysList[day]}</div>
  `;
};
showFullDate(currentDate, currentDay, currentMonth);

function getFullDate(date, day, month, year) {
  showFullDate(date, day, monthsList[month], year);
  // console.log({ date, day, month, year });
}

addEventBtn.addEventListener("click", () => {
  module.classList.add("open-module");
  const inputs = module.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.id === "startTime" || input.id === "endTime") {
      input.value = dateTimeObj.getEventTime();
    } else if (input.id === "eventDate") {
      input.value = dateTimeObj.getEventDate();
    } else if (input.id === "eventName") {
      input.value = "Business meeting";
      dateTimeObj = { ...dateTimeObj, eventName: input.value };
    }
  });
  console.log(dateTimeObj);
});

// handle submit module form
const ul = eventsElem.querySelector("ul");
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(dateTimeObj.getEventTime());
  const li = document.createElement("li");
  li.className = "event";
  li.innerHTML = `
  <div class="event-name">${dateTimeObj.eventName}</div>
  <div class="event-time">${dateTimeObj.getEventTime()} Am - ${dateTimeObj.getEventTime()} AM</div>
  <button class="event-menu" title="event-menu">
    <i class="fa-solid fa-ellipsis-stroke"></i>
  </button>
  `;
  ul.append(li);
  module.classList.remove("open-module");
};

const moduleCtrlBtns = module.querySelectorAll(".ctrl-btns button");
moduleCtrlBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnType = e.currentTarget.type;
    if (btnType === "button") {
      module.classList.remove("open-module");
    } else if (btnType === "submit") {
      handleSubmit(e);
    }
  });
});
