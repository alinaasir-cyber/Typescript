"use strict";
let productName = "Laptop Pro";
let price = 1200;
let discountAvailable = true;
productName = "Wireless Mouse";
function getDiscount(price, discount) {
    return price - (price * discount);
}
const finalPrice = getDiscount(1000, 0.15);
console.log(finalPrice);
function printLength(x) {
    console.log(x.length);
}
printLength("Hello");
