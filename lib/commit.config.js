module.exports = [
  {
    value: "x.x.x",
    // eslint-disable-next-line no-useless-escape
    _value: `x\.x\.x`,
    description: "リーリース対象外",
    release: false,
  },
  {
    value: "x.x.o",
    // eslint-disable-next-line no-useless-escape
    _value: `x\.x\.o`,
    description: "軽微な修正",
    release: "patch",
  },
  {
    value: "x.o.x",
    // eslint-disable-next-line no-useless-escape
    _value: `x\.o\.x`,
    description: "新機能などの機能追加",
    release: "minor",
  },
  {
    value: "o.x.x",
    // eslint-disable-next-line no-useless-escape
    _value: `o\.x\.x`,
    description: "破壊的変更",
    release: "major",
  },
];
