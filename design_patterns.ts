// conditional type
type IsNumber<T> = T extends number ? true : false;

type FirstRes = IsNumber<string>; // false
type SecondRes = IsNumber<number>; // true

// mapped types | create new type by iterating in through already existing type
type ReadOnlyType<T> = {
    readonly [P in keyof T]: T[P];
}

type Original = {
    a: number, 
    b: number
}

type ReadOnlyOriginal = ReadOnlyType<Original>; // { readonly a: number, readonly b: number }
const ORIGINAL: Original = { a: 1, b: 2 };
ORIGINAL.a = 3;
const READ_ONLY_ORIGINAL: ReadOnlyOriginal = ORIGINAL;
// READ_ONLY_ORIGINAL.a = 4; Error: Cannot assign to 'a' because it is a read-only property.

// utility types
// partial | transform all properties of a type to be optional
interface Todo {
    title: string;
    description: string;
}

type PartialTodo = Partial<Todo>; // PartialTodo has now optional properties title and description

// readonly | transform all properties of a type to be read-only, so they cannot be edited after initialization
interface Todo2 {
    title: string;
}

const todo: Readonly<Todo2> = { title: "Delete inactive users" };

// Record<K, T> | create a type with a set of properties K of type T
type Page = "home" | "about" | "contact";
type PageInfo = { title: string };

const pages: Record<Page, PageInfo> = {
    home: { title: "Home Page" },
    about: { title: "About Us" },
    contact: { title: "Contact Us" }
};

// example of factory pattern
// common interface for a document viewer
interface DocumentViewer {
    open(): void;
    close(): void;
}

class TextViewer implements DocumentViewer {
    open() { console.log("Opening a text document..."); }
    close() { console.log("Closing the text document."); }
}

class SpreadsheetViewer implements DocumentViewer {
    open() { console.log("Opening a spreadsheet document..."); }
    close() { console.log("Closing the spreadsheet document."); }
}

class PresentationViewer implements DocumentViewer {
    open() { console.log("Opening a presentation document..."); }
    close() { console.log("Closing the presentation document."); }
}

// factory to create document viewers based on document types
class ViewerFactory {
    static createViewer(documentType: string): DocumentViewer {
        switch (documentType) {
            case "text":
                return new TextViewer();
            case "spreadsheet":
                return new SpreadsheetViewer();
            case "presentation":
                return new PresentationViewer();
            default:
                throw new Error("Unsupported document type.");
        }
    }
}

// use the factory
const viewer = ViewerFactory.createViewer("spreadsheet");
viewer.open(); // Output: Opening a spreadsheet document...
viewer.close(); // Output: Closing the spreadsheet document.

// example singletone pattern
class AppConfig {
    private static instance: AppConfig;
    private settings: { [key: string]: string | number } = {};

    private constructor() {}

    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }

    public setSetting(key: string, value: string | number): void {
        this.settings[key] = value;
    }

    public getSetting(key: string): string | number {
        return this.settings[key];
    }
}

// use singletone for managing application configuration
const config = AppConfig.getInstance();
config.setSetting('apiUrl', 'https://api.example.com');
config.setSetting('retryAttempts', 5);

// access to the same instance in different parts of the application
const sameConfig = AppConfig.getInstance();
console.log(sameConfig.getSetting('apiUrl')); // Output: https://api.example.com
console.log(sameConfig.getSetting('retryAttempts')); // Output: 5
