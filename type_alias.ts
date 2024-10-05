// advantages -> flexibility and componibility
// disvantages -> not extendible and not support merging

type Age = number;
type RGB = [number, number, number];

// union type
type StringOrNumber = string | number;

const user_age: Age = 25;
const color: RGB = [255, 0, 0];
const string: StringOrNumber = "Hello, World!";
const number: StringOrNumber = 123;

type Point = {
    x: number;
    y: number;
}

// intersaction type
type PointLabel = Point & {label: string};
let point: PointLabel = {x: 10, y: 20, label: "Point A"};

// interface Point {
//     x: number;
//     y: number;
// }

// at this point interface or type have the same result
let coords: Point = {
    x: 10,
    y: 20,
}

// but which use? Let's see the interface:
// advantages -> extendability and support merging
// disadvantages -> not flexible in some context and not good for union and intersection types

// choose between type and interface
// 1 if you predict to extend the type in the future, use interface
// 2 Alyas fit better for union and intersection types
// 3 Consistency and integration: to guarantee type safety and consistency in a project or for an external API, use interface
// 4 alias and interface can be used together

// we can create an alias that combines two interfaces
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    side_length: number;
}

type Shape = Circle | Square;

function calculateArea(shape: Shape) {
    if (shape.kind === "square") {

    } else {

    }
}