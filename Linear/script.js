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

let monthBlock = document.createElement("div");
monthBlock.className = "month-block";

let monthLabel = document.createElement("div");
monthLabel.className = "month-name";
monthLabel.textContent = months[m];

monthBlock.appendChild(monthLabel);

let daysInMonth = new Date(year, m+1, 0).getDate();

for(let d=1; d<=daysInMonth; d++){

let day = document.createElement("div");
day.className = "day";
day.textContent = d;

let weekday = new Date(year, m, d).getDay();

if(weekday === 0 || weekday === 6){
day.classList.add("weekend");
}

monthBlock.appendChild(day);

}

timeline.appendChild(monthBlock);

}

container.appendChild(timeline);

}
