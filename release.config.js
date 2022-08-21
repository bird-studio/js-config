// const commitConfig = require("./lib/commit.config");

const x = [
  {
    scope: "x.x.x",
    release: false,
  },
  {
    scope: "x.x.o",
    release: "patch",
  },
];

module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        config: "conventional-changelog-gitmoji-config",
        releaseRules: x,
      },
    ],
    // [
    //   "@semantic-release/release-notes-generator",
    //   {
    //     config: "conventional-changelog-gitmoji-config",
    //     presetConfig: {
    //       types: x.map((v) => ({
    //         type: v.scope,
    //         section: v.scope,
    //         hidden: false,
    //       })),
    //     },
    //   },
    // ],
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
        config: "conventional-changelog-gitmoji-config",
      },
    ],
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
};
