import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next/core-web-vitals", "eslint:recommended", "prettier"),

    rules: {
        curly: "warn",
        "block-scoped-var": "warn",
        eqeqeq: "warn",
        "no-var": "warn",
        "prefer-const": "warn",
        "eol-last": "warn",
        "prefer-arrow-callback": "warn",

        "no-restricted-properties": ["error", {
            object: "describe",
            property: "only",
        }, {
                object: "it",
                property: "only",
            }],
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],
    extends: compat.extends("plugin:@typescript-eslint/recommended-type-checked"),

    languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "eol-last": "off",
        "require-await": "warn",
        "n/no-missing-import": "off",
        "n/no-unsupported-features/es-syntax": "off",
        "n/no-missing-require": "off",
        "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

        "@typescript-eslint/no-explicit-any": ["error", {
            fixToUnknown: true,
        }],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
        }],

        "@typescript-eslint/consistent-type-imports": ["error", {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
        }],

        "import/consistent-type-specifier-style": ["warn", "prefer-inline"],

        "@typescript-eslint/no-misused-promises": ["warn", {
            checksVoidReturn: false,
        }],

        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-object-type": "off",
    },
}]);
