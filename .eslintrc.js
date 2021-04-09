module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: { version: '16.7' },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],

  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['src/**/*'],
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/react',
        'prettier/@typescript-eslint',
      ],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
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
    'prefer-template': 1,
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
