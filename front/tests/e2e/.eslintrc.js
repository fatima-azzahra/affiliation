module.exports = {
  plugins: [
    'cypress',
  ],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    strict: 'off',
    no-mixed-spaces-and-tabs:0
  },
}
