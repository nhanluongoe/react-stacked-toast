module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': 'error',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
    'prefer-arrow/prefer-arrow-functions': 'off',
    'react/prop-types': 'off', // Disable react/prop-types rule
    'arrow-body-style': 'off', // Disable arrow-body-style rule
    'global-require': 'off', // Disable global-require rule
    'react/no-array-index-key': 'warn', // Disable react/no-array-index-key rule
    'import/no-relative-packages': 'off', // Disable import/no-relative-parent-imports rule
    'jsx-a11y/anchor-is-valid': 'off', // Disable jsx-a11y/anchor-is-valid rule
  },
  ignorePatterns: ['/site'], //ignore document site directory
};
