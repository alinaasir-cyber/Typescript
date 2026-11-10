let productName: string = "Laptop Pro";
let price: number = 1200;
let discountAvailable: boolean = true;

productName = "Wireless Mouse";

function getDiscount(price: number, discount: number): number {
    return price - (price * discount);
}


const finalPrice = getDiscount(1000, 0.15);
console.log(finalPrice);



function printLength(x: string | any[]) {
    console.log(x.length);
}


printLength("Hello");
