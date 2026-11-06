const TRAINER_VIEWS = {
  home: { element: document.querySelector("#home-view"), title: "Deutschtrainer — тренажёр немецкого" },
  practice: { element: document.querySelector("#modal-view"), title: "Modal — тренажёр немецких глаголов" },
  nouns: { element: document.querySelector("#nouns-view"), title: "Существительные A1–A2 — Deutschtrainer" },
};

let visibleTrainerView;

function renderTrainerView() {
  const hash = window.location.hash.slice(1);
  const next = Object.hasOwn(TRAINER_VIEWS, hash) ? TRAINER_VIEWS[hash] : TRAINER_VIEWS.home;
  if (next === visibleTrainerView) return;

  if (next !== TRAINER_VIEWS.practice) {
    document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
  }

  for (const { element } of Object.values(TRAINER_VIEWS)) element.hidden = element !== next.element;
  document.title = next.title;
  if (visibleTrainerView) {
    window.scrollTo({ top: 0, behavior: "instant" });
    next.element.querySelector("main").focus({ preventScroll: true });
  }
  visibleTrainerView = next;
}

function openModalPractice() {
  window.location.hash = "#practice";
  renderTrainerView();
}

window.addEventListener("hashchange", renderTrainerView);
renderTrainerView();
