module.exports = {
  commitConfig: require("./commit.config").commitConfig,
  releaseConfig: require("./release.config").releaseConfig,
  interactiveMessageConfig: require("./interactive-message.config")
    .interactiveMessageConfig,
  esLintConfig: require("./eslint.config").eslintConfig,
};
