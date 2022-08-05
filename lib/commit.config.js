module.exports = [
  {
    value: "feat",
    description: "新機能",
    release: "minor",
  },
  { value: "fix", description: "バグ修正", release: "patch" },
  {
    value: "tweak",
    description: "雑多な修正",
    release: "patch",
  },
  {
    value: "refactor",
    description: "リファクタ",
    release: false,
  },

  { value: "doc", description: "ドキュメント関連", release: false },
  {
    value: "test",
    description: "テスト関連",
    release: false,
  },
  {
    value: "ci",
    description: "CI関連",
    release: false,
  },
  { value: "wip", description: "作業中", release: false },
  { value: "rip", description: "削除", release: false },
  {
    value: "break",
    description: "破壊的変更",
    release: "major",
  },
];
