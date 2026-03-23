const indianHolidays={
"01-26":"Republic Day",
"08-15":"Independence Day",
"10-02":"Gandhi Jayanti",
"12-25":"Christmas"
};

function generateCalendar(){

const container=document.getElementById("calendarContainer");

container.innerHTML="";

const year=parseInt(document.getElementById("yearInput").value);

const showHolidays=document.getElementById("holidayToggle").checked;

const months=[
"January","February","March","April",
"May","June","July","August",
"September","October","November","December"
];

let page=createPage();

container.appendChild(page);

let spine=page.querySelector(".spine");

let spaceUsed=0;

const DAY_WIDTH=8;
const PAGE_WIDTH=260; // usable width inside margins

for(let m=0;m<12;m++){

let days=new Date(year,m+1,0).getDate();

let monthLabelPlaced=false;

for(let d=1;d<=days;d++){

if(spaceUsed+DAY_WIDTH>PAGE_WIDTH){

page=createPage();

container.appendChild(page);

spine=page.querySelector(".spine");

spaceUsed=0;

monthLabelPlaced=false;

}

let day=document.createElement("div");

day.className="day";

if(d===1) day.classList.add("month-start");

if(d===1 && m!==0) day.classList.add("transition");

let weekday=new Date(year,m,d).getDay();

if(weekday===0||weekday===6)
day.classList.add("weekend");

let key=
String(m+1).padStart(2,"0")+"-"+
String(d).padStart(2,"0");

if(showHolidays && indianHolidays[key])
day.classList.add("holiday");

let label=document.createElement("span");

label.textContent=d;

day.appendChild(label);

spine.appendChild(day);

/* place month label */

if(!monthLabelPlaced){

let monthName=document.createElement("div");

monthName.className="month-label";

monthName.style.left=(10+spaceUsed)+"mm";

monthName.textContent=months[m]+" "+year;

page.appendChild(monthName);

monthLabelPlaced=true;

}

spaceUsed+=DAY_WIDTH;

}

}

}


/* create page */

function createPage(){

let page=document.createElement("div");

page.className="page";

let spine=document.createElement("div");

spine.className="spine";

page.appendChild(spine);

return page;

}
