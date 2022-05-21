"use strict";

// The name string contains multiple spaces and tabs,
// and may have multiple spaces between first and last names.
var names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ";
var output = ["---------- Original String\n", names + "\n"]; // Prepare two regular expression patterns and array storage.
// Split the string into array elements.
// pattern: possible white space then semicolon then possible white space

var pattern = /\s*;\s*/;
var nameList = names.split(pattern);
pattern = /(\w+)\s+(\w+)/;
var bySurnameList = [];
output.push("---------- After Split by Regular Expression");
var i, len;

for (i = 0, len = nameList.length; i < len; i++) {
  output.push(nameList[i]);
  bySurnameList[i] = nameList[i].replace(pattern, "$2, $1");
} // Display the new array.


output.push("---------- Names Reversed");

for (i = 0, len = bySurnameList.length; i < len; i++) {
  output.push(bySurnameList[i]);
} // Sort by last name, then display the sorted array.


bySurnameList.sort();
output.push("---------- Sorted");

for (i = 0, len = bySurnameList.length; i < len; i++) {
  output.push(bySurnameList[i]);
}

output.push("---------- End");
console.log(output.join("\n"));