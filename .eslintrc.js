const fs = require('fs')

const getConfig = () => ({
  'parser':  '@typescript-eslint/parser',
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  'plugins': [
    'import'
  ],
  'parserOptions':  {
    'ecmaVersion':  2018,
    // Allows for the use of imports
    'sourceType':  'module'
  },
  'rules':  {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'args': 'none' }],
    '@typescript-eslint/member-delimiter-style': ['warn', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    "semi": "off",
    "@typescript-eslint/semi": ['warn', 'never'],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['warn', 'single', { 'allowTemplateLiterals': true }],
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'import/no-restricted-paths': ['error', { 'zones': buildRestrictedPaths() }]
  }
})

const buildRestrictedPaths = () => {
  const modules = fs.readdirSync(__dirname + '/src').filter(path => (
      !path.endsWith('.ts') && !path.endsWith('.js') && path !== 'app' &&
      fs.lstatSync(__dirname + '/src/' + path).isDirectory()
  ))

  return modules.map(module => {
    switch (module) {
      case 'shared': return { 'target': './src/shared', 'from': './src', 'except': [ './shared' ] }
      case 'core': return { 'target': `./src/core`, 'from': './src', 'except': [ './core', './shared' ] }
      default: return { 'target': `./src/${module}`, 'from': './src', 'except': [ `./${module}`, './core', './shared' ] }
    }
  })
}

module.exports = getConfig()
