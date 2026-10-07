'use strict';

/* ==========================================================================
   Marketing Cloud Next — Certification Instructor
   Single-page app over docs/data/content.json. No dependencies.
   ========================================================================== */

const state = {
  content: null,
  searchIndex: [],
  route: { view: 'dashboard', param: null },
  progress: null,
  quiz: null,
  deck: null,
};

const STORAGE_KEY = 'mcnext-instructor-progress-v1';

// The build stamps a content hash into this script's URL (?v=…). Reuse it so
// the data files are cache-busted in lockstep with the code that reads them.
const ASSET_VERSION = (() => {
  const el = document.querySelector('script[src*="app.js"]');
  if (!el) return '';
  try {
    return new URL(el.src, location.href).searchParams.get('v') || '';
  } catch {
    return '';
  }
})();

/* ---------- Progress store ---------- */

const DEFAULT_PROGRESS = {
  conceptsRead: {},
  cards: {},
  quizHistory: [],
  theme: 'dark',
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch {
    /* storage unavailable (private mode) — progress is simply not persisted */
  }
}

/* ---------- Spaced repetition (SM-2 lite) ---------- */

const RATINGS = {
  again: { label: 'Again', key: '1', quality: 0 },
  hard: { label: 'Hard', key: '2', quality: 3 },
  good: { label: 'Good', key: '3', quality: 4 },
  easy: { label: 'Easy', key: '4', quality: 5 },
};

function scheduleCard(cardId, rating) {
  const now = Date.now();
  const existing = state.progress.cards[cardId] || { ease: 2.5, interval: 0, reps: 0, due: 0 };
  const q = RATINGS[rating].quality;

  let { ease, interval, reps } = existing;

  if (q < 3) {
    reps = 0;
    interval = 0;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ease);
    ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  }

  const due = interval === 0 ? now : now + interval * 86400000;

  state.progress.cards[cardId] = {
    ease: Number(ease.toFixed(2)),
    interval,
    reps,
    due,
    lastRating: rating,
    lastSeen: now,
  };
  saveProgress();
}

function isCardDue(cardId) {
  const entry = state.progress.cards[cardId];
  if (!entry) return true;
  return entry.due <= Date.now();
}

function deckStats(deck) {
  const seen = deck.cards.filter((c) => state.progress.cards[c.id]).length;
  const due = deck.cards.filter((c) => isCardDue(c.id)).length;
  const mastered = deck.cards.filter((c) => {
    const e = state.progress.cards[c.id];
    return e && e.interval >= 6;
  }).length;
  return { seen, due, mastered, total: deck.cards.length };
}

/* ---------- Helpers ---------- */

const $ = (sel, root = document) => root.querySelector(sel);

function esc(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toast(message) {
  let el = $('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 1900);
}

function sectionById(id) {
  return state.content.sections.find((s) => s.id === id);
}

function conceptBySlug(slug) {
  return state.content.concepts.find((c) => c.slug === slug);
}

function deckBySlug(slug) {
  return state.content.decks.find((d) => d.slug === slug);
}

function qaBySlug(slug) {
  return state.content.qa.find((f) => f.slug === slug);
}

/* ---------- Router ---------- */

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [view, param] = hash.split('/');
  return { view: view || 'dashboard', param: param ? decodeURIComponent(param) : null };
}

function navigate(view, param) {
  const hash = param ? `#/${view}/${encodeURIComponent(param)}` : `#/${view}`;
  if (location.hash === hash) render();
  else location.hash = hash;
}

/* ---------- Shell ---------- */

function renderSidebar() {
  const { stats, sections } = state.content;
  const active = state.route.view;

  const navItem = (view, param, icon, label, count) => {
    const isActive = active === view && (param ? state.route.param === param : true);
    return `<button class="nav-item${isActive ? ' active' : ''}" data-nav="${view}"${param ? ` data-param="${esc(param)}"` : ''}>
      <span class="ico">${icon}</span><span>${esc(label)}</span>${count !== undefined ? `<span class="count">${count}</span>` : ''}
    </button>`;
  };

  const sectionItems = sections
    .map((s) => {
      const qa = state.content.qa.find((f) => f.sectionId === s.id);
      return navItem('section', String(s.id), `<span style="color:${s.color}">●</span>`, `${s.id}. ${s.name.split(',')[0]}`, qa ? qa.questionCount : 0);
    })
    .join('');

  $('#sidebar').innerHTML = `
    <div class="brand">
      <div class="brand-mark">MC</div>
      <div class="brand-text">
        <div class="brand-title">MC Next Instructor</div>
        <div class="brand-sub">Certification prep</div>
      </div>
    </div>

    <div class="nav-group-label">Study</div>
    ${navItem('dashboard', null, '◈', 'Dashboard')}
    ${navItem('roadmap', null, '⌘', 'Study Roadmap', stats.tracks)}
    ${navItem('revision', null, '⚡', 'Revision Summary')}

    <div class="nav-group-label">Exam Sections</div>
    ${sectionItems}

    <div class="nav-group-label">Practice</div>
    ${navItem('concepts', null, '▤', 'Concept Wiki', stats.concepts)}
    ${navItem('flashcards', null, '⧉', 'Flashcards', stats.cards)}
    ${navItem('quiz', null, '✓', 'Quiz', stats.questions)}

    <div class="sidebar-footer">
      <button class="btn btn-ghost btn-sm" data-nav="progress" style="flex:1">📊 Progress</button>
      <button class="icon-btn" id="theme-toggle" title="Toggle theme">${state.progress.theme === 'dark' ? '☀' : '☾'}</button>
    </div>
  `;
}

/* ---------- Views ---------- */

function viewDashboard() {
  const { stats, sections, examFacts, roadmap } = state.content;
  const readCount = Object.keys(state.progress.conceptsRead).length;
  const quizCount = state.progress.quizHistory.length;
  const avgScore = quizCount
    ? Math.round(state.progress.quizHistory.reduce((s, q) => s + q.percent, 0) / quizCount)
    : 0;

  const sectionRows = sections
    .map((s) => {
      const qa = state.content.qa.find((f) => f.sectionId === s.id);
      const conceptsInSection = state.content.concepts.filter((c) =>
        (state.content.conceptSections[s.id] || []).includes(c.slug)
      ).length;
      return `
      <a class="section-row" href="#/section/${s.id}">
        <div class="section-num" style="background:${s.color}">${s.id}</div>
        <div>
          <div class="section-name">${esc(s.name)}</div>
          <div class="section-meta">${qa ? qa.questionCount : 0} questions · ${conceptsInSection} concepts</div>
          <div class="bar"><div class="bar-fill" style="width:${s.weight}%;background:${s.color}"></div></div>
        </div>
        <div class="section-weight" style="color:${s.color}">${s.weight}%</div>
      </a>`;
    })
    .join('');

  return `
    <div class="page-head">
      <div class="eyebrow">Salesforce Certified</div>
      <h1>Marketing Cloud Next Consultant</h1>
      <p class="page-sub">Your instructor for the ${esc(examFacts.release)} release exam — ${examFacts.scoredQuestions} scored questions, ${examFacts.minutes} minutes, ${examFacts.passMark}% to pass.</p>
    </div>

    <div class="grid grid-4" style="margin-bottom:22px">
      <div class="stat"><div class="stat-value">${stats.concepts}</div><div class="stat-label">Concept pages</div></div>
      <div class="stat"><div class="stat-value">${stats.cards.toLocaleString()}</div><div class="stat-label">Flashcards</div></div>
      <div class="stat"><div class="stat-value">${stats.questions}</div><div class="stat-label">Practice questions</div></div>
      <div class="stat"><div class="stat-value">${stats.tracks}</div><div class="stat-label">Learning tracks</div></div>
    </div>

    <div class="grid grid-2" style="margin-bottom:26px">
      <div class="card">
        <div class="eyebrow">Your progress</div>
        <div class="flex-between" style="margin-bottom:12px">
          <div><div class="stat-value">${readCount}<span class="faint" style="font-size:15px">/${stats.concepts}</span></div><div class="stat-label">Concepts read</div></div>
          <div><div class="stat-value">${quizCount}</div><div class="stat-label">Quizzes taken</div></div>
          <div><div class="stat-value" style="color:${avgScore >= examFacts.passMark ? 'var(--good)' : 'var(--text)'}">${avgScore}%</div><div class="stat-label">Avg score</div></div>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${Math.round((readCount / stats.concepts) * 100)}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></div></div>
        <div class="small faint" style="margin-top:8px">Pass mark is ${examFacts.passMark}% — aim for 85%+ before booking.</div>
      </div>

      <div class="card">
        <div class="eyebrow">Start here</div>
        <div class="grid" style="gap:9px">
          <button class="btn btn-primary" data-nav="quiz" style="justify-content:center">✓ Take a practice quiz</button>
          <button class="btn" data-nav="flashcards" style="justify-content:center">⧉ Drill flashcards</button>
          <button class="btn" data-nav="roadmap" style="justify-content:center">⌘ Follow the study roadmap</button>
          <button class="btn" data-nav="revision" style="justify-content:center">⚡ Cram with the revision summary</button>
        </div>
      </div>
    </div>

    <h2>Exam blueprint</h2>
    <p class="small muted" style="margin-top:-6px;margin-bottom:14px">Weighted exactly as the real exam. Section 4 is worth more than Sections 1, 2 and 6 combined.</p>
    <div class="grid" style="gap:9px">${sectionRows}</div>

    <h2>Exam facts</h2>
    <div class="grid grid-3">
      <div class="card card-pad-sm"><div class="stat-label">Scored questions</div><div style="font-weight:650">${examFacts.scoredQuestions} <span class="faint small">+ up to ${examFacts.unscoredQuestions} unscored</span></div></div>
      <div class="card card-pad-sm"><div class="stat-label">Time limit</div><div style="font-weight:650">${examFacts.minutes} minutes</div></div>
      <div class="card card-pad-sm"><div class="stat-label">Pass mark</div><div style="font-weight:650">${examFacts.passMark}%</div></div>
      <div class="card card-pad-sm"><div class="stat-label">Release</div><div style="font-weight:650">${esc(examFacts.release)}</div></div>
      <div class="card card-pad-sm"><div class="stat-label">Prerequisite</div><div style="font-weight:650">${esc(examFacts.prerequisite)}</div></div>
      <div class="card card-pad-sm"><div class="stat-label">Reference materials</div><div style="font-weight:650">${esc(examFacts.referenceMaterials)}</div></div>
    </div>
  `;
}

function viewSection(sectionId) {
  const section = sectionById(Number(sectionId));
  if (!section) return notFound();

  const qa = state.content.qa.find((f) => f.sectionId === section.id);
  const deck = state.content.decks.find((d) => d.sectionId === section.id);
  const revision = state.content.revision.sections.find((s) => s.sectionId === section.id);
  const concepts = state.content.concepts.filter((c) =>
    (state.content.conceptSections[section.id] || []).includes(c.slug)
  );

  const conceptList = concepts.length
    ? concepts.map((c) => `
        <a class="list-item" href="#/concept/${encodeURIComponent(c.slug)}">
          <div class="list-item-title">${esc(c.title)}</div>
          <div class="list-item-desc">${esc(c.coreIdea.slice(0, 150))}${c.coreIdea.length > 150 ? '…' : ''}</div>
        </a>`).join('')
    : '<div class="empty small">Concept mapping for this section is derived from the roadmap and Q&A coverage tables.</div>';

  return `
    <div class="breadcrumb"><a href="#/dashboard">Dashboard</a> <span>›</span> <span>Section ${section.id}</span></div>
    <div class="page-head">
      <div class="eyebrow" style="color:${section.color}">Exam section ${section.id} · ${section.weight}% of exam</div>
      <h1>${esc(section.name)}</h1>
      <p class="page-sub">${qa ? qa.questionCount : 0} practice questions · ${deck ? deck.cardCount : 0} flashcards · ${concepts.length} concept pages</p>
    </div>

    <div class="toolbar">
      ${qa ? `<button class="btn btn-primary" data-quiz-section="${section.id}">✓ Quiz this section (${qa.questionCount})</button>` : ''}
      ${deck ? `<button class="btn" data-nav="deck" data-param="${esc(deck.slug)}">⧉ Drill flashcards (${deck.cardCount})</button>` : ''}
      ${qa ? `<button class="btn" data-nav="qa" data-param="${esc(qa.slug)}">▤ Read all Q&amp;A</button>` : ''}
    </div>

    ${revision ? `
      <h2>Revision summary</h2>
      <div class="card prose">${revision.html}</div>
    ` : ''}

    <h2>Concept pages</h2>
    <div class="grid" style="gap:9px">${conceptList}</div>
  `;
}

function viewConcepts() {
  const concepts = state.content.concepts;
  return `
    <div class="page-head">
      <div class="eyebrow">Reference</div>
      <h1>Concept Wiki</h1>
      <p class="page-sub">${concepts.length} atomic concept pages. Each states a core idea, its prerequisites, the mechanism, the common pitfalls, and active-recall questions.</p>
    </div>
    <div class="toolbar">
      <input class="filter-input" id="concept-filter" placeholder="Filter concepts…" autocomplete="off">
      <span class="small faint" id="concept-count">${concepts.length} pages</span>
    </div>
    <div class="grid" style="gap:9px" id="concept-list">
      ${concepts.map((c) => {
        const read = state.progress.conceptsRead[c.slug];
        return `
        <a class="list-item" href="#/concept/${encodeURIComponent(c.slug)}" data-search="${esc((c.title + ' ' + c.coreIdea).toLowerCase())}">
          <div class="list-item-title">${esc(c.title)} ${read ? '<span class="chip chip-good">read</span>' : ''}</div>
          <div class="list-item-desc">${esc(c.coreIdea.slice(0, 170))}${c.coreIdea.length > 170 ? '…' : ''}</div>
        </a>`;
      }).join('')}
    </div>
  `;
}

function viewConcept(slug) {
  const c = conceptBySlug(slug);
  if (!c) return notFound();

  const read = !!state.progress.conceptsRead[c.slug];
  const related = c.related.map((r) => {
    const target = conceptBySlug(r.slug);
    return target
      ? `<a class="chip chip-accent" href="#/concept/${encodeURIComponent(r.slug)}">${esc(target.title)}</a>`
      : `<span class="chip">${esc(r.label)}</span>`;
  }).join('');

  const prereqs = c.prerequisites.map((r) => {
    const target = conceptBySlug(r.slug);
    return target
      ? `<a class="chip" href="#/concept/${encodeURIComponent(r.slug)}">${esc(target.title)}</a>`
      : `<span class="chip">${esc(r.label)}</span>`;
  }).join('');

  return `
    <div class="breadcrumb"><a href="#/dashboard">Dashboard</a> <span>›</span> <a href="#/concepts">Concept Wiki</a> <span>›</span> <span>${esc(c.title)}</span></div>

    <div class="page-head">
      <h1>${esc(c.title)}</h1>
      <div class="toolbar" style="margin-top:10px;margin-bottom:0">
        <button class="btn btn-sm ${read ? '' : 'btn-primary'}" id="mark-read" data-slug="${esc(c.slug)}">
          ${read ? '✓ Read' : 'Mark as read'}
        </button>
        <button class="btn btn-sm" data-nav="quiz" data-quiz-concept="${esc(c.slug)}">✓ Quiz me on this</button>
      </div>
    </div>

    <div class="callout callout-accent">
      <div class="callout-title">◆ Core idea</div>
      <div class="prose">${c.coreIdeaHtml}</div>
    </div>

    ${prereqs ? `<div style="margin-bottom:18px"><div class="stat-label" style="margin-bottom:7px">Prerequisites</div><div class="chips">${prereqs}</div></div>` : ''}

    <div class="prose">${c.explanationHtml}</div>

    ${c.pitfalls.length ? `
      <div class="callout callout-warn">
        <div class="callout-title">⚠ Common pitfalls</div>
        <ul>${c.pitfallsHtml.map((p) => `<li>${p}</li>`).join('')}</ul>
      </div>` : ''}

    ${c.recallQuestions.length ? `
      <h2>Active recall</h2>
      <p class="small muted" style="margin-top:-6px">Answer these out loud before moving on. If you can't, re-read the explanation.</p>
      <div class="card">
        <ol style="margin:0;padding-left:20px">${c.recallQuestionsHtml.map((q) => `<li style="margin-bottom:7px">${q}</li>`).join('')}</ol>
      </div>` : ''}

    ${related ? `<h2>Related concepts</h2><div class="chips">${related}</div>` : ''}

    ${c.sources.length ? `
      <h2>Sources</h2>
      <ul class="small muted">${c.sourcesHtml.map((s) => `<li>${s}</li>`).join('')}</ul>` : ''}
  `;
}

function viewFlashcards() {
  const sectionDecks = state.content.decks.filter((d) => d.kind === 'section');
  const topicDecks = state.content.decks.filter((d) => d.kind === 'topic');

  const deckCard = (d) => {
    const s = deckStats(d);
    const pct = Math.round((s.mastered / s.total) * 100);
    const section = d.sectionId ? sectionById(d.sectionId) : null;
    return `
      <a class="list-item" href="#/deck/${encodeURIComponent(d.slug)}">
        <div class="list-item-title">
          ${section ? `<span class="chip" style="background:${section.color};color:#fff;border-color:transparent">§${section.id}</span>` : ''}
          ${esc(d.title.replace(/^Flashcards — /, ''))}
        </div>
        <div class="list-item-desc">${d.cardCount} cards · ${s.due} due · ${s.mastered} mastered</div>
        <div class="bar"><div class="bar-fill" style="width:${pct}%;background:var(--good)"></div></div>
      </a>`;
  };

  return `
    <div class="page-head">
      <div class="eyebrow">Active recall</div>
      <h1>Flashcards</h1>
      <p class="page-sub">${state.content.stats.cards.toLocaleString()} cards across ${state.content.stats.decks} decks, with spaced repetition. Rate each card and it comes back when you're about to forget it.</p>
    </div>

    <h2>By exam section</h2>
    <div class="grid grid-2">${sectionDecks.map(deckCard).join('')}</div>

    <h2>By topic</h2>
    <div class="grid grid-2">${topicDecks.map(deckCard).join('')}</div>
  `;
}

function viewDeck(slug) {
  const deck = deckBySlug(slug);
  if (!deck) return notFound();

  const s = deckStats(deck);
  const section = deck.sectionId ? sectionById(deck.sectionId) : null;

  return `
    <div class="breadcrumb"><a href="#/dashboard">Dashboard</a> <span>›</span> <a href="#/flashcards">Flashcards</a> <span>›</span> <span>${esc(deck.title.replace(/^Flashcards — /, ''))}</span></div>
    <div class="page-head">
      ${section ? `<div class="eyebrow" style="color:${section.color}">Section ${section.id} · ${section.weight}%</div>` : ''}
      <h1>${esc(deck.title.replace(/^Flashcards — /, ''))}</h1>
      <p class="page-sub">${deck.cardCount} cards · ${s.due} due · ${s.mastered} mastered</p>
    </div>

    <div class="toolbar">
      <button class="btn btn-primary" id="start-deck" data-slug="${esc(deck.slug)}">▶ Start drilling</button>
      <button class="btn" id="start-deck-all" data-slug="${esc(deck.slug)}">▶ All cards (ignore schedule)</button>
      <button class="btn btn-ghost" id="reset-deck" data-slug="${esc(deck.slug)}">Reset deck</button>
    </div>

    ${deck.metaHtml ? `<div class="callout callout-accent"><div class="prose">${deck.metaHtml}</div></div>` : ''}

    <div id="deck-runner"></div>

    <h2>All cards in this deck</h2>
    <div class="grid" style="gap:8px">
      ${deck.cards.map((c, i) => {
        const entry = state.progress.cards[c.id];
        const badge = !entry ? '<span class="chip">new</span>'
          : entry.interval >= 6 ? '<span class="chip chip-good">mastered</span>'
          : `<span class="chip chip-warn">${entry.interval}d</span>`;
        return `
        <details class="card card-pad-sm">
          <summary style="cursor:pointer;font-size:13.5px;font-weight:600;display:flex;align-items:center;gap:8px">
            <span class="faint mono small">${i + 1}</span>
            <span style="flex:1">${esc(c.front)}</span>
            ${badge}
          </summary>
          <div class="prose" style="margin-top:11px;padding-top:11px;border-top:1px solid var(--border-soft)">${c.backHtml}</div>
        </details>`;
      }).join('')}
    </div>
  `;
}

function viewQuiz() {
  const { qa, sections, stats } = state.content;
  const history = state.progress.quizHistory.slice(-5).reverse();

  const sectionCards = qa.map((f) => {
    const s = sectionById(f.sectionId);
    return `
      <a class="list-item" href="#/qa/${encodeURIComponent(f.slug)}">
        <div class="list-item-title">
          <span class="chip" style="background:${s.color};color:#fff;border-color:transparent">§${s.id}</span>
          ${esc(s.name)}
        </div>
        <div class="list-item-desc">${f.questionCount} questions · ${s.weight}% of exam</div>
      </a>`;
  }).join('');

  return `
    <div class="page-head">
      <div class="eyebrow">Practice</div>
      <h1>Quiz</h1>
      <p class="page-sub">${stats.questions} scenario questions written in Salesforce's exam house style. Answer each one out loud, reveal the model answer, then grade yourself — every question includes the rationale and the trap it sets.</p>
    </div>

    <div class="card" style="margin-bottom:22px">
      <div class="eyebrow">Quick start</div>
      <div class="toolbar" style="margin-bottom:0">
        <button class="btn btn-primary" data-quiz-random="20">⚡ 20 random questions</button>
        <button class="btn" data-quiz-random="10">10 random questions</button>
        <button class="btn" data-quiz-random="50">50 random questions</button>
        <button class="btn" data-quiz-mock="1">🎯 Full mock exam (60)</button>
      </div>
    </div>

    <div id="quiz-runner"></div>

    ${history.length ? `
      <h2>Recent attempts</h2>
      <div class="grid" style="gap:8px">
        ${history.map((h) => `
          <div class="card card-pad-sm flex-between">
            <div>
              <div style="font-weight:650;font-size:13.5px">${esc(h.label)}</div>
              <div class="small faint">${new Date(h.date).toLocaleString()}</div>
            </div>
            <div style="text-align:right">
              <div class="stat-value" style="font-size:19px;color:${h.percent >= 72 ? 'var(--good)' : 'var(--bad)'}">${h.percent}%</div>
              <div class="small faint">${h.correct}/${h.total}</div>
            </div>
          </div>`).join('')}
      </div>` : ''}

    <h2>By exam section</h2>
    <div class="grid grid-2">${sectionCards}</div>
  `;
}

function viewQa(slug) {
  const f = qaBySlug(slug);
  if (!f) return notFound();
  const s = sectionById(f.sectionId);

  return `
    <div class="breadcrumb"><a href="#/dashboard">Dashboard</a> <span>›</span> <a href="#/quiz">Quiz</a> <span>›</span> <span>Section ${s.id}</span></div>
    <div class="page-head">
      <div class="eyebrow" style="color:${s.color}">Section ${s.id} · ${s.weight}% of exam</div>
      <h1>${esc(s.name)}</h1>
      <p class="page-sub">${f.questionCount} scenario questions with full reasoning.</p>
    </div>

    <div class="toolbar">
      <button class="btn btn-primary" data-quiz-section="${s.id}">✓ Quiz this section</button>
      <button class="btn" data-nav="section" data-param="${s.id}">← Section overview</button>
    </div>

    <div class="grid" style="gap:11px">
      ${f.questions.map((q) => `
        <details class="card">
          <summary style="cursor:pointer;font-weight:650;font-size:14.5px;display:flex;gap:9px;align-items:baseline">
            <span class="faint mono small">Q${q.number}</span>
            <span style="flex:1">${esc(q.topic)}</span>
          </summary>
          <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border-soft)">
            <div class="prose">${q.questionHtml}</div>
            <div class="callout callout-good">
              <div class="callout-title">✓ Answer</div>
              <div class="prose">${q.answerHtml}</div>
            </div>
            <div class="prose"><strong>Why:</strong> ${q.whyHtml.replace(/^<p>/, '').replace(/<\/p>$/, '')}</div>
            ${q.distractorHtml ? `<div class="callout callout-warn"><div class="prose">${q.distractorHtml}</div></div>` : ''}
          </div>
        </details>`).join('')}
    </div>
  `;
}

function viewRoadmap() {
  const { roadmap } = state.content;
  const readCount = Object.keys(state.progress.conceptsRead).length;

  const tracks = roadmap.tracks.map((t) => {
    const done = t.steps.filter((s) => state.progress.conceptsRead[s.slug]).length;
    const pct = Math.round((done / t.steps.length) * 100);
    return `
      <div class="track-card">
        <div class="track-head">
          <div class="track-num">${t.number}</div>
          <div style="flex:1">
            <div class="track-title">${esc(t.title)}</div>
            <div class="small faint">${done}/${t.steps.length} complete</div>
          </div>
          <div class="stat-value" style="font-size:16px;color:${pct === 100 ? 'var(--good)' : 'var(--text-dim)'}">${pct}%</div>
        </div>
        <div class="bar" style="margin-bottom:11px"><div class="bar-fill" style="width:${pct}%;background:var(--good)"></div></div>
        <div class="track-steps">
          ${t.steps.map((s, i) => {
            const c = conceptBySlug(s.slug);
            const isDone = !!state.progress.conceptsRead[s.slug];
            return `
              <a class="track-step${isDone ? ' done' : ''}" href="#/concept/${encodeURIComponent(s.slug)}">
                <span class="track-step-num">${i + 1}</span>
                <span class="track-step-name">${esc(c ? c.title : s.label)}</span>
              </a>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="page-head">
      <div class="eyebrow">Guided path</div>
      <h1>Study Roadmap</h1>
      <p class="page-sub">${roadmap.tracks.length} sequential tracks, basic → advanced. ${roadmap.totalSteps} concept pages in dependency order — later pages assume earlier ones.</p>
    </div>

    <div class="card" style="margin-bottom:22px">
      <div class="flex-between">
        <div>
          <div class="stat-value">${readCount}<span class="faint" style="font-size:15px">/${roadmap.totalSteps}</span></div>
          <div class="stat-label">Roadmap pages read</div>
        </div>
        <div style="flex:1;max-width:340px">
          <div class="bar"><div class="bar-fill" style="width:${Math.round((readCount / roadmap.totalSteps) * 100)}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></div></div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">${tracks}</div>
  `;
}

function viewRevision() {
  const { revision } = state.content;
  return `
    <div class="page-head">
      <div class="eyebrow">Cram mode</div>
      <h1>Exam Revision Summary</h1>
      <p class="page-sub">Consolidated revision ordered by exam weight — highest-value section first. Use this in the final week.</p>
    </div>
    <div class="toolbar">
      ${revision.sections.map((s) => {
        const sec = sectionById(s.sectionId);
        return `<button class="btn btn-sm" data-scroll-to="rev-${s.sectionId}"><span style="color:${sec.color}">●</span> §${s.sectionId} · ${s.weight}%</button>`;
      }).join('')}
    </div>
    ${revision.sections.map((s) => {
      const sec = sectionById(s.sectionId);
      return `
        <div id="rev-${s.sectionId}" style="margin-bottom:30px">
          <div class="flex-between" style="margin-bottom:12px">
            <h2 style="margin:0"><span style="color:${sec.color}">§${s.sectionId}</span> ${esc(s.name)}</h2>
            <span class="chip" style="background:${sec.color};color:#fff;border-color:transparent">${s.weight}% of exam</span>
          </div>
          <div class="card prose">${s.html}</div>
        </div>`;
    }).join('')}
  `;
}

function viewProgress() {
  const { stats, sections } = state.content;
  const readCount = Object.keys(state.progress.conceptsRead).length;
  const cardEntries = Object.values(state.progress.cards);
  const mastered = cardEntries.filter((c) => c.interval >= 6).length;
  const learning = cardEntries.filter((c) => c.interval > 0 && c.interval < 6).length;
  const history = state.progress.quizHistory.slice().reverse();

  const sectionProgress = sections.map((s) => {
    const qa = state.content.qa.find((f) => f.sectionId === s.id);
    const attempts = state.progress.quizHistory.filter((h) => h.sectionId === s.id);
    const best = attempts.length ? Math.max(...attempts.map((a) => a.percent)) : null;
    return `
      <div class="card card-pad-sm">
        <div class="flex-between" style="margin-bottom:6px">
          <div style="font-weight:650;font-size:13.5px"><span style="color:${s.color}">●</span> §${s.id} ${esc(s.name.split(',')[0])}</div>
          <div class="stat-value" style="font-size:17px;color:${best === null ? 'var(--text-faint)' : best >= 72 ? 'var(--good)' : 'var(--bad)'}">${best === null ? '—' : best + '%'}</div>
        </div>
        <div class="small faint">${attempts.length} attempt${attempts.length === 1 ? '' : 's'} · ${qa ? qa.questionCount : 0} questions available</div>
      </div>`;
  }).join('');

  return `
    <div class="page-head">
      <div class="eyebrow">Your data</div>
      <h1>Progress</h1>
      <p class="page-sub">Stored locally in your browser. Nothing is uploaded anywhere.</p>
    </div>

    <div class="grid grid-4" style="margin-bottom:22px">
      <div class="stat"><div class="stat-value">${readCount}<span class="faint" style="font-size:15px">/${stats.concepts}</span></div><div class="stat-label">Concepts read</div></div>
      <div class="stat"><div class="stat-value">${mastered}</div><div class="stat-label">Cards mastered</div></div>
      <div class="stat"><div class="stat-value">${learning}</div><div class="stat-label">Cards learning</div></div>
      <div class="stat"><div class="stat-value">${state.progress.quizHistory.length}</div><div class="stat-label">Quizzes taken</div></div>
    </div>

    <h2>Best score by section</h2>
    <div class="grid grid-2">${sectionProgress}</div>

    <h2>Quiz history</h2>
    ${history.length ? `
      <div class="grid" style="gap:8px">
        ${history.map((h) => `
          <div class="card card-pad-sm flex-between">
            <div>
              <div style="font-weight:650;font-size:13.5px">${esc(h.label)}</div>
              <div class="small faint">${new Date(h.date).toLocaleString()}</div>
            </div>
            <div style="text-align:right">
              <div class="stat-value" style="font-size:19px;color:${h.percent >= 72 ? 'var(--good)' : 'var(--bad)'}">${h.percent}%</div>
              <div class="small faint">${h.correct}/${h.total}</div>
            </div>
          </div>`).join('')}
      </div>` : '<div class="empty"><div class="empty-icon">📊</div>No quizzes taken yet.</div>'}

    <h2>Danger zone</h2>
    <div class="card">
      <div class="flex-between">
        <div>
          <div style="font-weight:650">Reset all progress</div>
          <div class="small faint">Clears read concepts, flashcard scheduling, and quiz history.</div>
        </div>
        <button class="btn" id="reset-all" style="color:var(--bad);border-color:var(--bad)">Reset everything</button>
      </div>
    </div>
  `;
}

function notFound() {
  return `<div class="empty"><div class="empty-icon">🔍</div><h2>Not found</h2><p>That page doesn't exist.</p><a class="btn" href="#/dashboard">Back to dashboard</a></div>`;
}

/* ---------- Flashcard runner ---------- */

function startDeck(slug, ignoreSchedule) {
  const deck = deckBySlug(slug);
  if (!deck) return;

  let queue = ignoreSchedule ? shuffle(deck.cards) : shuffle(deck.cards.filter((c) => isCardDue(c.id)));
  if (!queue.length) {
    toast('Nothing due — drilling the whole deck instead');
    queue = shuffle(deck.cards);
  }

  state.deck = { deck, queue, index: 0, flipped: false, reviewed: 0, ignoreSchedule };
  renderDeckRunner();
}

function renderDeckRunner() {
  const runner = $('#deck-runner');
  if (!runner || !state.deck) return;

  const { deck, queue, index, flipped } = state.deck;

  if (index >= queue.length) {
    runner.innerHTML = `
      <div class="card" style="text-align:center;padding:34px">
        <div style="font-size:34px;margin-bottom:8px">🎉</div>
        <h2 style="margin:0 0 6px">Deck complete</h2>
        <p class="muted">You reviewed ${state.deck.reviewed} card${state.deck.reviewed === 1 ? '' : 's'}.</p>
        <div class="toolbar" style="justify-content:center;margin-bottom:0">
          <button class="btn btn-primary" id="start-deck" data-slug="${esc(deck.slug)}">▶ Drill again</button>
          <button class="btn" data-nav="flashcards">← All decks</button>
        </div>
      </div>`;
    state.deck = null;
    return;
  }

  const card = queue[index];
  const pct = Math.round((index / queue.length) * 100);

  runner.innerHTML = `
    <div class="progress-line">
      <span>${index + 1} / ${queue.length}</span>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span>${deck.title.replace(/^Flashcards — /, '').slice(0, 34)}</span>
    </div>

    <div class="flashcard${flipped ? ' flipped' : ''}" id="flashcard">
      <div class="flashcard-inner">
        <div class="flashcard-face">
          <div class="flashcard-label">Question</div>
          <div class="flashcard-body"><div class="prose">${card.frontHtml}</div></div>
          <div class="flashcard-hint">Click or press Space to reveal</div>
        </div>
        <div class="flashcard-face flashcard-back">
          <div class="flashcard-label">Answer</div>
          <div class="flashcard-body"><div class="prose">${card.backHtml}</div></div>
          <div class="flashcard-hint">Rate your recall below</div>
        </div>
      </div>
    </div>

    ${flipped ? `
      <div class="rate-row">
        ${Object.entries(RATINGS).map(([key, r]) => `
          <button class="rate-btn rate-${key}" data-rate="${key}">
            ${r.label}<span class="rate-key">${r.key}</span>
          </button>`).join('')}
      </div>` : `
      <div class="toolbar" style="justify-content:center">
        <button class="btn btn-primary" id="reveal">Reveal answer</button>
        <button class="btn btn-ghost" id="skip">Skip</button>
      </div>`}
  `;
}

function rateCard(rating) {
  if (!state.deck) return;
  const card = state.deck.queue[state.deck.index];
  scheduleCard(card.id, rating);
  state.deck.reviewed += 1;
  state.deck.index += 1;
  state.deck.flipped = false;
  renderDeckRunner();
}

/* ---------- Quiz engine ---------- */

function buildQuiz(questions, label, sectionId) {
  // The vault documents each question's answer, rationale, and the trap it sets.
  // It does not supply a full set of wrong options, so the quiz is a
  // self-assessment: recall the answer, reveal it, then grade yourself honestly.
  const prepared = questions.map((q) => ({ q }));
  return {
    questions: prepared,
    index: 0,
    revealed: false,
    grade: null,
    answers: [],
    label,
    sectionId,
  };
}

function startQuiz(questions, label, sectionId) {
  state.quiz = buildQuiz(questions, label, sectionId);
  renderQuizRunner();
}

function renderQuizRunner() {
  const host = $('#quiz-runner');
  if (!host || !state.quiz) return;

  const { questions, index, revealed, grade, label } = state.quiz;

  if (index >= questions.length) {
    const correct = state.quiz.answers.filter((a) => a.correct).length;
    const total = questions.length;
    const percent = Math.round((correct / total) * 100);
    const pass = percent >= state.content.examFacts.passMark;

    state.progress.quizHistory.push({
      label,
      sectionId: state.quiz.sectionId,
      correct,
      total,
      percent,
      date: Date.now(),
    });
    saveProgress();

    const wrong = state.quiz.answers.filter((a) => !a.correct);

    host.innerHTML = `
      <div class="card" style="text-align:center;padding:30px">
        <div class="quiz-score-ring" style="background:conic-gradient(${pass ? 'var(--good)' : 'var(--bad)'} ${percent * 3.6}deg, var(--bg-elev-2) 0)">
          <div class="quiz-score-inner">
            <div>
              <div class="quiz-score-value" style="color:${pass ? 'var(--good)' : 'var(--bad)'}">${percent}%</div>
              <div class="quiz-score-label">${correct}/${total}</div>
            </div>
          </div>
        </div>
        <h2 style="margin:0 0 6px">${pass ? '✓ Above the pass mark' : '✗ Below the pass mark'}</h2>
        <p class="muted">${pass
          ? `You scored ${percent}% — the real exam requires ${state.content.examFacts.passMark}%.`
          : `You scored ${percent}%. The real exam requires ${state.content.examFacts.passMark}%. Review the explanations below.`}</p>
        <div class="toolbar" style="justify-content:center;margin-bottom:0">
          <button class="btn btn-primary" data-quiz-random="${total}">↻ Retry with new questions</button>
          <button class="btn" data-nav="quiz">← Back to quiz menu</button>
        </div>
      </div>

      ${wrong.length ? `
        <h2>Review your misses (${wrong.length})</h2>
        <div class="grid" style="gap:11px">
          ${wrong.map((a) => `
            <div class="card">
              <div class="flex-between" style="margin-bottom:9px">
                <span class="chip chip-bad">${esc(a.q.topic)}</span>
              </div>
              <div class="prose">${a.q.questionHtml}</div>
              <div class="callout callout-good">
                <div class="callout-title">✓ Correct answer</div>
                <div class="prose">${a.q.answerHtml}</div>
              </div>
              <div class="prose"><strong>Why:</strong> ${a.q.whyHtml.replace(/^<p>/, '').replace(/<\/p>$/, '')}</div>
              ${a.q.distractorHtml ? `<div class="callout callout-warn"><div class="callout-title">⚠️ Distractor logic</div><div class="prose">${a.q.distractorHtml}</div></div>` : ''}
            </div>`).join('')}
        </div>` : `
        <div class="callout callout-good" style="margin-top:20px">
          <div class="callout-title">✓ Perfect score</div>
          <p>Every question correct. Move on to the next section.</p>
        </div>`}
    `;
    state.quiz = null;
    return;
  }

  const item = questions[index];
  const pct = Math.round((index / questions.length) * 100);

  host.innerHTML = `
    <div class="progress-line">
      <span>${index + 1} / ${questions.length}</span>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span>${esc(label)}</span>
    </div>

    <div class="card" style="margin-bottom:14px">
      <div class="chips" style="margin-bottom:11px">
        <span class="chip chip-accent">${esc(item.q.topic)}</span>
        <span class="chip">Q${item.q.number}</span>
      </div>
      <div class="prose">${item.q.questionHtml}</div>
      ${!revealed ? `
        <div class="toolbar" style="margin:16px 0 0">
          <button class="btn btn-primary" id="quiz-reveal">Reveal answer</button>
          <span class="muted" style="font-size:12.5px">Answer it out loud first — that is what the exam tests.</span>
        </div>` : ''}
    </div>

    ${revealed ? `
      <div class="callout callout-good">
        <div class="callout-title">✓ Answer</div>
        <div class="prose">${item.q.answerHtml}</div>
      </div>
      ${item.q.whyHtml ? `<div class="callout"><div class="callout-title">Why</div><div class="prose">${item.q.whyHtml}</div></div>` : ''}
      ${item.q.distractorHtml ? `<div class="callout callout-warn"><div class="callout-title">⚠️ Distractor logic</div><div class="prose">${item.q.distractorHtml}</div></div>` : ''}

      ${grade === null ? `
        <div class="card" style="margin-top:14px">
          <div class="callout-title" style="margin-bottom:10px">Did you get it right?</div>
          <div class="toolbar" style="margin:0">
            <button class="btn btn-good" data-grade="correct">✓ I got it right</button>
            <button class="btn btn-bad" data-grade="wrong">✗ I got it wrong</button>
          </div>
        </div>` : `
        <div class="toolbar" style="margin-top:14px">
          <button class="btn btn-primary" id="quiz-next">${index + 1 === questions.length ? 'See results' : 'Next question →'}</button>
        </div>`}
    ` : ''}
  `;
}

function revealQuizAnswer() {
  if (!state.quiz || state.quiz.revealed) return;
  state.quiz.revealed = true;
  renderQuizRunner();
}

function gradeQuizAnswer(correct) {
  if (!state.quiz || !state.quiz.revealed || state.quiz.grade !== null) return;
  const item = state.quiz.questions[state.quiz.index];
  state.quiz.grade = correct;
  state.quiz.answers.push({ q: item.q, correct });
  renderQuizRunner();
}

function nextQuizQuestion() {
  if (!state.quiz) return;
  state.quiz.index += 1;
  state.quiz.revealed = false;
  state.quiz.grade = null;
  renderQuizRunner();
}

/* ---------- Search ---------- */

function runSearch(query) {
  const q = query.trim().toLowerCase();
  const box = $('#search-results');
  if (!box) return;

  if (q.length < 2) {
    box.style.display = 'none';
    return;
  }

  const terms = q.split(/\s+/);
  const results = state.searchIndex
    .map((item) => {
      const haystack = (item.title + ' ' + item.text).toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (!haystack.includes(t)) return null;
        if (item.title.toLowerCase().includes(t)) score += 10;
        score += 1;
      }
      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  if (!results.length) {
    box.innerHTML = '<div class="search-empty">No matches</div>';
    box.style.display = 'block';
    return;
  }

  const typeLabel = { concept: 'Concept', question: 'Question', card: 'Flashcard' };
  box.innerHTML = results.map(({ item }) => {
    let href = '#/dashboard';
    if (item.type === 'concept') href = `#/concept/${encodeURIComponent(item.slug)}`;
    else if (item.type === 'question') href = `#/quiz`;
    else href = `#/flashcards`;
    return `
      <a class="search-result" href="${href}">
        <div class="sr-title">${esc(item.title)}</div>
        <div class="sr-meta">${typeLabel[item.type]}</div>
      </a>`;
  }).join('');
  box.style.display = 'block';
}

/* ---------- Render ---------- */

function render() {
  state.route = parseHash();
  const { view, param } = state.route;

  renderSidebar();

  let html;
  switch (view) {
    case 'dashboard': html = viewDashboard(); break;
    case 'section': html = viewSection(param); break;
    case 'concepts': html = viewConcepts(); break;
    case 'concept': html = viewConcept(param); break;
    case 'flashcards': html = viewFlashcards(); break;
    case 'deck': html = viewDeck(param); break;
    case 'quiz': html = viewQuiz(); break;
    case 'qa': html = viewQa(param); break;
    case 'roadmap': html = viewRoadmap(); break;
    case 'revision': html = viewRevision(); break;
    case 'progress': html = viewProgress(); break;
    default: html = notFound();
  }

  $('#content').innerHTML = html;
  $('#sidebar').classList.remove('open');
  window.scrollTo(0, 0);

  // Deck runner is rendered into its own host after the view is in the DOM.
  if (view === 'deck' && state.deck && state.deck.deck.slug === param) {
    renderDeckRunner();
  }
  if (view === 'quiz' && state.quiz) {
    renderQuizRunner();
  }
}

/* ---------- Events ---------- */

function bindEvents() {
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-nav]');
    if (nav) {
      e.preventDefault();
      navigate(nav.dataset.nav, nav.dataset.param || null);
      return;
    }

    const quizSection = e.target.closest('[data-quiz-section]');
    if (quizSection) {
      const id = Number(quizSection.dataset.quizSection);
      const f = state.content.qa.find((x) => x.sectionId === id);
      if (f) {
        navigate('quiz');
        setTimeout(() => {
          const host = $('#quiz-runner');
          if (host) {
            host.scrollIntoView({ behavior: 'smooth', block: 'start' });
            startQuiz(shuffle(f.questions).slice(0, 20), `Section ${id} quiz`, id);
          }
        }, 60);
      }
      return;
    }

    const quizConcept = e.target.closest('[data-quiz-concept]');
    if (quizConcept) {
      const slug = quizConcept.dataset.quizConcept;
      const concept = conceptBySlug(slug);
      const related = state.content.qa
        .flatMap((f) => f.questions)
        .filter((q) => q.question.toLowerCase().includes(concept.title.toLowerCase().split(' ')[0].toLowerCase()));
      const pool = related.length >= 4 ? related : state.content.qa.flatMap((f) => f.questions);
      navigate('quiz');
      setTimeout(() => {
        const host = $('#quiz-runner');
        if (host) {
          host.scrollIntoView({ behavior: 'smooth', block: 'start' });
          startQuiz(shuffle(pool).slice(0, 10), `Quiz: ${concept.title}`, null);
        }
      }, 60);
      return;
    }

    const quizRandom = e.target.closest('[data-quiz-random]');
    if (quizRandom) {
      const n = Number(quizRandom.dataset.quizRandom);
      const all = state.content.qa.flatMap((f) => f.questions);
      startQuiz(shuffle(all).slice(0, n), `${n} random questions`, null);
      scrollToRunner();
      return;
    }

    const quizMock = e.target.closest('[data-quiz-mock]');
    if (quizMock) {
      // Weighted to the real blueprint: 60 questions distributed by section weight.
      const all = state.content.qa.flatMap((f) => f.questions);
      const picked = [];
      for (const s of state.content.sections) {
        const count = Math.round((s.weight / 100) * 60);
        const pool = shuffle(all.filter((q) => q.id.startsWith(s.slug)));
        picked.push(...pool.slice(0, count));
      }
      startQuiz(shuffle(picked).slice(0, 60), 'Full mock exam', null);
      scrollToRunner();
      return;
    }

    const startDeck = e.target.closest('#start-deck');
    if (startDeck) {
      startDeck_(startDeck.dataset.slug, false);
      return;
    }

    const startDeckAll = e.target.closest('#start-deck-all');
    if (startDeckAll) {
      startDeck_(startDeckAll.dataset.slug, true);
      return;
    }

    const resetDeck = e.target.closest('#reset-deck');
    if (resetDeck) {
      const deck = deckBySlug(resetDeck.dataset.slug);
      deck.cards.forEach((c) => delete state.progress.cards[c.id]);
      saveProgress();
      toast('Deck reset');
      render();
      return;
    }

    const reveal = e.target.closest('#reveal');
    if (reveal) {
      state.deck.flipped = true;
      renderDeckRunner();
      return;
    }

    const skip = e.target.closest('#skip');
    if (skip) {
      state.deck.index += 1;
      state.deck.flipped = false;
      renderDeckRunner();
      return;
    }

    const flashcard = e.target.closest('#flashcard');
    if (flashcard && state.deck) {
      state.deck.flipped = !state.deck.flipped;
      renderDeckRunner();
      return;
    }

    const rate = e.target.closest('[data-rate]');
    if (rate) {
      rateCard(rate.dataset.rate);
      return;
    }

    const quizReveal = e.target.closest('#quiz-reveal');
    if (quizReveal) {
      revealQuizAnswer();
      return;
    }

    const grade = e.target.closest('[data-grade]');
    if (grade) {
      gradeQuizAnswer(grade.dataset.grade === 'correct');
      return;
    }

    const next = e.target.closest('#quiz-next');
    if (next) {
      nextQuizQuestion();
      return;
    }

    const markRead = e.target.closest('#mark-read');
    if (markRead) {
      const slug = markRead.dataset.slug;
      if (state.progress.conceptsRead[slug]) delete state.progress.conceptsRead[slug];
      else state.progress.conceptsRead[slug] = Date.now();
      saveProgress();
      render();
      return;
    }

    const scrollTo = e.target.closest('[data-scroll-to]');
    if (scrollTo) {
      const el = document.getElementById(scrollTo.dataset.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const themeToggle = e.target.closest('#theme-toggle');
    if (themeToggle) {
      state.progress.theme = state.progress.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = state.progress.theme;
      saveProgress();
      renderSidebar();
      return;
    }

    const resetAll = e.target.closest('#reset-all');
    if (resetAll) {
      if (confirm('Reset all progress? This cannot be undone.')) {
        state.progress = { ...DEFAULT_PROGRESS, theme: state.progress.theme };
        saveProgress();
        toast('Progress reset');
        render();
      }
      return;
    }

    const mobileToggle = e.target.closest('#mobile-toggle');
    if (mobileToggle) {
      $('#sidebar').classList.toggle('open');
      return;
    }

    // Close search when clicking outside it.
    if (!e.target.closest('.search-wrap')) {
      const box = $('#search-results');
      if (box) box.style.display = 'none';
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') runSearch(e.target.value);
    if (e.target.id === 'concept-filter') {
      const q = e.target.value.toLowerCase();
      const items = document.querySelectorAll('#concept-list .list-item');
      let visible = 0;
      items.forEach((el) => {
        const match = el.dataset.search.includes(q);
        el.style.display = match ? '' : 'none';
        if (match) visible += 1;
      });
      const counter = $('#concept-count');
      if (counter) counter.textContent = `${visible} pages`;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    if (state.deck) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!state.deck.flipped) {
          state.deck.flipped = true;
          renderDeckRunner();
        }
        return;
      }
      if (state.deck.flipped && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const map = { 1: 'again', 2: 'hard', 3: 'good', 4: 'easy' };
        rateCard(map[e.key]);
        return;
      }
    }

    if (state.quiz && state.quiz.grade !== null && (e.key === 'Enter' || e.key === 'ArrowRight')) {
      e.preventDefault();
      nextQuizQuestion();
      return;
    }

    if (state.quiz && !state.quiz.revealed && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      revealQuizAnswer();
      return;
    }

    if (state.quiz && state.quiz.revealed && state.quiz.grade === null && ['1', '2'].includes(e.key)) {
      e.preventDefault();
      gradeQuizAnswer(e.key === '1');
    }
  });

  window.addEventListener('hashchange', render);
}

function startDeck_(slug, ignoreSchedule) {
  startDeck(slug, ignoreSchedule);
  const runner = $('#deck-runner');
  if (runner) runner.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToRunner() {
  const runner = $('#quiz-runner');
  if (runner) runner.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- Boot ---------- */

async function boot() {
  state.progress = loadProgress();
  document.documentElement.dataset.theme = state.progress.theme;

  try {
    // The build stamps a hash into this script's own URL, so reuse it to bust
    // the CDN cache on the data files too — otherwise a deploy can pair new
    // code with a stale payload.
    const suffix = ASSET_VERSION ? `?v=${ASSET_VERSION}` : '';
    const [content, searchIndex] = await Promise.all([
      fetch(`data/content.json${suffix}`).then((r) => r.json()),
      fetch(`data/search-index.json${suffix}`).then((r) => r.json()),
    ]);
    state.content = content;
    state.searchIndex = searchIndex;
  } catch (err) {
    $('#content').innerHTML = `
      <div class="empty">
        <div class="empty-icon">⚠</div>
        <h2>Could not load content</h2>
        <p>Run <code>node site/build.js</code> to generate the site data, then reload.</p>
      </div>`;
    return;
  }

  bindEvents();
  render();
}

boot();
