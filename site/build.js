'use strict';

/**
 * Build script: parses the mc-next-llm-wiki vault into structured JSON
 * consumed by the static site in docs/.
 *
 * Usage: node site/build.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { renderMarkdown, renderInline, toPlainText } = require('./lib/markdown');

const ROOT = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT, 'docs');
const OUT_DIR = path.join(SITE_DIR, 'data');

const CONCEPTS_DIR = path.join(ROOT, 'concepts');
const FLASHCARDS_DIR = path.join(ROOT, 'flashcards');
const SECTION_FLASHCARDS_DIR = path.join(ROOT, 'Exam Section Based Flashcards');
const QA_DIR = path.join(ROOT, 'Exam Q&A Study Guide');
const INDEX_DIR = path.join(ROOT, '_index');

/** Canonical exam blueprint — the spine of the whole site. */
const EXAM_SECTIONS = [
  { id: 1, slug: 'section-1-platform-setup-governance', name: 'Platform Setup & Governance', weight: 13, color: '#0ea5e9' },
  { id: 2, slug: 'section-2-consent', name: 'Consent', weight: 13, color: '#8b5cf6' },
  { id: 3, slug: 'section-3-data-identity-segmentation', name: 'Data Modeling, Identity Resolution & Segmentation', weight: 25, color: '#10b981' },
  { id: 4, slug: 'section-4-campaign-flow-content', name: 'Campaign Design, Flow Orchestration & Content', weight: 30, color: '#f59e0b' },
  { id: 5, slug: 'section-5-agentforce-ai', name: 'Agentforce & AI Innovation', weight: 11, color: '#ef4444' },
  { id: 6, slug: 'section-6-analytics-insights', name: 'Analytics & Performance Insights', weight: 8, color: '#ec4899' },
];

const EXAM_FACTS = {
  scoredQuestions: 60,
  unscoredQuestions: 5,
  minutes: 105,
  passMark: 72,
  release: "Summer '26",
  prerequisite: 'None',
  referenceMaterials: 'Not allowed',
};

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort();
}

/** Split a document into `## ` sections, keeping the preamble. */
function splitH2(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const sections = [];
  let current = { heading: null, lines: [] };

  for (const line of lines) {
    const match = line.match(/^##\s+(.*)$/);
    if (match) {
      sections.push(current);
      current = { heading: match[1].trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections;
}

/** Split a document into `### ` subsections within a given line range. */
function splitH3(lines) {
  const sections = [];
  let current = { heading: null, lines: [] };
  for (const line of lines) {
    const match = line.match(/^###\s+(.*)$/);
    if (match) {
      sections.push(current);
      current = { heading: match[1].trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections;
}

function firstHeading(markdown) {
  const match = markdown.match(/^#\s+(.*)$/m);
  return match ? match[1].trim() : '';
}

/** Extract the leading `> ` blockquote lines that follow the H1. */
function extractMeta(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const meta = [];
  let seenH1 = false;
  for (const line of lines) {
    if (/^#\s/.test(line)) {
      seenH1 = true;
      continue;
    }
    if (!seenH1) continue;
    if (/^>\s?/.test(line)) {
      meta.push(line.replace(/^>\s?/, '').trim());
    } else if (line.trim() && !/^>/.test(line)) {
      break;
    }
  }
  return meta.filter(Boolean).join('\n');
}

function extractWikiLinks(text) {
  const links = [];
  const re = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    links.push({ slug: match[1].trim(), label: (match[2] || match[1]).trim() });
  }
  return links;
}

function extractListItems(text) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^([-*+]|\d+\.)\s+/.test(l))
    .map((l) => l.replace(/^([-*+]|\d+\.)\s+/, '').trim());
}

/**
 * Pitfall bullets are written as `⚠️ ...` lines rather than list items,
 * so they need their own extractor.
 */
function extractPitfalls(text) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('⚠️'))
    .map((l) => l.replace(/^⚠️\s*/, '').trim())
    .filter(Boolean);
}

function stripMarkdown(text) {
  return toPlainText(text);
}

// ---------------------------------------------------------------------------
// Concepts
// ---------------------------------------------------------------------------

function parseConcept(file) {
  const markdown = read(file);
  const slug = path.basename(file, '.md');
  const title = firstHeading(markdown);
  const sections = splitH2(markdown);

  const get = (name) => sections.find((s) => s.heading === name);
  const body = (name) => {
    const section = get(name);
    return section ? section.lines.join('\n').trim() : '';
  };

  const coreIdea = stripMarkdown(body('Core Idea'));
  const prerequisites = extractWikiLinks(body('Prerequisites'));
  const related = extractWikiLinks(body('Related Concepts'));
  const recallQuestions = extractListItems(body('Active Recall Questions'));
  const pitfalls = extractPitfalls(body('Common Pitfalls / Misconceptions'));
  const sources = extractListItems(body('Source References'));
  const explanation = body('Detailed Explanation');

  return {
    slug,
    title,
    coreIdea,
    prerequisites,
    related,
    recallQuestions,
    pitfalls,
    pitfallsHtml: pitfalls.map((p) => renderInline(p)),
    sources,
    sourcesHtml: sources.map((s) => renderInline(s)),
    recallQuestionsHtml: recallQuestions.map((q) => renderInline(q)),
    explanationHtml: renderMarkdown(explanation, { headingOffset: 1 }),
    coreIdeaHtml: renderMarkdown(coreIdea),
  };
}

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

function parseFlashcardDeck(file, kind) {
  const markdown = read(file);
  const slug = path.basename(file, '.md');
  const title = firstHeading(markdown);
  const meta = extractMeta(markdown);
  const sections = splitH2(markdown);

  const cards = [];
  let group = null;

  for (const section of sections) {
    if (!section.heading) continue;
    if (section.heading === 'Related') continue;

    const cardMatch = section.heading.match(/^Card:\s*(.*)$/);
    if (cardMatch) {
      const text = section.lines.join('\n');
      const q = text.match(/^\*\*Q:\*\*\s*([\s\S]*?)(?=^\*\*A:\*\*|(?![\s\S]))/m);
      const a = text.match(/^\*\*A:\*\*\s*([\s\S]*?)(?=^\*\*Q:\*\*|(?![\s\S]))/m);
      if (q && a) {
        cards.push({
          id: `${slug}-${cards.length + 1}`,
          deck: slug,
          group,
          front: stripMarkdown(q[1]),
          back: stripMarkdown(a[1]),
          frontHtml: renderMarkdown(q[1].trim()),
          backHtml: renderMarkdown(a[1].trim()),
        });
      }
    } else {
      group = section.heading;
    }
  }

  const related = extractWikiLinks(markdown);

  return {
    slug,
    title,
    kind,
    meta: stripMarkdown(meta),
    metaHtml: renderMarkdown(meta),
    groups: [...new Set(cards.map((c) => c.group).filter(Boolean))],
    cardCount: cards.length,
    cards,
    related,
  };
}

// ---------------------------------------------------------------------------
// Exam Q&A
// ---------------------------------------------------------------------------

function parseQaFile(file) {
  const markdown = read(file);
  const slug = path.basename(file, '.md');
  const title = firstHeading(markdown);
  const meta = extractMeta(markdown);
  const sections = splitH2(markdown);

  const questions = [];
  for (const section of sections) {
    if (!section.heading) continue;
    const qMatch = section.heading.match(/^Q(\d+)\s*[—–-]\s*(.*)$/);
    if (!qMatch) continue;

    const text = section.lines.join('\n');
    const question = text.match(/^\*\*Question:\*\*\s*([\s\S]*?)(?=^\*\*Answer:\*\*|(?![\s\S]))/m);
    const answer = text.match(/^\*\*Answer:\*\*\s*([\s\S]*?)(?=^\*\*Why:\*\*|(?![\s\S]))/m);
    const why = text.match(/^\*\*Why:\*\*\s*([\s\S]*?)(?=^---|(?![\s\S]))/m);

    // The trailing blockquote holds the distractor analysis. The UI supplies its
    // own "Distractor logic" heading, so drop the vault's inline prefix.
    const distractorLines = text
      .split('\n')
      .filter((l) => /^>\s?/.test(l))
      .map((l) => l.replace(/^>\s?/, ''))
      .join('\n')
      .replace(/^\s*⚠️\s*\*\*Distractor logic:\*\*\s*/i, '')
      .replace(/^\s*⚠️\s*\*\*The most common trap:\*\*\s*/i, '')
      .trim();

    // The "Why" capture runs to the end of the block, so drop the blockquote
    // lines it swallowed — they are rendered separately as the distractor callout.
    const whyText = (why ? why[1] : '')
      .split('\n')
      .filter((l) => !/^>\s?/.test(l))
      .join('\n')
      .trim();

    questions.push({
      id: `${slug}-q${qMatch[1]}`,
      number: Number(qMatch[1]),
      topic: qMatch[2].trim(),
      question: stripMarkdown(question ? question[1] : ''),
      answer: stripMarkdown(answer ? answer[1] : ''),
      why: stripMarkdown(whyText),
      distractor: stripMarkdown(distractorLines),
      questionHtml: renderMarkdown(question ? question[1].trim() : ''),
      answerHtml: renderMarkdown(answer ? answer[1].trim() : ''),
      whyHtml: renderMarkdown(whyText),
      distractorHtml: renderMarkdown(distractorLines),
    });
  }

  const sectionMeta = EXAM_SECTIONS.find((s) => s.slug === slug);

  return {
    slug,
    title,
    sectionId: sectionMeta ? sectionMeta.id : null,
    sectionName: sectionMeta ? sectionMeta.name : title,
    weight: sectionMeta ? sectionMeta.weight : null,
    meta: stripMarkdown(meta),
    metaHtml: renderMarkdown(meta),
    relatedConcepts: extractWikiLinks(meta),
    questionCount: questions.length,
    questions,
  };
}

// ---------------------------------------------------------------------------
// Study roadmap
// ---------------------------------------------------------------------------

function parseRoadmap(file) {
  const markdown = read(file);
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const tracks = [];

  let current = null;
  for (const line of lines) {
    const trackMatch = line.match(/^###\s+Track\s+(\d+)\s*[—–-]\s*(.*)$/);
    if (trackMatch) {
      current = { number: Number(trackMatch[1]), title: trackMatch[2].trim(), steps: [] };
      tracks.push(current);
      continue;
    }
    if (/^##\s/.test(line)) {
      current = null;
      continue;
    }
    if (current) {
      const stepMatch = line.match(/^\s*\d+\.\s+\[\[([^\]|]+)(?:\|([^\]]+))?\]\]\s*(?:[—–-]\s*(.*))?$/);
      if (stepMatch) {
        current.steps.push({
          slug: stepMatch[1].trim(),
          label: (stepMatch[2] || stepMatch[1]).trim(),
          description: (stepMatch[3] || '').trim(),
        });
      }
    }
  }

  return {
    title: firstHeading(markdown),
    meta: stripMarkdown(extractMeta(markdown)),
    tracks,
    totalSteps: tracks.reduce((sum, t) => sum + t.steps.length, 0),
  };
}

// ---------------------------------------------------------------------------
// Revision summary
// ---------------------------------------------------------------------------

function parseRevisionSummary(file) {
  const markdown = read(file);
  const sections = splitH2(markdown);
  const out = [];

  for (const section of sections) {
    if (!section.heading) continue;
    const match = section.heading.match(/^Section\s+(\d+)\s*[—–-]\s*(.*?)\s*\((\d+)%\)$/);
    if (!match) continue;

    const body = section.lines.join('\n').trim();
    const subsections = splitH3(section.lines)
      .filter((s) => s.heading)
      .map((s) => ({
        heading: s.heading,
        html: renderMarkdown(s.lines.join('\n').trim(), { headingOffset: 2 }),
      }));

    out.push({
      sectionId: Number(match[1]),
      name: match[2].trim(),
      weight: Number(match[3]),
      html: renderMarkdown(body, { headingOffset: 1 }),
      subsections,
    });
  }

  return {
    title: firstHeading(markdown),
    meta: stripMarkdown(extractMeta(markdown)),
    sections: out,
  };
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function build() {
  const knownPages = new Set(listMarkdown(CONCEPTS_DIR).map((f) => path.basename(f, '.md')));

  const concepts = listMarkdown(CONCEPTS_DIR).map((f) => parseConcept(path.join(CONCEPTS_DIR, f)));
  const topicDecks = listMarkdown(FLASHCARDS_DIR).map((f) =>
    parseFlashcardDeck(path.join(FLASHCARDS_DIR, f), 'topic')
  );
  const sectionDecks = listMarkdown(SECTION_FLASHCARDS_DIR).map((f) =>
    parseFlashcardDeck(path.join(SECTION_FLASHCARDS_DIR, f), 'section')
  );
  const qaFiles = listMarkdown(QA_DIR)
    .filter((f) => f !== 'README.md')
    .map((f) => parseQaFile(path.join(QA_DIR, f)));

  const roadmap = parseRoadmap(path.join(INDEX_DIR, 'study-roadmap.md'));
  const revision = parseRevisionSummary(path.join(INDEX_DIR, 'exam-revision-summary.md'));

  const allCards = [...topicDecks, ...sectionDecks].flatMap((d) => d.cards);
  const allQuestions = qaFiles.flatMap((f) => f.questions);

  // Attach the section id to each deck so the UI can group them.
  for (const deck of sectionDecks) {
    const meta = EXAM_SECTIONS.find((s) => s.slug === deck.slug);
    deck.sectionId = meta ? meta.id : null;
    deck.weight = meta ? meta.weight : null;
  }

  // Map each concept to the exam section(s) that reference it. The Q&A study
  // guide declares an authoritative "Related concept pages" list per section,
  // which is the most reliable mapping available in the vault.
  const conceptSections = {};
  for (const section of EXAM_SECTIONS) {
    conceptSections[section.id] = [];
  }

  for (const file of qaFiles) {
    if (!file.sectionId) continue;
    const slugs = file.relatedConcepts.map((r) => r.slug).filter((s) => knownPages.has(s));
    conceptSections[file.sectionId] = [...new Set(slugs)];
  }

  // Any concept not claimed by a section is attached to the section whose
  // flashcard deck references it, so nothing is orphaned in the UI.
  const claimed = new Set(Object.values(conceptSections).flat());
  for (const deck of sectionDecks) {
    if (!deck.sectionId) continue;
    for (const link of deck.related) {
      if (knownPages.has(link.slug) && !claimed.has(link.slug)) {
        conceptSections[deck.sectionId].push(link.slug);
        claimed.add(link.slug);
      }
    }
  }

  // The Q&A README carries an explicit concept -> section coverage table, which
  // catches the remaining pages that no deck or section header mentions.
  const qaReadme = path.join(QA_DIR, 'README.md');
  if (fs.existsSync(qaReadme)) {
    const coverage = read(qaReadme).matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|\s*(\d)\s*\|/gm);
    for (const match of coverage) {
      const slug = match[1];
      const sectionId = Number(match[2]);
      if (!knownPages.has(slug) || !conceptSections[sectionId]) continue;
      if (!conceptSections[sectionId].includes(slug)) {
        conceptSections[sectionId].push(slug);
        claimed.add(slug);
      }
    }
  }

  // Finally, fall back to the roadmap track a concept belongs to, so every page
  // is reachable from a section even if the vault never states the mapping.
  const trackToSection = { 1: 1, 2: 3, 3: 1, 4: 1, 5: 2, 6: 4, 7: 4, 8: 5, 9: 6, 10: 1 };
  for (const track of roadmap.tracks) {
    const sectionId = trackToSection[track.number];
    if (!sectionId || !conceptSections[sectionId]) continue;
    for (const step of track.steps) {
      if (knownPages.has(step.slug) && !claimed.has(step.slug)) {
        conceptSections[sectionId].push(step.slug);
        claimed.add(step.slug);
      }
    }
  }

  const content = {
    generatedAt: new Date().toISOString(),
    examFacts: EXAM_FACTS,
    sections: EXAM_SECTIONS,
    stats: {
      concepts: concepts.length,
      decks: topicDecks.length + sectionDecks.length,
      cards: allCards.length,
      questions: allQuestions.length,
      tracks: roadmap.tracks.length,
      wikiLinks: concepts.reduce((sum, c) => sum + c.related.length + c.prerequisites.length, 0),
    },
    roadmap,
    revision,
    concepts,
    decks: [...sectionDecks, ...topicDecks],
    qa: qaFiles,
    conceptSections,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'content.json'), JSON.stringify(content));

  // A compact search index keeps the initial payload small. Concept text is
  // taken from the rendered explanation so the index needs no extra field.
  const searchIndex = [
    ...concepts.map((c) => ({
      type: 'concept',
      slug: c.slug,
      title: c.title,
      text: `${c.coreIdea} ${stripMarkdown(c.explanationHtml)}`.slice(0, 1200),
    })),
    ...allQuestions.map((q) => ({
      type: 'question',
      slug: q.id,
      title: `${q.topic} — ${q.question.slice(0, 80)}`,
      text: `${q.question} ${q.answer}`.slice(0, 600),
    })),
    ...allCards.map((c) => ({
      type: 'card',
      slug: c.id,
      title: c.front.slice(0, 90),
      text: `${c.front} ${c.back}`.slice(0, 400),
    })),
  ];
  fs.writeFileSync(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(searchIndex));

  // GitHub Pages caches assets aggressively, so stamp a content hash into the
  // HTML asset URLs. Without this, returning visitors keep running old JS.
  const hash = crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(SITE_DIR, 'assets', 'app.js')))
    .update(fs.readFileSync(path.join(SITE_DIR, 'assets', 'app.css')))
    .digest('hex')
    .slice(0, 10);

  const indexPath = path.join(SITE_DIR, 'index.html');
  const html = fs
    .readFileSync(indexPath, 'utf8')
    // Match the placeholder on a fresh checkout, or a previously stamped hash.
    .replace(/(\?v=)(?:__BUILD__|[a-f0-9]{10})/g, `$1${hash}`);
  fs.writeFileSync(indexPath, html);

  console.log('Built site data:');
  console.log(`  concepts   ${content.stats.concepts}`);
  console.log(`  decks      ${content.stats.decks}`);
  console.log(`  cards      ${content.stats.cards}`);
  console.log(`  questions  ${content.stats.questions}`);
  console.log(`  tracks     ${content.stats.tracks}`);
  console.log(`  asset hash ${hash}`);
  console.log(`  output     ${path.relative(ROOT, OUT_DIR)}`);
}

build();
