/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    complexity: ["error", 10],
  },
  overrides: [
    {
      files: [".eslintrc.js", "*.config.js"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
};
