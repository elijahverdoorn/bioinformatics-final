//Declare vars needed in parse logic
var nucleotides = ['A','C','G','T','U'];
var aminos = ["G","A","L","M","F","W","K","Q","E","S","P","V","I","C","Y","H","R","N","D","T"];
var useNucleotides;
var indicies = new Array(6);
var allGood;

//Parse Input
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
			}
		}
	}
  return JSON.stringify(splitInputString); 
}

// Here we do the math for the matrix

function calculate(topString, sideString) {
  // TODO: this is the master function to build the JSON described in dataFormate.txt
  console.log(topString);
}

module.exports = calculate;



//Test parseString
var testInputString = 'abcdefghijklmnopqrstuvwxyz';
var useNucleotides = false;
parseString(testInputString);

//var testOut = parseString(testInputString);
//console.log(testOut);