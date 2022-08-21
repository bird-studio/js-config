const commitConfig = require("./commit.config");

const base = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        parserOpts: {
          headerPattern:
            /^(?::\w*:|(?:\ud83c[\udf00-\udfff])|(?:\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55])\s(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))\s?(?<ticket>#\d*)?$/,
          headerCorrespondence: ["type", "scope", "subject", "ticket"],
        },
        releaseRules: commitConfig.map((v) => ({
          type: v.value,
          release: v.release,
        })),
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
