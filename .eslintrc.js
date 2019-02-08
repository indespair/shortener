module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-var": 2,
    'prettier/prettier': 2,
    'no-return-await': 2,
    'one-var': [2, 'never'],
  },
}
