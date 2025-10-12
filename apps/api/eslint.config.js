import { config } from '@repo/eslint-config/base';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
    ...config,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,ts}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json'
            },
            globals: {
                node: true
            }
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: eslintPluginPrettier
        },
        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            'prettier/prettier': 'error'
        }
    },
    {
        ignores: ['build/**/*', 'node_modules/**/*', '.turbo/**/*']
    }
];
