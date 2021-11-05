module.exports = {
  commitConfig: require("./commit.config"),
  releaseConfig: require("./release.config"),
  jestConfig: {
    nodeJest: require("./jestConfig/nodeJest.config"),
  },
  interactiveMessageConfig: require("./interactive-message.config"),
};
