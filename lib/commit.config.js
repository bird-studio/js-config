module.exports = [
  {
    value: "xxx",
    description: "x.x.x: リリース無し",
    release: false,
  },
  {
    value: "xxo",
    description: "x.x.o: patch",
    release: "patch",
  },
  {
    value: "xox",
    description: "x.o.x: minor",
    release: false,
  },
  {
    value: "oxx",
    description: "o.x.x: major",
    release: "major",
  },
];
