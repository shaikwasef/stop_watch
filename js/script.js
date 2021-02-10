// Declare targets for each element
var timer = document.getElementById("timer");
var start = document.getElementById("start");
var lap = document.getElementById("lap");
var reset = document.getElementById("reset");

//Set inital counters for time
var seconds = 0 ;
var minutes = 0;
var hours = 0 ;

//text to display in each block
start.innerHTML = "START";
lap.innerHTML = "LAP";
reset.innerHTML = "RESET";

//inital timer display
timer.innerHTML = "00:00:00";

//event listener for start button - triggers clock with stopper function
start.addEventListener("click",stopper);



//state of the start button after clicking start
function start_state(){
	start.innerHTML = "START";
	start.style.backgroundColor = "green";
	reset.style.cursor = "pointer";
	reset.addEventListener("click",resetter);
}

function stop_state(){
	start.innerHTML = "STOP";
	start.style.backgroundColor = "RED";
	reset.style.cursor = "not-allowed";
	reset.removeEventListener("click",null);
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



function start_timer(){
	var seconds_display , hours_display , minutes_display , time;

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