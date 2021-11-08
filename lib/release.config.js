const commitConfig = require("./commit.config");

const base = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: commitConfig.map((v) => ({
          type: v.value,
          release: v.release,
        })),
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: commitConfig.map((v) => ({
            type: v.value,
            section: v.value,
            hidden: false,
          })),
        },
      },
    ],
  ],
};

module.exports = {
  github: {
    ...base,
    plugins: [...base.plugins, "@semantic-release/github"],
  },
  npm: {
    ...base,
    plugins: [
      ...base.plugins,
      "@semantic-release/github",
      "@semantic-release/npm",
      "@semantic-release/git",
    ],
  },
};
