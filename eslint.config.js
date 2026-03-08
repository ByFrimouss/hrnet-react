import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // Variable déclarée mais jamais utilisée
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      // Evite les console.log oubliés
      "no-console": "warn",
      // Vérifie les règles des Hooks React
      "react-hooks/rules-of-hooks": "error",
      // Vérifie les dépendances des useEffect
      "react-hooks/exhaustive-deps": "warn",
      // Pas besoin d'importer React en React 17+
      "react/react-in-jsx-scope": "off",
      // Désactive le warning de compatibilité TanStack Table avec React Compiler
      "react-hooks/react-compiler": "off",
      // Désactive le warning de compatibilité des bibliothèques tierces avec React Compiler
      "react-hooks/incompatible-library": "off",
    },
  },
]);
