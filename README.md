# TypeScript macros

The goal of the project is to implement a macro system in TypeScript. This project will run as a preprocessor and transform the code and expand all macros. This will go in a tsrc folder by default. TypeScript proper would run after that on the transformed code and compile that to JavaScript. 

The project will support three types of macros:
- Function macros (a la C) where bits of syntax captured as arguments are expanded according to the definition. Depending on the type of argument to the macro, syntax can be flexible or restricted to certain types.
- Definition macro which is applied to a function definition. Takes the function definition as input and processes it to return a modified function definition. Similar to applying a function macro to a function definition. Used for things like eliminating tail recursion. 
- Class macro which is applied to a class definition. Takes a class definition as input and expects one as output. Used for things like synthesizing JSON serialization methods for a class. 

The goal is to first start off implementing functions that use the TypeScript API directly to modify the AST, but afterward introduce syntactic sugar. 

Currently, a challenge with the TypeScript Compiler API is that it doesn't resolve references and inputs. So any useful macro system would have to a) provide a way to do that and b) implement one for its own use. 

One potential solution to the reference problem is to force macros to live in separate files and magically inject them, but that doesn't feel right. Maybe temporarily. 