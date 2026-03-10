"use client";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pulsepad-ai-items";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

const seedItems = [
  "Ship the repo faster than expected",
  "Capture one idea worth building this week",
  "Close the loop on one lingering task",
];

function makeItem(text, done = false) {
  return {
    id: crypto.randomUUID(),
    text,
    done,
    createdAt: new Date().toISOString(),
  };
}

function formatCreatedAt(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function TodoApp() {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(seedItems.map((item, index) => makeItem(item, index === 0)));
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const visibleItems = useMemo(() => {
    if (filter === "active") {
      return items.filter((item) => !item.done);
    }

    if (filter === "done") {
      return items.filter((item) => item.done);
    }

    return items;
  }, [filter, items]);

  const total = items.length;
  const completed = items.filter((item) => item.done).length;
  const remaining = total - completed;

  function addItem(event) {
    event.preventDefault();

    const text = draft.trim();

    if (!text) {
      return;
    }

    setItems((current) => [makeItem(text), ...current]);
    setDraft("");
  }

  function toggleItem(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function deleteItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearDone() {
    setItems((current) => current.filter((item) => !item.done));
  }

  return (
    <main className="shell">
      <section className="hero">
        <article className="heroCard">
          <span className="eyebrow">Next.js + pnpm + local-first</span>
          <h1>PulsePad AI</h1>
          <p>
            A focused to-do list for ayuAtama, built to move faster. This
            project is intentionally simple, sharp, and ready to use as a
            public Next.js starter for task tracking.
          </p>
          <div className="heroMeta">
            <span className="metaPill">Local-first task persistence</span>
            <span className="metaPill">Fast add / complete / clear flow</span>
            <span className="metaPill">Designed for desktop and mobile</span>
          </div>
        </article>

        <aside className="statsCard">
          <div className="statsGrid">
            <div className="stat">
              <span className="statLabel">Tasks tracked</span>
              <strong className="statValue">{total}</strong>
            </div>
            <div className="stat">
              <span className="statLabel">Completed</span>
              <strong className="statValue">{completed}</strong>
            </div>
            <div className="stat">
              <span className="statLabel">Still moving</span>
              <strong className="statValue">{remaining}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="board">
        <form className="composer" onSubmit={addItem}>
          <input
            className="input"
            type="text"
            placeholder="Add the next thing worth finishing"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Add a task"
          />
          <button className="primaryButton" type="submit">
            Add task
          </button>
        </form>

        <div className="toolbar">
          <div className="filters" aria-label="Task filters">
            {FILTERS.map((option) => (
              <button
                key={option.id}
                className="filterButton"
                type="button"
                data-active={filter === option.id}
                onClick={() => setFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button className="ghostButton" type="button" onClick={clearDone}>
            Clear completed
          </button>
        </div>

        <div className="list">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <article
                key={item.id}
                className={`item ${item.done ? "itemDone" : ""}`}
              >
                <button
                  className="toggle"
                  type="button"
                  data-done={item.done}
                  onClick={() => toggleItem(item.id)}
                  aria-label={
                    item.done ? "Mark task as active" : "Mark task as done"
                  }
                />

                <div>
                  <p className="itemTitle" data-done={item.done}>
                    {item.text}
                  </p>
                  <div className="itemMeta">
                    Added {formatCreatedAt(item.createdAt)}
                  </div>
                </div>

                <button
                  className="iconButton"
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  aria-label="Delete task"
                >
                  ×
                </button>
              </article>
            ))
          ) : (
            <div className="empty">
              No tasks in this view yet. Add one above and keep moving.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
