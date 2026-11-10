"use strict";
const myUser = { username: "alinaasir", password: "secretpassword" };
login(myUser);
function login(user) {
    console.log(`User: ${user.username}, Email: ${user.email ?? "Not provided"}`);
}
login({ username: "ali", password: "123" });
login({ username: "fatima", password: "456", email: "fatima@example.com" });
const userObj = { id: 1, username: "ahmed", password: "123" };
console.log(userObj.id);
