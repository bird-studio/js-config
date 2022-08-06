const commitConfig = require("./commit.config");
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
      owner: plugin.git.getOwner(),
      repo: plugin.git.getRepo(),
      state: "open",
      assignUser: plugin.git.getOwner(),
    })
    .then((r) =>
      r.data
        .filter((v) => !v.pull_request)
        .filter((v) =>
          v.assignees.find((a) => a.login === plugin.git.getOwner())
        )
        .map((issue) => ({
          description: `#${issue.number}: ${issue.title}`,
          value: `${issue.number}`,
        }))
    )
    .then((v) => [notSelected, ...v])
    .catch(() => [notSelected]);

const errorInput = (txt) => {
  if (!txt) {
    return true;
  }

  return plugin.grammar.checkGrammar({ grammarApi, txt: txt }).then((v) => {
    if (v.isFailure) {
      // 対応不能
      return true;
    }

    if (!v.data.status) {
      // 対応不能
      return true;
    }

    if (!v.data.response.result) {
      // 対応不能
      return true;
    }

    if (v.data.response.errors.length === 0) {
      // Good!!
      return true;
    }

    const r = v.data.response.errors.map((e) => ({
      description: e.description.en,
      bad: e.bad,
      better: e.better,
    }));

    return JSON.stringify(r, null, 2);
  });
};

/**
 * @type {import('interactive-message').Setting}
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
      validate: errorInput,
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
      validate: errorInput,
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
