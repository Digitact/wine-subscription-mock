module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'esnext',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: true,
    },
    env: {
        es6: true,
        browser: true,
        commonjs: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'prettier', 'react'],
    extends: [
        'prettier',
        'eslint:recommended',
        "plugin:react/jsx-runtime",
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    rules: {
        'import/no-unresolved': 'error',
        'no-console': 0,
        'prettier/prettier': 'warn',
        '@typescript-eslint/ban-types': ['warn'],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
        'import/order': [
            'error',
            {
                'newlines-between': 'never',
                alphabetize: { order: 'ignore' },
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'unknown'],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};
