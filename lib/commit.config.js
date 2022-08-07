module.exports = [
  {
    value: "xxx",
    description: "リーリース対象外",
    release: false,
  },
  {
    value: "xxo",
    description: "軽微な修正",
    release: "patch",
  },
  {
    value: "xox",
    description: "新機能などの機能追加",
    release: "minor",
  },
  {
    value: "oxx",
    description: "破壊的変更",
    release: "major",
  },
];
