"use strict";
function fullName(first, last) {
    return first + " " + last;
}
console.log(fullName("Ali", "Mohamed"));
function registerUser(username, isAdmin, language = "en") {
    console.log(`Username: ${username}, Is Admin: ${isAdmin}, Language: ${language}`);
}
registerUser("alinaasir");
registerUser("ahmed", true, "so");
function average(...scores) {
    if (scores.length === 0)
        return 0;
    let sum = scores.reduce((total, current) => total + current, 0);
    return sum / scores.length;
}
console.log(average(80, 90, 100));
console.log(average(70, 85, 90, 95, 100));
