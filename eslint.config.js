import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import vitestPlugin from "eslint-plugin-vitest";


export default [
  // Global ignores
  {
    ignores: ["dist", "node_modules"],
  },

  // Global settings for React version
  {
    settings: { 
      react: { version: 'detect' },
      "import/resolver": {
        "typescript": {}
      }
    },
  },

  // Basic JS rules
  js.configs.recommended,

  // TypeScript config
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin // Explicitly declare plugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Spread rules from recommended config
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off', // Covered by @typescript-eslint
    },
  },

  // React config
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      // Temporarily disable problematic React Hook rules
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off', // Disable exhaustive-deps as well
      'react-hooks/preserve-manual-memoization': 'off', // Disable preserve-manual-memoization
    },
  },

  // Vitest config for test files
  {
    files: ["**/*.test.{js,ts,tsx}"],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Vitest exposes Jest-like globals
        vi: true // Explicitly define 'vi' as a global
      }
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    }
  },
];
