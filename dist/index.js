"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript = __importStar(require("typescript"));
var process = __importStar(require("process"));
function macro(f) {
    return f;
}
exports.macro = macro;
var MacroPackage = 'typescript-macros';
function startsWith(a, b) {
    return a.slice(0, b.length) === b;
}
function compile(filenames, options) {
    var program = typescript.createProgram(filenames, options);
    var files = program.getSourceFiles();
    files.forEach(function (file) {
        if (!startsWith(file.fileName, 'testsrc/'))
            return;
        console.log('\n\n\n\n', file.fileName);
        var actualBody = [];
        file.forEachChild(function (node) {
            if (typescript.isFunctionDeclaration(node)) {
                console.log('fun!', node.name && typescript.isIdentifier(node.name) ? node.name.escapedText : node);
                if (node.decorators != null) {
                    for (var _i = 0, _a = node.decorators; _i < _a.length; _i++) {
                        var deco = _a[_i];
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
