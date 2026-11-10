"use strict";
function echo(input) {
    return input;
}
console.log(echo("Hello TypeScript")); // String
console.log(echo(42)); // Number
console.log(echo([1, 2, 3])); // Array
console.log(echo({ name: "Ali", age: 25 })); // Object
// Using string:
const stringResult = {
    status: "success",
    data: "User data loaded successfully"
};
// 2. Using object (id and name):
const objectResult = {
    status: "success",
    data: { id: 1, name: "Ahmed" }
};
console.log(stringResult, objectResult);
// First Element Function
function first(items) {
    return items[0];
}
//Array of numbers
const firstNumber = first([10, 20, 30]);
console.log(firstNumber); // 10
// Array of strings
const firstString = first(["Apple", "Banana", "Cherry"]);
console.log(firstString); // "Apple"
// Array of objects
const firstObject = first([
    { id: 1, title: "Post One" },
    { id: 2, title: "Post Two" }
]);
console.log(firstObject);
