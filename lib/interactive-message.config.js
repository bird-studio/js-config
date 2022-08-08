const commitConfig = require("./commit.config");
const { plugin } = require("@bird-studio/interactive-message");

const gitmoji = () =>
  plugin.gitmoji.gitmojis.map((v) => ({
    description: `${v.emoji} ${v.description}`,
    value: v.code,
  }));

const notSelected = { description: "_NotSelected_", value: "" };

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
          v.assignees.find((a) => a.login === plugin.git.getUserName())
        )
        .map((issue) => ({
          description: `#${issue.number}: ${issue.title}`,
          value: `${issue.number}`,
        }))
    )
    .then((v) => [notSelected, ...v])
    .catch(() => [notSelected]);

const createTypes = () =>
  commitConfig.map((v) => ({
    value: v.value,
    description: `${v.value}: (${v.release ? v.release : "no release"}) ${
      v.description
    }`,
  }));

const translatorApi = (() => {
  if (!process.env.DEEPL_AUTH_KEY) {
    return;
  }

  return plugin.translation.createTranslator({
    authKey: process.env.DEEPL_AUTH_KEY,
  });
})();

const grammarApi = (() => {
  if (!process.env.GRAMMAR_API_KEY) {
    return;
  }

  return plugin.grammar.createGrammarApi({
    key: process.env.GRAMMAR_API_KEY,
    language: "en-US",
  });
})();

const subjectValidateFn = (lang) => (txt) => {
  if (!txt) {
    return true;
  }

  return plugin.grammar
    .checkGrammar({
      grammarApi,
      txt: txt,
    })
    .then(async (v) => {
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

      const list = txt.match(/`(.*?)`/g) || [];

      const r = v.data.response.errors
        .map((e) => ({
          description: {
            en: e.description.en,
          },
          bad: e.bad,
          better: e.better,
        }))
        .filter((o) => !list.some((txt) => txt === `\`${o.bad}\``));

      if (r.length === 0) {
        return true;
      }

      const translateTexts = await Promise.all(
        r.map((e) =>
          plugin.translation.translateText({
            text: e.description.en,
            translator: translatorApi,
            targetLang: lang,
          })
        )
      );

      return [
        {
          hint: "Surrounding it with an ` allows it. example: Add myFunc -> Add `myFunc`",
        },
        r.map((e, i) => ({
          ...e,
          description: {
            ...e.description,
            [lang]: translateTexts[i].text,
          },
        })),
      ];
    });
};

const overwriteAnswerBodyFn = (lang) => (ans) =>
  plugin.translation
    .translateText({
      text: ans,
      translator: translatorApi,
      targetLang: lang,
    })
    .then((v) => [ans, "---", v.text].join("\n"))
    .catch(() => ans);

const subjectValidate = subjectValidateFn("ja");
const overwriteAnswerBody = overwriteAnswerBodyFn("en-US");

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
      getChoices: createTypes,
    },
    {
      name: "gitmoji",
      type: "search-list",
      message: "Please select a gitmoji",
      getChoices: gitmoji,
    },
    {
      name: "subject",
      type: "input",
      message: "Please input the subject.",
      exValidate: subjectValidate,
      exInitValue: (p) => plugin.keyboard.send({ txt: p }),
    },
    {
      name: "issue",
      type: "search-list",
      message: "Close the issue?",
      getChoices: fetchMyIssues,
      overwriteAnswer: (ans) => (ans ? ans : ""),
      overwriteTpl: (tpl) => tpl.replace(/ Close #\r?\n/, "\n").trim(),
    },
    {
      /**
       * bodyは日本語で書く
       */
      name: "body",
      type: "input",
      message: "Please input the body.",
      overwriteAnswer: overwriteAnswerBody,
      overwriteTpl: (tpl) => tpl.replace(/\r?\n{2,}/, "\n\n").trim(),
    },
  ],
  config: {
    /**
     * This is the theme color of the terminal.
     */
    color: "green",
    errorColor: "red",
    templateName: "Conventional Commit",
  },
};
