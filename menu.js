$(window).on('resize load', function(e){
	if(window.innerWidth < 500){
		document.getElementById("credits").style.bottom = "50px";
	}
	else{
		document.getElementById("credits").style.bottom = "20px";
	}
});

/* View in fullscreen */
function openFullscreen() {
	//console.log("the function starts");
	elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
  	//console.log("Is Chrome");
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
	elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}


function homeToPlayMenu(){
	document.getElementById("homePage").style.display = "none";
	document.getElementById("playMenu").style.display = "table-cell";
}

function setLeveL(getLevel) {
	level = getLevel;
	if (level == 1) {
		document.getElementById("difficultyLabel").innerHTML = "Difficulty : Easy";
	}
	else if (level == 2) {
		document.getElementById("difficultyLabel").innerHTML = "Difficulty : Medium";
	}
	else if (level == 3) {
		document.getElementById("difficultyLabel").innerHTML = "Difficulty : Hard";
	}
}

function playMenuToGame(){
	openFullscreen();
	document.getElementById("playMenu").style.display = "none";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("scoreBoard").style.display = "table-cell";
	/*From the other file*/
	canvasInit();
	initGame();
}

function gameToPlayMenu(){
	closeFullscreen();
	document.getElementById("playMenu").style.display = "table-cell";
	document.getElementById("canvas").style.display = "none";
	document.getElementById("scoreBoard").style.display = "none";
	document.getElementById("score").innerHTML = "Score : 0";
	clearInterval(timingFunction);
}

function playMenuToHome(){
	document.getElementById("homePage").style.display = "block";
	document.getElementById("playMenu").style.display = "none";
}

function homeToHighScores() {
	document.getElementById("homePage").style.display = "none";
	document.getElementById("highScorePage").style.display = "block";
	var target = document.getElementById("highScoreInnerDiv");
	

	target.innerHTML = "";

	//console.log(highScores.length);
	//console.log(localStorage.getItem("Shooter" + 0));

	for (var i = 0; i < highScores.length; i++) {
		var element = document.createElement("P");
		element.innerHTML = "" + (i + 1) + " : " + highScores[i];
		target.appendChild (element);
		//console.log("appending");
	}

}

function highScoreToHome(){
	document.getElementById("homePage").style.display = "block";
	document.getElementById("highScorePage").style.display = "none";
}

function homeToAbout(){
	document.getElementById("homePage").style.display = "none";
	document.getElementById("aboutPage").style.display = "block";
}

function aboutToHome(){
	document.getElementById("homePage").style.display = "block";
	document.getElementById("aboutPage").style.display = "none";
}

function finalScoreToPlayMenu(){
	closeFullscreen();
	document.getElementById("playMenu").style.display = "table-cell";
	document.getElementById("finalScore").style.display = "none";
}

$(window).on('load', function(e) {

	document.getElementById("playMenu").style.display = "none";
	document.getElementById("canvas").style.display = "none";
	document.getElementById("scoreBoard").style.display = "none";

	//console.log(localStorage.getItem("Shooter0"));

	for (var i = 0; i < 10; i++) {
		if (localStorage.getItem("Shooter" + i) === null) {
			break;
		}
		else{
			highScores.push(localStorage.getItem("Shooter" + i));
			//console.log(highScores[i]);
		}
	}

});