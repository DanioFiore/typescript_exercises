// in ts we can create custom classes for errors that extends built-in Error class to have more specific errors. Like this we can have a better error handling.

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}

function validateUser(user: any) {
    if (!user.name) {
        throw new ValidationError("The field 'name' is required");
    }
    // Other validations...
}

try {
    validateUser({}); // Pass an empty object
} catch (error) {
    if (error instanceof ValidationError) {
        console.error("Validation Error:", error.message);
    } else {
        console.error("Unexpected Error:", error);
    }
}

try {
    // Code that can throw errors
    throw new DatabaseError("Connection failed to the database.");
} catch (error) {
    if (error instanceof DatabaseError) {
        console.error("Errore del database:", error.message);
    } else if (error instanceof ValidationError) {
        console.error("Validation Error:", error.message);
    } else {
        console.error("Errore non gestito:", error);
    }
}

// Errors propagation, can happen in asynchronous code
async function fetchData(url: string): Promise<any> {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        // Proppagation to the caller
        throw new NetworkError("Error while fetching data.");
    }
}
async function processData() {
    try {
        let data = await fetchData("https://api.example.com/data");
        // Elaboration...
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network Error:", error.message);
        } else {
            console.error("Generic Error:", error);
        }
    }
}

// example of error handling in express.js using a middleware
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Middleware to catch errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        res.status(400).send(err.message);
    } else if (err instanceof DatabaseError) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send("Internal server error");
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000! :)');
});

class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}