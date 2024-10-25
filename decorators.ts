// T extends (args any) means that T is generic and extend funcionts that can accept any arguments of any type.
// target is the object on which the method is defined
// propertyKey is the name of the method being decorated
// descriptor is an object that describes a property of an object, in this context descriptor contains info of the decorated method 
function LogMethodCalls<T extends (...args: any[]) => any>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: Parameters<T>): ReturnType<T> {
        console.log(`Chiamata al metodo: ${propertyKey} con parametri: ${JSON.stringify(args)}`);

        const result = originalMethod!.apply(this, args);

        console.log(`Risultato del metodo: ${propertyKey}: ${JSON.stringify(result)}`);
        return result;
    } as T;

    return descriptor;
}

class Calculator {
    @LogMethodCalls
    add(a: number, b: number): number {
        return a + b;
    }
    @LogMethodCalls
    multiply(a: number, b: number): number {
        return a * b;
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3));
console.log(calc.multiply(10, 2));