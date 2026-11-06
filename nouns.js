(() => {
  const STORAGE_KEY = "deutschtrainer-nouns-v1";
  const BASIC_ARTICLES = ["der", "die", "das"];
  const CASE_ARTICLES = [...BASIC_ARTICLES, "den", "dem", "des"];
  const MODE_BADGES = { learn: "Карточка", cases: "Падежи" };
  const RESULT_LABELS = {
    learn: ["Карточки пройдены", "Повторить карточки ↻"],
    cases: ["Практика завершена", "Ещё практика ↻"],
    test: ["Тест завершён", "Новый тест ↻"],
  };
  const groups = new Map(NOUN_GROUPS.map(({ id, label }) => [id, label]));

  const view = document.querySelector("#nouns-view");
  const element = (name) => view.querySelector(`#noun-${name}`);
  const controls = {
    modes: view.querySelectorAll("[data-noun-mode]"),
    topicControls: element("topic-controls"),
    topic: element("topic"),
    showTranslation: element("show-translation"),
    progress: element("progress"),
    progressText: element("progress-text"),
    sessionLine: element("session-line"),
    counter: element("counter"),
    score: element("score"),
    card: element("card"),
    modeBadge: element("mode-badge"),
    groupBadge: element("group-badge"),
    instruction: element("instruction"),
    prompt: element("prompt"),
    prefix: element("prefix"),
    article: element("article"),
    tail: element("tail"),
    translation: element("translation"),
    choices: element("choices"),
    feedback: element("feedback"),
    feedbackTitle: element("feedback-title"),
    feedbackRule: element("feedback-rule"),
    nextQuestion: element("next-question"),
    testIntro: element("test-intro"),
    startTest: element("start-test"),
    result: element("result"),
    resultLabel: element("result-label"),
    resultScore: element("result-score"),
    resultDetail: element("result-detail"),
    restart: element("restart-test"),
  };

  const settings = loadSettings();
  let mode = "learn";
  let topicNouns = NOUNS;
  const decks = {
    learn: () => shuffleNounItems(topicNouns).map((noun) => ({ noun, template: null })),
    cases: () => buildCaseDeck(topicNouns),
    test: buildNounTest,
  };
  const sessions = { learn: createSession(decks.learn()), cases: null, test: null };

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return {
        known: new Set(Array.isArray(saved?.known) ? saved.known : []),
        showTranslation: saved?.showTranslation !== false,
      };
    } catch {
      return { known: new Set(), showTranslation: true };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        known: [...settings.known],
        showTranslation: settings.showTranslation,
      }));
    } catch {
      // Отметки и перевод доступны до закрытия страницы, если браузер отключил хранение.
    }
  }

  function createSession(questions) {
    return { questions, index: 0, answer: null, wordCorrect: 0, caseCorrect: 0 };
  }

  function renderProgress() {
    const pool = mode === "test" ? NOUNS : topicNouns;
    const count = pool.filter((noun) => settings.known.has(noun.word)).length;
    controls.progress.max = pool.length;
    controls.progress.value = count;
    controls.progressText.textContent = `${count} из ${pool.length}`;
  }

  function renderTranslation(question) {
    const visible = settings.showTranslation && Boolean(question);
    controls.translation.textContent = visible ? translateNounQuestion(question) : "";
    controls.translation.hidden = !visible;
  }

  function renderPrompt(question, article) {
    const { noun, template } = question;
    const caseId = template?.case ?? "nom";
    const prefix = template?.before ?? "";
    const capitalized = template && !prefix && article;
    controls.prefix.textContent = prefix;
    controls.article.textContent = capitalized ? article[0].toUpperCase() + article.slice(1) : (article ?? "");
    controls.article.classList.toggle("is-blank", !article);
    if (article) {
      controls.article.removeAttribute("role");
      controls.article.removeAttribute("aria-label");
    } else {
      controls.article.setAttribute("role", "img");
      controls.article.setAttribute("aria-label", "Пропуск для артикля");
    }
    controls.tail.textContent = ` ${nounForm(noun, caseId)}${template?.after ?? ""}`;
    controls.groupBadge.textContent = groups.get(noun.group);
    renderTranslation(question);
  }

  function renderQuiz(session) {
    const question = session.questions[session.index];
    const { noun, template } = question;
    const caseId = template?.case ?? "nom";
    const solution = articleFor(noun, caseId);
    const answered = session.answer !== null;
    const correct = session.answer === solution;
    const counterLabel = mode === "learn" ? "Карточка" : "Задание";
    controls.counter.textContent = `${counterLabel} ${session.index + 1} из ${session.questions.length}`;
    controls.score.textContent = `Верных ${session.wordCorrect + session.caseCorrect}`;
    controls.modeBadge.textContent = MODE_BADGES[mode] ?? (template ? "Тест · Падежи" : "Тест · Слова");
    controls.instruction.textContent = template
      ? "Вставьте определённый артикль единственного числа"
      : "Выберите словарный артикль";
    renderPrompt(question, answered ? solution : null);

    const options = template ? CASE_ARTICLES : BASIC_ARTICLES;
    const buttons = options.map((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "noun-choice";
      button.lang = "de";
      button.value = option;
      button.textContent = option;
      button.disabled = answered;
      button.classList.toggle("is-correct", answered && option === solution);
      button.classList.toggle("is-wrong", answered && !correct && option === session.answer);
      return button;
    });
    controls.choices.replaceChildren(...buttons);

    controls.feedback.hidden = !answered;
    if (answered) {
      controls.feedback.classList.toggle("is-wrong", !correct);
      controls.feedbackTitle.textContent = correct ? "Верно" : `Правильный артикль — ${solution}`;
      controls.feedbackRule.textContent = template
        ? `${NOUN_CASES[caseId].label} · ${template.rule}`
        : `${noun.article} ${noun.word} · ${{ der: "мужской", die: "женский", das: "средний" }[noun.article]} род.`;
      controls.nextQuestion.textContent = session.index === session.questions.length - 1 ? "Результат →" : "Следующее →";
    }
  }

  function renderResult(session) {
    const isTest = mode === "test";
    const [label, restart] = RESULT_LABELS[mode];
    controls.resultLabel.textContent = label;
    controls.resultScore.textContent = `${session.wordCorrect + session.caseCorrect} из ${session.questions.length}`;
    controls.resultDetail.hidden = !isTest;
    controls.resultDetail.textContent = isTest
      ? `Словарные артикли — ${session.wordCorrect} из ${NOUN_TEST_WORD_COUNT}. Падежи — ${session.caseCorrect} из ${session.questions.length - NOUN_TEST_WORD_COUNT}.`
      : "";
    controls.restart.textContent = restart;
  }

  function render() {
    const session = sessions[mode];
    const finished = session !== null && session.index === session.questions.length;
    controls.card.hidden = !session || finished;
    controls.sessionLine.hidden = controls.card.hidden;
    controls.testIntro.hidden = mode !== "test" || session !== null;
    controls.result.hidden = !finished;
    controls.topicControls.hidden = mode === "test";
    renderProgress();
    if (finished) renderResult(session);
    else if (session) renderQuiz(session);
  }

  function changeMode(nextMode) {
    if (mode === nextMode) return;
    mode = nextMode;
    if (mode !== "test") sessions[mode] ??= createSession(decks[mode]());
    for (const button of controls.modes) {
      const active = button.dataset.nounMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    render();
  }

  function changeTopic() {
    const group = controls.topic.value;
    topicNouns = group === "all" ? NOUNS : NOUNS.filter((noun) => noun.group === group);
    sessions.learn = null;
    sessions.cases = null;
    sessions[mode] = createSession(decks[mode]());
    render();
  }

  function startQuiz() {
    sessions[mode] = createSession(decks[mode]());
    render();
    controls.prompt.focus();
  }

  function answerQuestion(article) {
    const session = sessions[mode];
    if (!session || session.answer !== null) return;
    const { noun, template } = session.questions[session.index];
    session.answer = article;
    if (article === articleFor(noun, template?.case ?? "nom")) {
      if (template) session.caseCorrect += 1;
      else session.wordCorrect += 1;
      if (mode === "learn" && !settings.known.has(noun.word)) {
        settings.known.add(noun.word);
        saveSettings();
        renderProgress();
      }
    }
    renderQuiz(session);
    controls.nextQuestion.focus();
  }

  for (const { id, label } of NOUN_GROUPS) controls.topic.add(new Option(label, id));
  for (const button of controls.modes) {
    button.addEventListener("click", () => changeMode(button.dataset.nounMode));
  }

  controls.topic.addEventListener("change", changeTopic);
  controls.showTranslation.checked = settings.showTranslation;
  controls.showTranslation.addEventListener("change", () => {
    settings.showTranslation = controls.showTranslation.checked;
    const session = sessions[mode];
    renderTranslation(session?.questions[session.index]);
    saveSettings();
  });

  controls.startTest.addEventListener("click", startQuiz);
  controls.restart.addEventListener("click", startQuiz);
  controls.choices.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button && !button.disabled) answerQuestion(button.value);
  });

  controls.nextQuestion.addEventListener("click", () => {
    const session = sessions[mode];
    if (!session || session.answer === null) return;
    session.index += 1;
    session.answer = null;
    render();
    const focusTarget = controls.result.hidden ? controls.prompt : controls.resultScore;
    focusTarget.focus();
  });

  render();
})();
