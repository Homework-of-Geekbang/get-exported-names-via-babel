const babelParser = require('@babel/parser')
const fs = require('fs')
const path = require('path')
require('core-js/features/array/flat')

fs.readFile(path.join(__dirname, './sample.js'), 'utf-8', (err, data) => {
  const ast = babelParser.parse(data, {
    sourceType: 'module'
  })
  // fs.writeFileSync(path.join(__dirname, './ast.json'), JSON.stringify(ast, null, 2))
  const exportNamedDeclarations = ast.program.body.filter(node => node.type === 'ExportNamedDeclaration')
    .map(node => {
      if (node.declaration === null && node.specifiers.length) {
        return node.specifiers.map(sub => {
          return sub.exported.name
        })
      } else if (node.declaration.type === 'VariableDeclaration') {
        return node.declaration.declarations[0].id.name
      } else if (node.declaration.type === 'FunctionDeclaration') {
        return node.declaration.id.name
      } else {
        throw new Error('Unknown Declaration type')
      }
    })

  console.log('Exported names:\n' + exportNamedDeclarations.flat(1).join(', '))
})
