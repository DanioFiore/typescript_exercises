// allows us to create components that can be used with differents types instead of a single type
// for example we can use generics in: typized collections like array, polimorphic functions, typized API.
// type T = generic type

// generic interface
interface Box<T> {
    content: T;
}

let box: Box<string> = { content: 'hello' };
let box2: Box<number> = { content: 10 };

function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}
getFirstElement([1, 2, 3]);

interface hasLength {
    length: number;
}
// like this we have a constraint. in getLength function we excpect any type but the constraint is that the type MUST have a length property.
function getLength<T extends hasLength>(arg: T): number {
    return arg.length;
}
// OK
getLength("hello");
getLength([1, 2, 3]);
getLength({ length: 4 });
// ERROR
// getLength(1); 

// more complex generic interface
interface CacheElement<T> {
    get(key: string): T;
    set(key: string, value: T): void;
}

// conditional generic types
// if T extends number, then return number, otherwise return string
type NumberOrString<T> = T extends number ? number : string;
const a: NumberOrString<number> = 10;
const b: NumberOrString<string> = 'hello';
// ERROR
// const c: NumberOrString<boolean> = true;

interface APIResponse<T = string> {
    data: T;
    status: number;
}
// if we don't pass a generic value, the by default data must be a string
const response: APIResponse = { data: 'hello', status: 200 };
// if we pass a generic value, the data type will be the passed value, in this case number
const response2: APIResponse<number> = { data: 10, status: 200 };

function getLastElement<T>(arr: T[]): T | undefined {
    if (arr.length == 0) return undefined;
    return arr[arr.length - 1];
}

const numbers = [1, 2, 3];
const lastNumber = getLastElement(numbers);
const arr = [1, 'b', true, { name: 'John' }, [1, 2, 3]];
const last = getLastElement(arr);

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' }
]
const lastUser = getLastElement(users);

// why don't use any? because with any we can known the type returned of a method because can be any type. Let's see an any example
class Queue {
    private elements: any[] = [];

    enqueue(element: any): void {
        this.elements.push(element);
    }

    dequeue(): any {
        return this.elements.shift();
    }

    peek(): any {
        return this.elements[0];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

// we can see that we can pass everything we want, so we can't foresee the type of the elements in the queue.
const queue = new Queue();
queue.enqueue('hello');
queue.enqueue(10);
queue.enqueue({ name: 'John' });

// let's restructure the Queue class to use generics
class QueueGeneric<T> {
    private elements: T[] = [];

    enqueue(element: T): void {
        this.elements.push(element);
    }

    dequeue(): T | undefined {
        return this.elements.shift();
    }

    peek(): T | undefined {
        return this.elements[0];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

const queue2 = new QueueGeneric<number>();
queue.enqueue(1);
queue.enqueue(10);
queue.enqueue(100);

interface Task {
    id: number;
    description: string;
}

const taskQueue = new QueueGeneric<Task>();
taskQueue.enqueue({ id: 1, description: 'Task 1' });