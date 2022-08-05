const commitConfig = require("./lib/commit.config");

const { plugin } = require("@bird-studio/interactive-message");

const notSelected = { description: "_NotSelected_", value: "" };

const gitmoji = plugin.gitmoji.gitmojis.map((v) => ({
  description: `${v.emoji} ${v.description}`,
  value: v.code,
}));

/**
 * https://github.com/octokit/rest.js/
 */
const fetchMyIssues = () =>
  plugin.github
    .fetchIssues({
      owner: "bird-studio",
      repo: "js-config",
      state: "open",
    })
    .then((r) =>
      r.data
        .filter((v) => !v.pull_request)
        .map((issue) => ({
          description: `#${issue.number}: ${issue.title}`,
          value: `${issue.number}`,
        }))
    )
    .then((v) => [notSelected, ...v])
    .catch(() => [notSelected]);

const typoDic = plugin.typo.makeDictionary({ langCode: "en_US" });
const typoValidate = (p) => {
  const r = plugin.typo.toAns(typoDic.suggest(p));
  if (r === true) {
    return r;
  }
  return `typo? ${r}`;
};

/**
 * @type {import('@bird-studio/interactive-message').Setting}
 */
module.exports = {
  template: `{{type}}: {{gitmoji}} {{subject}} Close #{{issue}}

{{body}}`,
  questionDictionary: [
    {
      name: "type",
      type: "search-list",
      message: "Please select a type.",
      getChoices: () =>
        commitConfig.map((v) => ({
          value: v.value,
          description: `${v.value}: (${v.release ? v.release : "no release"}) ${
            v.description
          }`,
        })),
    },
    {
      name: "gitmoji",
      type: "search-list",
      message: "Please select a gitmoji",
      getChoices: () => gitmoji,
    },
    {
      name: "subject",
      type: "input",
      message: "Please input the subject.",
      validate: typoValidate,
    },
    {
      name: "issue",
      type: "search-list",
      message: "Close the issue?",
      /**
       * Get the issue.
       */
      getChoices: fetchMyIssues,
      overwriteAnswer: (ans) => (ans ? ans : ""),
      overwriteTpl: (tpl) => tpl.replace(/ Close #\r?\n/, "\r\n").trim(),
    },
    {
      name: "body",
      type: "input",
      message: "Please input the body.",
      overwriteTpl: (tpl) => tpl.replace(/\r?\n{2,}/, "\r\n\r\n").trim(),
      validate: typoValidate,
    },
  ],
  config: {
    /**
     * This is the theme color of the terminal.
     */
    color: "green",
    templateName: "Conventional Commit",
  },
};
