// optional parameters
function sayHi(name: string, greeting?: string): string {
    return `${greeting || 'Hi there!'} ${name}!`;
}

console.log(sayHi('Alice')); // Output: Hi there! Alice!
console.log(sayHi('Bob', 'Bonjour')); // Output: Bonjour Bob!

// default parameters
function greet(name: string = 'Guest', greeting: string = 'Hello'): string {
    return `${greeting} ${name}!`;
}

console.log(greet()); // Output: Hello Guest!
console.log(greet('Alice')); // Output: Hello Alice!

// overloading
// the third function is only used to write the body of the function, is not consider an overload. Thanks to that, TypeScript can automatically detect the correct function to call based on the provided arguments.
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    return a + b;
}
console.log(add(1, 2)); // Output: 3
console.log(add('Hello', ' World')); // Output: Hello World
// console.log(add(true, false)); ERROR! because in the thirs we only define the body of the first two functions.

// to a var, we can assign a function to it, a function type
let greetFunction: (name: string, greeting?: string) => string;
greetFunction = (name, greeting) => {
    return `${greeting || 'Hi there!'} ${name}!`;
}
console.log(greetFunction('Alice')); // Output: Hello Alice!

// rest parameter, to use in functions that accept an arbitrary number of arguments.
// after the chief parameter, all the others must be an array of strings, whichever number.
function greetAll(chief: string, ...names: string[]): string {
    return chief + " " + names.join(', ') + ' have arrived!';
}
console.log(greetAll('Alice', 'Bob', 'Charlie')); // Output: Alice, Bob, Charlie have arrived!
// spread operator, to use in functions that accept an array as an argument