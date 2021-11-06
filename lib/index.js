module.exports = {
  commitConfig: require("./commit.config"),
  releaseConfig: require("./release.config"),
  jestConfig: {
    node: require("./jestConfig/node.config"),
    nextJs: require("./jestConfig/nextJs.config"),
  },
  interactiveMessageConfig: require("./interactive-message.config"),
  nextConfig: require("./next.config"),
  babelConfig: require("./babel.config"),
};
