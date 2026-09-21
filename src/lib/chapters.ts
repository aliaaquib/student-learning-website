import type { Topic } from "./types";

/**
 * Topics per chapter. Keyed by chapter id (globally unique).
 * A topic becomes a real page when its MDX file exists at
 * content/<curriculum>/<level>/<subject>/<chapter>/<topic>.mdx —
 * adding a topic = adding an entry here + the MDX file, never rewriting components.
 */
export const CHAPTER_TOPICS: Record<string, Topic[]> = {
  algebra: [
    { slug: "introduction", title: "Introduction to Algebra", desc: "What algebra is and why letters beat numbers." },
    { slug: "variables", title: "Variables", desc: "Named boxes that store values you can reuse and change." },
    { slug: "expressions", title: "Expressions", desc: "Simplifying, expanding and collecting like terms." },
    { slug: "linear-equations", title: "Linear Equations", desc: "Solve for x: one step, two steps, both sides." },
    { slug: "quadratic-equations", title: "Quadratic Equations", desc: "When x² appears: factorising and the quadratic formula." },
    { slug: "functions", title: "Functions", desc: "Machines that turn inputs into outputs." },
  ],
  "number-arithmetic": [],
  geometry: [],
  statistics: [],
  probability: [],
  forces: [
    { slug: "newtons-laws", title: "Newton's Laws of Motion", desc: "The three laws that govern how everything moves." },
  ],
  motion: [],
  energy: [],
  waves: [],
  electricity: [],
  "atomic-structure": [
    { slug: "atoms-and-elements", title: "Atoms and Elements", desc: "Protons, neutrons, electrons — and what makes an element." },
  ],
  "periodic-table": [],
  "chemical-bonding": [],
  "chemical-changes": [],
  "quantitative-chemistry": [],
  "cell-biology": [
    { slug: "cell-structure", title: "Cell Structure", desc: "Meet the organelles: the tiny machines inside every cell." },
  ],
  organisation: [],
  bioenergetics: [],
  genetics: [],
  ecology: [],
  "computational-thinking": [],
  programming: [
    { slug: "variables", title: "Variables", desc: "A named box that stores a value — in real, runnable Python." },
  ],
  algorithms: [],
  "data-representation": [],
  "reading-skills": [
    { slug: "understanding-theme", title: "Understanding Theme", desc: "Find the big idea hiding inside a text." },
  ],
  "writing-skills": [],
  "grammar-vocabulary": [],
  "modern-world": [
    { slug: "industrial-revolution", title: "The Industrial Revolution", desc: "How steam, coal and factories remade the world." },
  ],
  "twentieth-century": [],
  "source-skills": [],
  "physical-geography": [
    { slug: "rivers-and-erosion", title: "Rivers and Erosion", desc: "How flowing water sculpts the land." },
  ],
  "weather-climate": [],
  "human-geography": [],
  microeconomics: [
    { slug: "supply-and-demand", title: "Supply and Demand", desc: "The two curves that set nearly every price." },
  ],
  macroeconomics: [],
  "business-basics": [
    { slug: "what-is-a-business", title: "What is a Business?", desc: "Enterprise, needs and wants, and the four factors of production." },
  ],
  marketing: [],
  finance: [],
  "spanish-basics": [
    { slug: "greetings", title: "Greetings and Introductions", desc: "Your first Spanish: hola, me llamo… and more." },
  ],
  "spanish-grammar": [],
  "french-basics": [
    { slug: "greetings", title: "Greetings and Introductions", desc: "Your first French: bonjour, je m'appelle… and more." },
  ],
  "french-grammar": [],
};

export function getChapterTopics(chapterId: string): Topic[] {
  return CHAPTER_TOPICS[chapterId] ?? [];
}
