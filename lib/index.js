module.exports = {
  commitConfig: require("./commit.config"),
  releaseConfig: require("./release.config"),
  jestConfig: {
    node: require("./jestConfig/node.config"),
  },
  interactiveMessageConfig: require("./interactive-message.config"),
};
