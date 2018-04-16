import * as typescript from 'typescript';
import * as process from 'process';

export function macro(f: any): any {
  return f;
}

const MacroPackage = 'typescript-macros'

function startsWith(a: string, b: string): boolean {
  return a.slice(0, b.length) === b;
}

function compile(filenames: string[], options: typescript.CompilerOptions) {
  let program = typescript.createProgram(filenames, options);
  let files = program.getSourceFiles();
  files.forEach((file) => {
    if (!startsWith(file.fileName, 'testsrc/')) return;
    console.log('\n\n\n\n',file.fileName);
    const actualBody = [];
    file.forEachChild((node) => {
      if (typescript.isFunctionDeclaration(node)) {
        console.log('fun!', node.name && typescript.isIdentifier(node.name) ? node.name.escapedText : node);
        if (node.decorators != null) {
          for (const deco of node.decorators) {
            console.log('@', deco.expression);
          }
        }
        console.log(node);
      }
      // console.log('hello', node);
    });
  });
}

compile(process.argv.slice(2), {
    noEmitOnError: true, noImplicitAny: true,
    target: typescript.ScriptTarget.ES5, module: typescript.ModuleKind.CommonJS
});