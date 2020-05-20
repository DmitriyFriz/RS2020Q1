### What is TypeScript

TypeScript is a strongly typed language which can be used to build web applications. It come with a special compiler that converts the strongly typed language into JavaScript so it can run in a traditional browser. TypeScript may be used to develop JavaScript applications for both client-side and server-side execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.
TypeScript was first made public in October 2012 (at version 0.8), after two years of internal development at Microsoft. It was designed by Anders Hejlsberg (designer of C#) at Microsoft.

### Features of TypeScript

- **TypeScript is just JavaScript.** TypeScript starts with JavaScript and ends with JavaScript. Typescript adopts the basic building blocks of your program from JavaScript. Hence, you only need to know JavaScript to use TypeScript. All TypeScript code is converted into its JavaScript equivalent for the purpose of execution.
- **TypeScript supports other JS libraries.** Compiled TypeScript can be consumed from any JavaScript code. TypeScript-generated JavaScript can reuse all of the existing JavaScript frameworks, tools, and libraries.
- **JavaScript is TypeScript.** This means that any valid .js file can be renamed to .ts and compiled with other TypeScript files.
- **TypeScript is portable.** TypeScript is portable across browsers, devices, and operating systems. It can run on any environment that JavaScript runs on. Unlike its counterparts, TypeScript doesn’t need a dedicated VM or a specific runtime environment to execute.

**TypeScript adds support for features such as classes, modules, and an arrow function syntax as defined in the ECMAScript 2015 standard.**

### Basic types of TypeScript

- **Boolean:** A Boolean value holds two states, either true of false
- **Number:** A Number represents any numerical value.
- **String:** A string represents any textual, alphanumeric data.
- **Array:** An array is a collection of multiple types.
- **Tuple:** A Tuple is an array with a fixed number of elements. Since they have a fixed number of elements, they may be more memory efficient. You might use this for a list of states in the US, as one example.
- **Enum:** An Enum type is like a numerical array, but allows you to provide descriptive names to each number value. 
- **Any:** The any type means that this variable can contain any type. This is how we are used to dealing with values in JavaScript. It can be useful in certain situations such as dynamic function arguments or an array that contains mixed type values.
- **Void:** The void type is the opposite of any. It represents the absence of a type. You wouldn’t use this for the value of a variable, but may use it as the return type of a function.
- **Null and Undefined:** In TypeScript, both undefined and null actually have their own types named undefined and null respectively. Much like void, they’re not extremely useful on their own.
- **Never:** The never type represents the type of values that never occur. For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns; Variables also acquire the type never when narrowed by any type guards that can never be true.
- **Your Class:** You can create your own custom class if you need to.

### Components of TypeScript

1. **Language** − It comprises of the syntax, keywords, and type annotations.
2. **The TypeScript compiler (TSC)** transform the TypeScript program equivalent to its JavaScript code. It also performs the parsing, and type checking of our TypeScript code to JavaScript code.
3. **The language service** provides information which helps editors and other tools to give better assistance features such as automated refactoring and IntelliSense. It exposes an additional layer around the core-compiler pipeline. It supports some standard typical editor operations like code formatting and outlining, colorization, statement completion, signature help, etc.

### Start work with Typescript 

1. For NPM users install Typescript: _npm install -g typescript_
2. At the command line, run the TypeScript compiler: _tsc yourFile.ts_
The result will be a file _yourFile.js_ which contains the same JavaScript that you fed in.

### TypeScript Advantages

- TypeScript is an open-source language with continuous development and maintenance by Microsoft.
- TypeScript runs on any browser or JavaScript engine.
- TypeScript is similar to JavaScript and uses the same syntax and semantics. All of TypeScript's code finally gets converted into JavaScript. This allows a quicker learning curve for front-end developers currently coding in JavaScript.
- TypeScript is also closer in syntax to back-end languages like Java and Scala. This helps backend developers write front-end code faster.
- TypeScript code can be called from an existing JavaScript code. TypeScript also works with existing JavaScript frameworks and libraries without any issues.
- The TypeScript Definition file, with .d.ts extension, provides support for existing JavaScript libraries like Jquery, D3.js, etc. So, TypeScript code can add JavaScript libraries using type definitions to avail the benefits of type-checking, code autocompletion, and documentation in existing dynamically-typed JavaScript libraries.
- TypeScript has support for the latest JavaScript features from ECMAScript 2015 i.e the language specification for JavaScript. It includes features from ES6 and ES7 that can run in ES5-level JavaScript engines like Node.js. This offers a massive advantage of using features from future JavaScript versions in current JavaScript engines.
- TypeScript has easy integration with task runner tools like Grunt and Gulp to automate the workflow.


