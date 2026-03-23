const indianHolidays = {
"01-26":"Republic Day",
"08-15":"Independence Day",
"10-02":"Gandhi Jayanti",
"12-25":"Christmas"
};

function generateCalendar(){

const container = document.getElementById("calendarContainer");

container.innerHTML="";

const year=parseInt(document.getElementById("yearInput").value);

const showHolidays=document.getElementById("holidayToggle").checked;

const months=[
"January","February","March","April",
"May","June","July","August",
"September","October","November","December"
];

let zigzag=false;

for(let m=0;m<12;m++){

let monthRow=document.createElement("div");

monthRow.className="month-row "+(zigzag?"right":"left");

zigzag=!zigzag;

let monthLabel=document.createElement("div");

monthLabel.className="month-label";

monthLabel.textContent=months[m]+" "+year;

monthRow.appendChild(monthLabel);

let spine=document.createElement("div");

spine.className="spine";

let days=new Date(year,m+1,0).getDate();

for(let d=1;d<=days;d++){

let day=document.createElement("div");

day.className="day";

if(d===1) day.classList.add("month-start");

let weekday=new Date(year,m,d).getDay();

if(weekday===0||weekday===6)
day.classList.add("weekend");

let dateKey=
String(m+1).padStart(2,"0")+"-"+
String(d).padStart(2,"0");

if(showHolidays && indianHolidays[dateKey])
day.classList.add("holiday");

if(d===1 && m!==0)
day.classList.add("transition");

let label=document.createElement("span");

label.textContent=d;

day.appendChild(label);

spine.appendChild(day);

}

/* page guide every ~90 days */

if(m%3===0 && m!==0){

let guide=document.createElement("div");

guide.className="page-guide";

spine.appendChild(guide);

}

monthRow.appendChild(spine);

container.appendChild(monthRow);

}

}


/* SVG export */

function exportSVG(){

const calendar=document.getElementById("calendarContainer");

let serializer=new XMLSerializer();

let source=serializer.serializeToString(calendar);

let blob=new Blob([source],{type:"image/svg+xml;charset=utf-8"});

let url=URL.createObjectURL(blob);

let link=document.createElement("a");

link.href=url;

link.download="linear-calendar.svg";

link.click();

}
