import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_STATE,
  buildSessionState,
  createMemoryStorage,
  createSafeStorage,
  loadState,
  saveState,
  selectNextPromptIndex,
} from "../src/core.js";

test("createSafeStorage falls back when storage throws", () => {
  const brokenStorage = {
    getItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("blocked");
    },
  };

  const safeStorage = createSafeStorage(brokenStorage);
  saveState(safeStorage, DEFAULT_STATE, "test-state");

  assert.deepEqual(loadState(safeStorage, "test-state"), DEFAULT_STATE);
});

test("loadState returns defaults for invalid JSON", () => {
  const storage = createMemoryStorage();
  storage.setItem("bad-state", "{not-json");

  assert.deepEqual(loadState(storage, "bad-state"), DEFAULT_STATE);
});

test("selectNextPromptIndex chooses a different prompt when possible", () => {
  const originalRandom = Math.random;
  Math.random = () => 0;

  try {
    const nextIndex = selectNextPromptIndex(0, ["a", "b", "c"]);
    assert.equal(nextIndex, 1);
  } finally {
    Math.random = originalRandom;
  }
});

test("buildSessionState increments the session count and stores the timestamp", () => {
  const now = new Date("2026-03-10T08:30:00.000Z");
  const nextState = buildSessionState(DEFAULT_STATE, now);

  assert.equal(nextState.sessionCount, 1);
  assert.equal(nextState.lastSessionIso, "2026-03-10T08:30:00.000Z");
});
