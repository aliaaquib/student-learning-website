import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentType, ReactElement, ReactNode } from "react";
import { Callout, Definition, Example, ImportantNote, Summary, WorkedExample } from "./components/textbook/Callout";
import { Formula } from "./components/textbook/Formula";
import { Diagram } from "./components/textbook/Diagram";
import { CodeBlock } from "./components/textbook/CodeBlock";
import { PracticeItem, PracticeQuestions } from "./components/textbook/PracticeQuestions";
import { Quiz, QuizQuestion } from "./components/textbook/Quiz";
import { LearningObjectives } from "./components/textbook/LearningObjectives";
import { RelatedTopics } from "./components/textbook/RelatedTopics";
import { NextChapter } from "./components/textbook/NextChapter";
import TryItPython from "./components/widgets/TryItPython";
import EquationSolver from "./components/widgets/EquationSolver";

/** Flatten MDX children to plain text (for fenced code blocks). */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  const el = node as ReactElement<{ children?: ReactNode }>;
  return textOf(el.props?.children);
}

const LANG_NAMES: Record<string, string> = {
  python: "Python",
  py: "Python",
  maths: "Maths",
  math: "Maths",
  pseudocode: "Pseudocode",
  js: "JavaScript",
  javascript: "JavaScript",
  text: "Example",
  txt: "Example",
};

/** Fenced ``` blocks render through the dark .code-block design. */
function Pre({ children }: { children?: ReactNode }) {
  let lang = "Code";
  let code = "";
  const child = Array.isArray(children) ? children[0] : children;
  if (child && typeof child === "object" && "props" in (child as object)) {
    const props = (child as ReactElement<{ className?: string; children?: ReactNode }>).props;
    const m = /language-([\w-]+)/.exec(props.className ?? "");
    if (m) lang = LANG_NAMES[m[1].toLowerCase()] ?? m[1];
    code = textOf(props.children);
  } else {
    code = textOf(children);
  }
  return <CodeBlock lang={lang}>{code}</CodeBlock>;
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  if (href.startsWith("/")) {
    return <Link href={href}>{props.children}</Link>;
  }
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}

/** Component map passed to MDXRemote — the textbook vocabulary. */
export const mdxComponents: Record<string, ComponentType<any>> = {
  pre: Pre,
  a: MdxLink,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => <table className="mdx-table" {...props} />,
  Callout,
  Definition,
  ImportantNote,
  WorkedExample,
  Example,
  Summary,
  Formula,
  Diagram,
  CodeBlock,
  PracticeQuestions,
  PracticeItem,
  Quiz,
  QuizQuestion,
  LearningObjectives,
  RelatedTopics,
  NextChapter,
  TryItPython,
  EquationSolver,
};
