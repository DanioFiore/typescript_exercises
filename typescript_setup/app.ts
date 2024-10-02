// Intersection type combine different types
interface BusinessPartner {
    name: string;
    credit: number;
}

interface Identity {
    id: number;
    name: string;
}

type Employee = BusinessPartner & Identity;
let employee: Employee = {
    id: 1,
    name: "John Doe",
    credit: 1000,
}

// Union type combine different types
type alphanumeric = string | number;
let input: alphanumeric;
input = 1;
input = "John Doe";

// literal type
let click_event: "click" | "dblclick";
click_event = "click";

// Type guards (type predicates)
// x is number is a special return type that checks if the type of x is "number"
function isNumber(x: any): x is number {
    return typeof x === "number";
}

if (isNumber(123)) {
    console.log("Input is a number");
}

class Bird {
    fly() {
        console.log("Bird is flying");
    }
}

class Fish {
    swim() {
        console.log("Fish is swimming");
    }
}

function move(animal: Bird | Fish) {
    // type guard for objects
    if (animal instanceof Bird) {
        animal.fly();
    } else {
        animal.swim();
    }
}

// Types Assertions
let user_input = document.getElementById("user-input") as HTMLInputElement; // or <HTMLInputElement>document.getElementById("user-input")!
if (user_input) {
    user_input.min = '0';
}
