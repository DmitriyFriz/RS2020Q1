module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      "experimentalObjectRestSpread": true
    }
  },
  rules: {
    "no-plusplus": "off",
    "eqeqeq": "off",
    "import/extensions" : "off",
    "no-use-before-define": "off",
    "no-alert": "off",
    "max-len": ["error", { "code": 170 }]
  },
};

