/*Global Variables*/
var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');
var level = 1;
var timer;
var timingFunction;
var xIncrement, yIncrement;
var targetCoordinates = [];
var targetStatus = [
[false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false]
];
var sight = [0,0]; //x,y;
var sightInnerRadius, sightOuterRadius;
//var canvasData;
var targetRadius;
var score;
var scoreDisplay = document.getElementById("score");
var targetsDisplay = document.getElementById("targets");
var numberOfTargets;
var highScores = [];
var sightColor = "#50f442";

/*Mouse Move*/
canvas.onmousemove = function(){
	sight[0] = event.clientX;     // Get the horizontal coordinate
	sight[1] = event.clientY;     // Get the vertical coordinate
	//var coor = "X coords: " + sight[0] + ", Y coords: " + sight[0];
	//console.log(coor);
	showSight();
};

/*Mouse Click*/
canvas.onclick = function(){
	/*Checks whether the target lies inside any circle*/
	var x,y,d;
	for (var i = 0; i < targetCoordinates.length; i++) {
		x = xIncrement * (targetCoordinates[i][0] + 1) - sight[0];
		x *= x;
		y = yIncrement * (targetCoordinates[i][1] + 1) - sight[1];
		y *= y;
		d = x + y;
		if(d > Math.pow(targetRadius,2)){
			//console.log("Outside the circle");
		}
		else{
			//console.log("Inside the circle");
			clearInterval(timingFunction);
			if(numberOfTargets <= 100){
				sightColor = "red";
				showSight();
				setTimeout(function(){ sightColor = "#50f442"; showSight();}, 400);
				resetTargets();
				timingFunction = setInterval(resetTargets, timer);
				score += (10 * level);
				scoreDisplay.innerHTML = "Score : " + score;
			}
			break;
		}
	}
};

$(window).on('resize load', function(e) {

	if (window.innerHeight > window.innerWidth) {
		if (canvas.style.display != "none") {
			alert("Please rotate screen and try again");
			//gameEnd();
			gameToPlayMenu();
		}
	}

	

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - $('#scoreBoard').outerHeight(true);

	xIncrement = Math.floor(window.innerWidth/9);
	yIncrement = Math.floor(window.innerHeight/4);

	canvasInit();
	displayAllTargets();

});



/*Initialization*/
function canvasInit() {
	canvasContext.fillStyle = "silver";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function initGame(){

	if (window.innerHeight > window.innerWidth) {
		alert("Please rotate screen and try again");
		//gameEnd();
		gameToPlayMenu();
		return;
	}

	if(highScores.length > 0){
		document.getElementById("highScore").innerHTML = "Highest Score : " + highScores[0];
	}

	targetCoordinates = [];
	targetRadius = Math.floor(yIncrement / 2 - yIncrement * 0.2)
	targetStatus = [
	[false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false]
	];
	if (level == 3){
		timer = 1000;//ms
		getNewTarget();
	}
	else if (level == 2) {
		timer = 3000;//ms
		getNewTarget();
		getNewTarget();
		getNewTarget();
	}
	else{
		timer = 5000;//ms
		getNewTarget();
		getNewTarget();
		getNewTarget();
		getNewTarget();
		getNewTarget();
	}
	//canvasData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
	timingFunction = setInterval(resetTargets, timer);
	//console.log("targetCoordinates at 0 are");
	//console.log(targetCoordinates[0][0]);
	//console.log(targetCoordinates[0][1]);
	//console.log();
	sightOuterRadius = Math.floor(targetRadius * 0.8);
	sightInnerRadius = Math.floor(sightOuterRadius * 0.3);

	score = 0;
	scoreDisplay.innerHTML = "Score : " + score;
	numberOfTargets = 1;
	targetsDisplay.innerHTML = "Targets : " + numberOfTargets + "/100";
}



/*Timing and score*/

function resetTargets(){
	numberOfTargets++;
	targetsDisplay.innerHTML = "Targets : " + numberOfTargets + "/100";
	if (numberOfTargets == 101) {
		gameEnd();
	}
	var coordinates;
	canvasInit();
	if (level == 3){
		hideTarget();
		//canvasInit();
		getNewTarget();

	}
	else if (level == 2) {
		hideTarget();
		hideTarget();
		hideTarget();
		//canvasInit();
		getNewTarget();
		getNewTarget();
		getNewTarget();
	}
	else{
		hideTarget();
		hideTarget();
		hideTarget();
		hideTarget();
		hideTarget();
		//canvasInit();
		getNewTarget();
		getNewTarget();
		getNewTarget();
		getNewTarget();
		getNewTarget();
	}
	//canvasData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
	showSight();
}


/*Targets*/

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getNewTarget(){
	var coor = [];
	var x, y;

	while(true){
		x = getRandomInt(0,8);
		y = getRandomInt(0,3);
		if(!targetStatus[y][x]){
			targetStatus[y][x] = true;
			coor.push(x);
			coor.push(y);
			targetCoordinates.push(coor);
			//console.log(x);
			//console.log(y);
			showTarget(xIncrement * (x + 1), yIncrement * (y + 1), targetRadius);
			break;
		}
	}
}

function displayAllTargets() {
	for (var i = 0; i < targetCoordinates.length; i++) {
		showTarget(xIncrement * (targetCoordinates[i][0] + 1), yIncrement * (targetCoordinates[i][1] + 1), targetRadius);
	}
}

function showTarget(x,y,r){

	/*Outer Circle*/
	canvasContext.beginPath();
	canvasContext.fillStyle = "white"
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(x, y, r, 0, 2 * Math.PI);
	canvasContext.fill();

	/*2nd circle*/
	canvasContext.beginPath();
	canvasContext.fillStyle = "red"
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(x, y, Math.floor(r*0.8), 0, 2 * Math.PI);
	canvasContext.fill();

	/*3rd circle*/
	canvasContext.beginPath();
	canvasContext.fillStyle = "white"
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(x, y, Math.floor(r*0.6), 0, 2 * Math.PI);
	canvasContext.fill();

	/*4th circle*/
	canvasContext.beginPath();
	canvasContext.fillStyle = "red"
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(x, y, Math.floor(r*0.35), 0, 2 * Math.PI);
	canvasContext.fill();
}

function hideTarget(){
	coordinates = targetCoordinates.pop();
	hideTargetUtil(xIncrement * (coordinates[0] + 1), yIncrement * (coordinates[1] + 1), targetRadius);
	targetStatus[coordinates[1]][coordinates[0]] = false;
}

function hideTargetUtil(x,y,r){
	/*Outer Circle*/
	canvasContext.beginPath();
	canvasContext.fillStyle = "silver"
	canvasContext.strokeStyle = "silver"
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(x, y, r, 0, 2 * Math.PI);
	canvasContext.fill();
	canvasContext.stroke();
}

/*Sight*/
function showSight(){
	canvasInit();
	displayAllTargets();
	//canvasContext.putImageData(canvasData, 0, 0);

	canvasContext.fillStyle = sightColor;
	canvasContext.strokeStyle = sightColor;
	canvasContext.lineWidth = 3;

	canvasContext.beginPath();
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(sight[0], sight[1], sightInnerRadius, 0, 2 * Math.PI);
	canvasContext.fill();

	canvasContext.beginPath();
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(sight[0], sight[1], sightOuterRadius, 0.3490658504, 1.2217304764);
	canvasContext.stroke();

	canvasContext.beginPath();
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(sight[0], sight[1], sightOuterRadius, 1.9198621772, 2.7925268032);
	canvasContext.stroke();

	canvasContext.beginPath();
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(sight[0], sight[1], sightOuterRadius, 3.490658504, 4.36332313);
	canvasContext.stroke();

	canvasContext.beginPath();
	/*x,y,r,start angle,end angle where angles are in radians*/
	canvasContext.arc(sight[0], sight[1], sightOuterRadius, 5.0614548308, 5.9341194568);
	canvasContext.stroke();

	canvasContext.lineWidth = 0;
}

/*Other Functions*/
function gameEnd(){
	clearInterval(timingFunction);

	/*Displaing the final score*/
	document.getElementById("finalScore").style.display = "table-cell";
	document.getElementById("canvas").style.display = "none";
	document.getElementById("scoreBoard").style.display = "none";
	document.getElementById("finalScoreParagraph").innerHTML = "Final Score: " + score;

	highScores.push(score);
	highScores.sort(function(a, b){return b-a});

	if(highScores.length > 10){
		highScores.pop();
	}

	var j = 0;
	for (var i = 0; i < highScores.length; i++) {
		if(j == 10){
			break;
		}

		if (localStorage.getItem("Shooter" + i) === null) {
			
		}
		else{
			localStorage.removeItem("Shooter" + i);
			//console.log("Deleted");
			//console.log(localStorage.getItem("Shooter" + i));
			//console.log("-----------------");
		}

		localStorage.setItem("Shooter" + i, highScores[i]);
		//console.log("gameEnd loop");
		j++;
	}
}
