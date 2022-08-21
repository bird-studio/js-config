module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        config: "conventional-changelog-gitmoji-config",
        releaseRules: [
          {
            scope: "x.x.x",
            release: false,
          },
          {
            scope: "x.x.o",
            release: "patch",
          },
          {
            scope: "x.o.x",
            release: "minor",
          },
          {
            scope: "o.x.x",
            release: "major",
          },
        ],
      },
    ],
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
