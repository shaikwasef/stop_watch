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
var time = "00:00:00"; //set time display string to 00:00:00
var init_time = "00:00:00"; // init-time records previous time for lap method

//text to display in each block
start.innerHTML = "START";
lap.innerHTML = "LAP";
reset.innerHTML = "RESET";

//inital timer display
timer.innerHTML = time;

//event listener for start button - triggers clock with stopper function
start.addEventListener("click",start_watch);
//Event listener for lap button
lap.addEventListener("click",lap_list)

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

// ID for setInterval method
var time_element ;

// stopper function executed after clicking start
function start_watch(){
	start_click += 1;
	if (start_click%2 == 1){
		stop_state();
		time_element = window.setInterval(start_timer,1000); 
	}else{
		start_state();
		window.clearInterval(time_element);
	}
}

//reset function executed on clicking reset
function resetter(){
	window.clearInterval(time_element);
	timer.innerHTML = "00:00:00";
	init_time = "00:00:00"
	time = "00:00:00";
	seconds = 0;
	minutes =0;
	hours = 0;
}


// function start_timer for setInterval
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

//Scroll element added via Jscript 
var scroll_lap = document.createElement("div");
timer_box.append(scroll_lap);
scroll_lap.className = "scroll_lap";


var time_difference ; // Value to display using lap
var list_node = null ; // node initiated with null ,  to conduct the flow of lap times from top to bottom

function lap_list(){
	var list = document.createElement("div");
	scroll_lap.insertBefore(list,list_node); // Insert lap times from top to bottom
	list_node = list; // reset list_node to present list
	list.className = "list"; // set class name of list to list
	time_difference =  ("00" + String(parseInt(time.slice(-8,-6) - init_time.slice(-8,-6)))).slice(-2)+ ":" + ("00" + String(parseInt(time.slice(-5,-3) - init_time.slice(-5,-3)))).slice(-2)+ ":" +("00" + String(parseInt(time.slice(-2) - init_time.slice(-2)))).slice(-2);
	list.innerHTML =  time_difference;
	init_time = time;
}

