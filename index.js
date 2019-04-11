const recast = require('recast');
const types = require('ast-types');
const tsParser = require("recast/parsers/typescript")

const source = `
        let about = document.createElement('about');
        about.logo = 'logo';
        about.version = '1.0.0';
        about.app = 'My App';
`;

let componentName = ''

const ast = recast.parse(source, {
    parser: tsParser
  });


types.visit(ast, {
    visitVariableDeclaration: function(path) {

        if (path.value.kind === 'let') {
            types.visit(ast, {
                visitVariableDeclarator: function(path) {

                    componentName = path.value.id.name
                    return false;
                    }
            })
        }

        return false;
    }
});

console.log('script returns the component name:    ' + componentName)