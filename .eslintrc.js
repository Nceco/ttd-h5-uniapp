module.exports = {
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended" //让eslint使用prettier规则
  ],
  globals: { uni: true, wx: true },
  rules: {
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "vue/multi-word-component-names": "off"
  },
  env: {
    es6: true,
    browser: true,
    node: true
  }
  // parserOptions: {
  //     parser: 'babel-eslint'
  // }
};
