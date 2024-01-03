module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'typescript-sort-keys',
    'unused-imports',
    'prettier',
    'prefer-arrow',
    'sort-class-members',
  ],
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
    'sort-class-members/sort-class-members': [
      'error',
      {
        order: [
          '[static-properties]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[static-methods]',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      },
    ],
    'react/prop-types': 'off', // Disable react/prop-types rule
    'arrow-body-style': 'off', // Disable arrow-body-style rule
  },
};
