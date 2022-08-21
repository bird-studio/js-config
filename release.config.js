const commitConfig = require("./lib/commit.config");

module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        config: "conventional-changelog-gitmoji-config",
        releaseRules: [{ scope: "xxx", release: "patch" }],
      },
    ],
    // [
    //   "@semantic-release/commit-analyzer",
    //   {
    //     preset: "conventionalcommits",
    //     releaseRules: commitConfig.map((v) => ({
    //       type: v.value,
    //       release: v.release,
    //     })),
    //   },
    // ],
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
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
};
