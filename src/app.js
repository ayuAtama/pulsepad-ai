import {
  DEFAULT_STATE,
  PROMPTS,
  THEMES,
  buildSessionState,
  createSafeStorage,
  formatClockParts,
  formatSessionLabel,
  loadState,
  saveState,
  sanitizeTheme,
  selectNextPromptIndex,
} from "./core.js";

const STORAGE_KEY = "signal-lantern-state";

const elements = {
  date: document.querySelector("#current-date"),
  time: document.querySelector("#current-time"),
  prompt: document.querySelector("#prompt-text"),
  sessionTotal: document.querySelector("#session-total"),
  lastSession: document.querySelector("#last-session"),
  themeLabel: document.querySelector("#theme-label"),
  shufflePrompt: document.querySelector("#shuffle-prompt"),
  logSession: document.querySelector("#log-session"),
  themeButtons: Array.from(document.querySelectorAll(".theme-button")),
};

const storage = createSafeStorage(globalThis.localStorage);
let state = loadState(storage, STORAGE_KEY);

function renderClock() {
  const { time, longDate } = formatClockParts(new Date());
  elements.time.textContent = time;
  elements.date.textContent = longDate;
}

function renderPrompt() {
  elements.prompt.textContent = PROMPTS[state.promptIndex] ?? PROMPTS[DEFAULT_STATE.promptIndex];
}

function renderSessions() {
  const countLabel = `${state.sessionCount} logged`;
  elements.sessionTotal.textContent = countLabel;
  elements.lastSession.textContent = formatSessionLabel(state.lastSessionIso);
}

function renderTheme() {
  const theme = sanitizeTheme(state.theme);
  document.body.dataset.theme = theme;
  elements.themeLabel.textContent = `Current theme: ${THEMES[theme]}`;

  elements.themeButtons.forEach((button) => {
    const isActive = button.dataset.themeChoice === theme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function persistAndRender() {
  saveState(storage, state, STORAGE_KEY);
  renderPrompt();
  renderSessions();
  renderTheme();
}

function initializeEvents() {
  elements.shufflePrompt.addEventListener("click", () => {
    state = {
      ...state,
      promptIndex: selectNextPromptIndex(state.promptIndex, PROMPTS),
    };
    persistAndRender();
  });

  elements.logSession.addEventListener("click", () => {
    state = buildSessionState(state);
    persistAndRender();
  });

  elements.themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state = {
        ...state,
        theme: sanitizeTheme(button.dataset.themeChoice),
      };
      persistAndRender();
    });
  });
}

function initialize() {
  renderClock();
  renderPrompt();
  renderSessions();
  renderTheme();
  initializeEvents();
  globalThis.setInterval(renderClock, 1000);
}

initialize();
