class Counter {
    count = 0;
    increment() {
        this.count++;
    }
}

const counter = new Counter();
console.log(counter.count); // Output: 0
counter.increment();
console.log(counter.count); // Output: 1