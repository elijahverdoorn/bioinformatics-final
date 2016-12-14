//Declare vars needed in parse logic
var nucleotides = ['A','C','G','T','U'];
var aminos = ["G","A","L","M","F","W","K","Q","E","S","P","V","I","C","Y","H","R","N","D","T"];
var useNucleotides;
var indicies = new Array(6);
var allGood;

//Declare vars needed for calculate
var matchScore = 2;
var mismatchScore = 0;
var indelScore = -1;
var scoreBox = {xpos:0, ypos:0, northEast:0, northWest:0, southEast:0, southWest:0};



//ParseString(String)
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



//calculate(String, String)
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

  //Create matrix
  var scoresArr = new Array(sideArrayLen);
  for (var i = 0; i < sideArrayLen; i++)
  	scoresArr[i] = new Array(topArrayLen);
  

  //Begin to populate array
  scoresArr [0][0] = 0;
  //scoresArr [0][1] = 0;
  //scoresArr [1][0] = 0;
  //scoresArr [1][1] = 0;

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
  		scoresArr[i][j]=00;
  		//NW Corner selected when i & j are odd
  		if (i % 2 == 1){
  			if (j % 2 == 1){
  				scoresArr[i][j] = 1;
  			}
  		}

  		//NE Corner Selected when i is odd and j is even
  		if (i % 2 == 1){
  			if (j % 2 == 0){
  				scoresArr[i][j] = 2;
  			}
  		}

  		//SW corner selected when i is even and j is odd
  		if (i % 2 == 0){
  			if (j % 2 == 1){
  				scoresArr[i][j] = 3;
  			}
  		}

  		//SE Corner selected when i & j are even
  		if (i % 2 == 0){
  			if (j % 2 == 0){
  				scoresArr[i][j] = 4;
  			}
  		}


  	} 
  }


  //Testing
  console.log(scoresArr);
  console.log(topString, topArrayLen);
  console.log(sideString, sideArrayLen);

}

module.exports = calculate;



//Testing
var testInputString = 'ACCGT';
var testInputStringII = 'ACGGT';
var useNucleotides = true;

//parseString(testInputString);
calculate(testInputString,testInputStringII);

var testOut = parseString(testInputString);
console.log(testOut);