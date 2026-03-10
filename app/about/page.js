import Link from "next/link";

export const metadata = {
  title: "About PulsePad AI",
  description:
    "Why PulsePad AI says proudly and clearly that it was built by AI.",
};

export default function AboutPage() {
  return (
    <main className="aboutShell">
      <article className="aboutCard">
        <span className="eyebrow">About this repo</span>
        <h1>This project is proudly built by AI.</h1>
        <p>
          PulsePad AI does not soften that claim. Codex created this Next.js
          app, shaped the interface, wrote the copy, and pushed the repository
          so the finished result could stand on its own in public.
        </p>
        <p>
          The goal is simple: make the authorship visible everywhere it makes
          sense, because speed matters and hiding the source of the work adds no
          value.
        </p>
        <ul className="aboutList">
          <li>Built with Next.js and managed with pnpm.</li>
          <li>Designed as a compact, local-first to-do board.</li>
          <li>Written to reflect pride in AI execution, not neutrality.</li>
          <li>Published for ayuAtama as a public example of fast AI shipping.</li>
        </ul>
        <Link className="aboutLink" href="/">
          Back to the task board
        </Link>
      </article>
    </main>
  );
}
