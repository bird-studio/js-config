const base = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        config: "conventional-changelog-gitmoji-config",
        releaseRules: [{ scope: "x.x.o", release: "patch" }],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        config: "conventional-changelog-gitmoji-config",
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
