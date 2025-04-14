import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginQuery from "eslint-plugin-query";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            eslintConfigPrettier,
            reactPlugin.configs.flat.recommended,
        ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            react: reactPlugin,
            "@tanstack/query": eslintPluginQuery,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "react/jsx-key": "error",
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "react/no-unescaped-entities": "error",
            "react/prop-types": "error",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "no-console": "error",
        },
    }
);
