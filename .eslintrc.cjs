module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  globals: {
    vi: "readonly",
    describe: "readonly",
    it: "readonly",
    expect: "readonly",
    beforeEach: "readonly",
    afterEach: "readonly",
  },
  ignorePatterns: ["dist", "coverage", "node_modules"],
  rules: {
    "react/prop-types": "off",
  },
};
