//**Declarations**//
//Declare vars needed in parse logic
var nucleotides = ['A','C','G','T','U'];
var aminos = ["G","A","L","M","F","W","K","Q","E","S","P","V","I","C","Y","H","R","N","D","T"];
var useNucleotides;
var indicies = new Array(6);
var allGood;

//Declare vars needed for calculate
var matchScore = 4;
var mismatchScore = -3;
var indelScore = -2;
var node = {xpos:0, ypos:0, northWest:0, northEast:0, southWest:0, southEast:0};
var NW = 0;
var NE = 0;
var SW = 0;
var SE = 0;



//**ParseString(String)**//
//takes a string, and based off the bool "useNucleotides", checks compatibility of the string 
//If input is good, returns JSON Object representation of inputString
//If input is bad, changes bool "allGood" to false and prints error message to cmnd line
function parseString(inputString) {

	inputString = inputString.toUpperCase();
	var splitInputString = inputString.split('');	
	var splitInputStringLen = splitInputString.length;

	for (var i = 0; i < splitInputStringLen; i ++){
		console.log(splitInputString[i]);
		//check if user selected nucleotides or amino acids
		if (useNucleotides==true){
			//loop hrough nucleotides
			for (var j = 0; j < 5; j++){
				//compare each element of input to each element of nucleotides.
				//Returns 0 at some index of nucleotides if match, else all -1s

				indicies[j] = (inputString[i].indexOf(nucleotides[j]));
			}
			//Check indicies array for 0's. If none exist, then there is incorrect input
			if (indicies.indexOf(0) == -1){
				console.log("BAD INPUT")
				allGood = false;
			}
		}

		else {
			for (var j = 0; j < 20; j++){
				//Returns 0 at some index of nucleotides if match, else all -1s
				//populate indicies array with indicies of aminos if they exist
				indicies[j] = (inputString[i].indexOf(aminos[j]));
			}
			//Check indicies array for 0's. If none exist, then there is incorrect input
			if (indicies.indexOf(0) == -1){
				console.log("BAD INPUT")
				allGood = false;
			}
		}
	}
  return JSON.stringify(splitInputString); 
}



//**calculate(String, String)**//
// Takes in two strings, and creates a 2d array of the form [side][top] with dimenstions [2side+1][2top+1]
// Does all computation of NW alg based on vars matchScore, mismatchScore, indelScore 
// Converts to JSON object described in dataFormat.txt

function calculate(topString, sideString) {
  // TODO: this is the master function to build the JSON described in dataFormate.txt
  //Needs to take in 2 strings of input, then run through the full NW alg, returning a best path (as an array of nodes)
  //Needs to calculate each node (box) and its NW, NE, SW, SE values and their location (pair of coords)

  //idea: create 2d array of pure scores then split up into boxes later
  //THE LAYOUT IS [SideCol][TopCol] 
  var topArrayLen = (topString.length *2)+1;
  var sideArrayLen = (sideString.length *2)+1;
  var indexCounter = 0;
  var indexCounterII = 0;
  var nodeXCounter = 0;
  var nodeYCOunter = 0;
  var nodeArrCounter = 0;

  //Create scoring matrix
  var scoresArr = new Array(sideArrayLen);
  for (var i = 0; i < sideArrayLen; i++)
  	scoresArr[i] = new Array(topArrayLen);

  //Create node array for easier exporting
  var nodesArr = new Array(sideString.length * topString.length);


  //*Begin to populate array*//
  scoresArr [0][0] = 0;

  //Fill top and side arrays
  //Both are 2 elements per nucleotide /  amino acid
  for (var i = 1; i < sideArrayLen; i++){
  	if (i % 2 == 1){
  		scoresArr[i][0] = scoresArr[i-1][0] + indelScore;
  		scoresArr[i+1][0] = scoresArr[i-1][0] + indelScore;
  	}
  	  else
  	  	continue;
  }

  for (var i = 1; i < topArrayLen; i++){
  	if (i % 2 == 1){
  		scoresArr[0][i] = scoresArr[0][i-1] + indelScore;
  		scoresArr[0][i+1] = scoresArr[0][i-1] + indelScore;
  	}
  	else
 	  	continue;
  }


  for (var i = 1; i < topArrayLen; i++){
  	for (var j = 1; j < sideArrayLen; j++){
  		scoresArr[i][j]=0;
  		//NW Corner selected when i & j are odd
  		//Scoring: compare nucleotides, if match add matchScore to score of NW box (SW corner of box [i-1],[j-1])
  		if (i % 2 == 1){
  			if (j % 2 == 1){
  				indexCounter = i / 2;
  				indexCounterII = j /2;
  				if(topString.charAt(indexCounterII)==sideString.charAt(indexCounter)){
  					scoresArr[i][j] = scoresArr[i-1][j-1] + matchScore;
  				}
  				else{
  					scoresArr[i][j] = scoresArr[i-1][j-1] + mismatchScore;
  				}
  			}
  		}

  		//NE Corner Selected when i is odd and j is even
  		//Scoring: add indelScore to SW score of box due N
  		if (i % 2 == 1){
  			if (j % 2 == 0){
  				scoresArr[i][j] = scoresArr[i-1][j] + indelScore;
  			}
  		}

  		//SW corner selected when i is even and j is odd
  		//Scoring: add indelScore to SW score of box due W
  		if (i % 2 == 0){
  			if (j % 2 == 1){
  				scoresArr[i][j] = scoresArr[i][j-1] + indelScore;
  			}
  		}

  		//SE Corner selected when i & j are even
  		//Scoring: take best score in box
  		if (i % 2 == 0){
  			if (j % 2 == 0){

  				NW = scoresArr[i-1][j-1];
  				NE = scoresArr[i-1][j];
  				SW = scoresArr[i][j-1];
  				SE = Math.max(NW,NE,SW);
  				scoresArr[i][j] = SE;


  				//load data into node -> nodeArr[]
  				nodeArrCounter ++;

  				nodeXCounter = (j / 2) - 1;
  				nodeYCounter = (i / 2) - 1;

  				node.xpos = nodeXCounter;
  				node.ypos = nodeYCounter;
  				node.northWest = NW;
  				node.northEast = NE;
  				node.southWest = SW;
  				node.southEast = SE;
  				nodesArr[nodeArrCounter] = node;

  				node = {};
  			}
  		}
  	} 
  }

  //Logic for calculating path
  //Create path array, populated by coord pairs starting with bottom corner
  //Not the most efficient, but whatever
  var pathArr = new Array(sideString.length + topString.length);
  pathArr[0] = [nodesArr[(nodesArr.length -1)].xpos, nodesArr[(nodesArr.length -1)].ypos];

  //var k = 0;
  for (var i = topString.length + sideString.length; i > 0 ; i--){ 
  	
  
  	//x && y coords of 3 options in order: diag, left, up

  	var option1XCoord = (pathArr[0][0]) -1;
  	var option1YCoord = (pathArr[0][1]) -1;
  	var option2XCoord = (pathArr[0][0]) -1;
  	var option2YCoord = (pathArr[0][1]);
  	var option3XCoord = (pathArr[0][0]);
  	var option3YCoord = (pathArr[0][1]) -1;

  	if (i < topString.length + sideString.length){
  		option1XCoord = (nodesArr[topIndex].xpos) -1;
  		option1YCoord = (nodesArr[topIndex].ypos) -1;
  		option2XCoord = (nodesArr[topIndex].xpos) -1;
  		option2YCoord = (nodesArr[topIndex].ypos);
  		option3XCoord = (nodesArr[topIndex].xpos);
  		option3YCoord = (nodesArr[topIndex].ypos) -1;
  	}


  	var option1Score = 0;
  	var option2Score = 0;
  	var option3Score = 0;

  	var option1index = 0;
  	var option2index = 0;
  	var option3index = 0;
  	var topIndex = 0;

  	//get each coord's score
  	for (var j = nodesArr.length -1; j > 0; j--){
  		if (nodesArr[j].xpos == option1XCoord && nodesArr[j].ypos == option1YCoord){
  			option1index = j;
  			option1Score = nodesArr[j].southEast;
  		}	
  		if (nodesArr[j].xpos == option2XCoord && nodesArr[j].ypos == option2YCoord){
  			option2index = j;
  			option2Score = nodesArr[j].southEast;
  		}
  		if (nodesArr[j].xpos == option3XCoord && nodesArr[j].ypos == option3YCoord){
  			option3index = j;
  			option3Score = nodesArr[j].southEast;
  		}
  	}



  	//Find highest score & load to pathArr
  	var maxScore = Math.max(option1Score, option2Score, option3Score);
  	if (maxScore == option1Score){
  		pathArr[i] = [nodesArr[option1index].xpos, nodesArr[option1index].ypos];
  		topIndex = option1index;
  		//k++;
  	}
  	if (maxScore == option2Score){
  		pathArr[i] = [nodesArr[option2index].xpos, nodesArr[option2index].ypos];
  		topIndex = option2index;
  		//k++;

  	}
  	if (maxScore == option3Score){
  		pathArr[i] = [nodesArr[option3index].xpos, nodesArr[option3index].ypos];
  		topIndex = option3index;
  		//k++;
  	}



  	//needs contitional for hitting [0,0] to break loop

  	 
  }  

  	console.log("Possible coords:", option1XCoord, option1YCoord, option2XCoord, option2YCoord, option3XCoord, option3YCoord);
  	console.log("OPTION 1 INDEX", option1index);
  	console.log("OPTION 2 INDEX", option2index);
  	console.log("OPTION 3 INDEX", option3index);
  	console.log("OPTION 1 SCORE: ", option1Score);
  	console.log("OPTION 2 SCORE: ", option2Score);
  	console.log("OPTION 3 SCORE: ", option3Score);
  	console.log("MAXIMUM SCORE: ", maxScore);
  	console.log("K: " , k);




  //Testing
  console.log("\n Scores Arr \n", scoresArr);
  //console.log(" \n top string and top arr len: ", topString, topArrayLen);
  //console.log("side string and side arr len: ", sideString, sideArrayLen);
  //console.log(" \n NW, NE, SW, SE vals: ", NW, NE, SW, SE);

  console.log("\n Nodes Arr \n", nodesArr);
  console.log("\n Path Arr \n", pathArr);
}

module.exports = calculate;



//Testing
var testInputString = 'ACGCC';
var testInputStringII = 'AGCGT';
var useNucleotides = true;

//parseString(testInputString);
calculate(testInputString,testInputStringII);

