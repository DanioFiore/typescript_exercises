import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/app.ts", // our input file
    output: {
        file: "dist/main.js",
        format: "iife", // browser-friendly (IIFE)
        sourcemap: true // enable sourcemaps for debugging, so if we debug, we can see the TypeScript code and not the compiled JavaScript
    },
    plugins: [typescript()]
}