let str = "aPPLe";

sortCapitalIndex(str);
sortLowerCaseIndex(str);

function sortCapitalIndex(str){
	let captialLettersArray = new Array();
	let char = "";
		for(let i = 0; i<str.length; i++) {
			char = str.charAt(i);
			if(char == char.toUpperCase()) {
				captialLettersArray.push(i);
			}
		}
	console.log("UpperCase Index: " +captialLettersArray);
}

function sortLowerCaseIndex(str){
	let LowerCaseLettersArray = new Array();
	let char = "";
		for(let i = 0; i<str.length; i++) {
			char = str.charAt(i);
			if(char == char.toLowerCase()) {
				LowerCaseLettersArray.push(i);
			}
		}
	console.log("LowerCase Index: "+LowerCaseLettersArray );
}