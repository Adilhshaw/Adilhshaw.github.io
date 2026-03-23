function generateCalendar(){

const container = document.getElementById("calendarContainer");
const year = parseInt(document.getElementById("yearInput").value);

container.innerHTML = "";

const months = [
"January","February","March","April",
"May","June","July","August",
"September","October","November","December"
];

const timeline = document.createElement("div");
timeline.className = "timeline";

for(let m=0; m<12; m++){

let monthRow = document.createElement("div");
monthRow.className = "month-row";

let monthLabel = document.createElement("div");
monthLabel.className = "month-label";
monthLabel.textContent = months[m] + " " + year;

monthRow.appendChild(monthLabel);

let spine = document.createElement("div");
spine.className = "spine";

let daysInMonth = new Date(year, m+1, 0).getDate();

for(let d=1; d<=daysInMonth; d++){

let day = document.createElement("div");
day.className = "day";

if(d===1){
day.classList.add("month-start");
}

let weekday = new Date(year, m, d).getDay();

if(weekday===0 || weekday===6){
day.classList.add("weekend");
}

let label = document.createElement("span");
label.textContent = d;

day.appendChild(label);

spine.appendChild(day);

}

monthRow.appendChild(spine);
timeline.appendChild(monthRow);

}

container.appendChild(timeline);

}
