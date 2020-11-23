module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  settings: {
    react: { version: '16.7' },
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    curly: 2,
    'no-var': 2,
    'prefer-const': 2,
    'dot-notation': ['error', { allowPattern: '^_' }],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'object-shorthand': 'error',
    'arrow-body-style': 2,
    eqeqeq: 2,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-inferrable-types': [
      'warn',
      {
        ignoreParameters: true,
      },
    ],
    'react/self-closing-comp': 2,
    'react/jsx-tag-spacing': ['error'],
    'no-unused-expressions': 2,
  },
};
