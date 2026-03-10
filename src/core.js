export const THEMES = {
  aurora: "Aurora",
  ember: "Ember",
  tide: "Tide",
};

export const PROMPTS = [
  "What is the one outcome that would make this hour feel clean and complete?",
  "What distraction is most likely to appear, and how will you refuse it?",
  "Which unfinished thought should be written down before you begin?",
  "What would a calm, high-quality first ten minutes look like?",
  "If you could only ship one useful thing today, what would it be?",
  "What signal would tell you this session is drifting off course?",
];

export const DEFAULT_STATE = {
  theme: "aurora",
  promptIndex: 0,
  sessionCount: 0,
  lastSessionIso: null,
};

export function createMemoryStorage() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
  };
}

export function createSafeStorage(storage) {
  if (!storage || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") {
    return createMemoryStorage();
  }

  try {
    const probeKey = "__signal_lantern_probe__";
    storage.setItem(probeKey, "1");
    return storage;
  } catch {
    return createMemoryStorage();
  }
}

export function sanitizeTheme(theme) {
  return Object.hasOwn(THEMES, theme) ? theme : DEFAULT_STATE.theme;
}

export function sanitizePromptIndex(index, prompts = PROMPTS) {
  return Number.isInteger(index) && index >= 0 && index < prompts.length ? index : 0;
}

export function sanitizeSessionCount(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

export function loadState(storage, key = "signal-lantern-state") {
  const safeStorage = createSafeStorage(storage);
  const rawValue = safeStorage.getItem(key);

  if (!rawValue) {
    return { ...DEFAULT_STATE };
  }

  try {
    const parsed = JSON.parse(rawValue);

    return {
      theme: sanitizeTheme(parsed.theme),
      promptIndex: sanitizePromptIndex(parsed.promptIndex),
      sessionCount: sanitizeSessionCount(parsed.sessionCount),
      lastSessionIso: typeof parsed.lastSessionIso === "string" ? parsed.lastSessionIso : null,
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(storage, state, key = "signal-lantern-state") {
  const safeStorage = createSafeStorage(storage);
  safeStorage.setItem(key, JSON.stringify(state));
}

export function selectNextPromptIndex(currentIndex, prompts = PROMPTS) {
  if (!prompts.length) {
    return 0;
  }

  if (prompts.length === 1) {
    return 0;
  }

  const nextIndex = Math.floor(Math.random() * prompts.length);
  return nextIndex === currentIndex ? (nextIndex + 1) % prompts.length : nextIndex;
}

export function formatClockParts(date) {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  const longDate = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return { time, longDate };
}

export function formatSessionLabel(isoString) {
  if (!isoString) {
    return "No sessions logged yet.";
  }

  const sessionDate = new Date(isoString);
  if (Number.isNaN(sessionDate.getTime())) {
    return "No sessions logged yet.";
  }

  const dateText = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(sessionDate);

  return `Last logged ${dateText}`;
}

export function buildSessionState(previousState, now = new Date()) {
  return {
    ...previousState,
    sessionCount: sanitizeSessionCount(previousState.sessionCount) + 1,
    lastSessionIso: now.toISOString(),
  };
}
