// with a class we define a blueprint to create obkects with specific properties
class Car {
    brand: string;
    model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    showDetails(): void {
        console.log(`Brand: ${this.brand}, Model: ${this.model}`);
    }
}

const car = new Car('Toyota', 'Camry');
car.showDetails(); // Output: Brand: Toyota, Model: Camry

// in ts we have access modifiers like public, private, protected
// by default all properties are public
// public properties can be accessed from anywhere
// private properties can only be accessed within the class
// protected properties can be accessed within the class and its subclasses

class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor() {
        super('Dog'); // with super we call the constructor of the parent class
    }

    getName() {
        return this.name;
    }
}

let animal = new Animal('Generic Animal');
let dog = new Dog();

console.log(dog.getName());

// readonly properties cannot be changed once they are initialized
class SecondCar {
    readonly brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }
}

const secondCar = new SecondCar('Honda');
// secondCar.brand = 'Ford'; // Error: Cannot assign to 'brand' because it is a read-only property

// can be defined static properties or methods
// class can be abstract (can't be instantiated but can be extended)
// getter and setter to control access to properties
// possibility to implement more than one interface

abstract class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    show(): void {
        console.log(`${this.name}`);
    }

    abstract greet(): void;
}

// const person = new Person('John Doe'); !ERROR: Cannot create an instance of an abstract class

// if we extend abstract class we have to implement ALL abstract methods
class Employee extends Person {
    department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    greet(): void {
        console.log(`Hello, my name is ${this.name} and I work in ${this.department}`);
    }
}

// now we can instantiate Employee class
const employee = new Employee('Jane Smith', 'IT');
employee.greet(); // Output: Hello, my name is Jane Smith and I work in IT
employee.show(); // Output: Jane Smith

// an interface is a contract that specifies the properties and methods that a class must implement
interface SecondPerson {
    name: string;
    surname: string;
    age?: number;

    greet(): void;
}

// we MUST implement all properties and methods defined in the interface
class Student implements SecondPerson {
    name: string;
    surname: string;
    age: number;

    constructor(name: string, surname: string, age: number) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    greet(): void {
        console.log(`Hello, my name is ${this.name} ${this.surname} and I am ${this.age} years old.`);
    }
}

let student = new Student('John', 'Doe', 25);
student.greet(); // Output: Hello, my name is John Doe and I am 25 years old.

// with interfaces we can also create a firm for a function, useful for API that expects certain parameters
interface SearchFunction {
    (search_query: string): boolean;
}

let mySearch: SearchFunction;
mySearch = function(query: string): boolean {
    // implementation of the search logic goes here
    return true;
}

// interface can be extended
interface Shape {
    color: string;
}

interface Trace {
    weight: number;
}

interface Square extends Shape, Trace {
    side: number;
}

let square = <Square>{};
square.color = 'blue';
square.side = 10;

// the difference between interfaces and abstract classes is that interfaces can only be implemented, not extended and in the interface we write the contract of methods and properties, abstract classes can be extended and implemented, but in the abstract class we write the logic of methods and properties

// we can define an interface of an array
// define an array that must be an array of numbers
interface NumberArray {
    [index: number]: number;
}

let myArray: NumberArray = [1, 2, 3, 4];
console.log(myArray[0]); // Output: 1

// we can declare two interfaces with the same name but different properties, but when we declare a variable that has this interface, we must provide all properties
interface Box {
    height: number;
}

interface Box {
    width: number;
}

let box: Box = { height: 10, width: 5 };