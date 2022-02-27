module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 13
  },
  plugins: ['vue', 'html', 'prettier', 'jest'],
  rules: {
    'no-console': 1,
    'no-debugger': 2,
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 2
  }
};
