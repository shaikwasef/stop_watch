// Declare targets for each element
var timer = document.getElementById("timer");
var start = document.getElementById("start");
var lap = document.getElementById("lap");
var reset = document.getElementById("reset");
var timer_box = document.getElementById("timer_box");


//Set inital counters for time
var seconds = 0 ;
var minutes = 0;
var hours = 0 ;
var time = "00:00:00";

//text to display in each block
start.innerHTML = "START";
lap.innerHTML = "LAP";
reset.innerHTML = "RESET";

//inital timer display
timer.innerHTML = time;

//event listener for start button - triggers clock with stopper function
start.addEventListener("click",stopper);



//state of the start button after clicking start
function start_state(){
	start.innerHTML = "START"; 
	start.style.backgroundColor = "green";
	reset.style.cursor = "pointer";
	reset.addEventListener("click",resetter); // Now reset can be clicked to reset timer
}

// state of the start button after clicking stop
function stop_state(){
	start.innerHTML = "STOP";
	start.style.backgroundColor = "RED";
	reset.style.cursor = "not-allowed";
	reset.removeEventListener("click",null); // click event on reset is removed
}

//count clicks on start button
var start_click = 0;
var time_element ;


function stopper(){
	start_click += 1;
	if (start_click%2 == 1){
		stop_state();
		time_element = window.setInterval(start_timer,1000); 
	}else{
		start_state();
		window.clearInterval(time_element);
	}
}

function resetter(){
	window.clearInterval(time_element);
	timer.innerHTML = "00:00:00";
	seconds = 0;
	minutes =0;
	hours = 0;
}


// function called to start timer
function start_timer(){
	var seconds_display , hours_display , minutes_display;

	seconds += 1 ;

	if(seconds%60 == 0){
		minutes +=1 ; 
		seconds = 0;
	}

	if(minutes%60==0 && seconds%60 == 0){
		hours += 1;
		minutes = 0;
		hours += 1;
	}

	seconds_display = "0"+ seconds.toString();
	seconds_display = seconds_display.slice(-2);

	minutes_display = "0"+ minutes.toString();
	minutes_display = minutes_display.slice(-2);

	hours_display = "0"+ hours.toString();
	hours_display = hours_display.slice(-2);

	time = hours_display + ":" + minutes_display +":"+ seconds_display ; 

	timer.innerHTML = time;
}


var scroll_lap = document.createElement("div");
timer_box.append(scroll_lap);
scroll_lap.style.width = "400px";
scroll_lap.style.height = "400px";
scroll_lap.style.border = "2px solid green";
scroll_lap.style.position = "absolute";
scroll_lap.style.top = "300px";
scroll_lap.style.margin = "auto";
scroll_lap.style.display = "flex";
scroll_lap.style.overflow = "auto";
scroll_lap.style.flexDirection = "column-reverse";

lap.addEventListener("click",lap_list);

function lap_list(){
	var list = document.createElement("div");
	scroll_lap.append(list);
	list.style.width = "inherit";
	list.style.height = "150px" ;
	list.style.border = " 3px transparent";
	list.style.borderBottom = "3px solid black";
	list.style.display = ""
	list.innerHTML = time ;
}