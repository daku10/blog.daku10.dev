import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsEsLintPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import tsEsLintParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: [".next/**", "out/**"],
  },
  {
    plugins: {
      "@typescript-eslint": tsEsLintPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parser: tsEsLintParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsEsLintPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...tsEsLintPlugin.configs["strict-type-checked"].rules,
      ...tsEsLintPlugin.configs["stylistic-type-checked"].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/self-closing-comp": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
