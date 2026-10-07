'use strict';

/**
 * Minimal, dependency-free Markdown -> HTML renderer.
 *
 * Supports the subset actually used by the mc-next-llm-wiki vault:
 *   headings, paragraphs, bold/italic/strikethrough, inline code, links,
 *   [[wiki links]], fenced code blocks, blockquotes, ordered/unordered lists
 *   (including nesting), GitHub-style tables, and horizontal rules.
 *
 * Deliberately not a full CommonMark implementation — it is tuned to this
 * vault's content so the build stays reproducible with zero dependencies.
 */

const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Render inline spans. Code spans are extracted first so their contents are
 * never treated as markup.
 */
function renderInline(text, ctx) {
  const codeSpans = [];
  let out = String(text).replace(/`([^`]+)`/g, (_m, code) => {
    codeSpans.push(code);
    return `\u0000CODE${codeSpans.length - 1}\u0000`;
  });

  out = escapeHtml(out);

  // [[wiki link]] or [[wiki link|label]]
  out = out.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, label) => {
    const slug = target.trim();
    const text = (label || target).trim();
    const known = !ctx || !ctx.knownPages || ctx.knownPages.has(slug);
    const cls = known ? 'wikilink' : 'wikilink wikilink--missing';
    const href = known ? `#/concept/${encodeURIComponent(slug)}` : '#';
    return `<a class="${cls}" href="${href}" data-wiki="${escapeHtml(slug)}">${escapeHtml(text)}</a>`;
  });

  // [label](url)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => {
    const external = /^https?:/i.test(url);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${escapeHtml(url)}"${attrs}>${label}</a>`;
  });

  // Bold, italic, strikethrough
  out = out.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  out = out.replace(/\u0000CODE(\d+)\u0000/g, (_m, i) => `<code>${escapeHtml(codeSpans[Number(i)])}</code>`);

  return out;
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableSeparator(line) {
  return /^\|?[\s:-]*-[\s:|-]*\|?$/.test(line.trim()) && line.includes('-');
}

function renderTable(lines, ctx) {
  const header = splitTableRow(lines[0]);
  const rows = lines.slice(2).map(splitTableRow);
  const head = header.map((cell) => `<th>${renderInline(cell, ctx)}</th>`).join('');
  const body = rows
    .map((row) => {
      const cells = header
        .map((_h, i) => `<td>${renderInline(row[i] === undefined ? '' : row[i], ctx)}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

/**
 * Render a list block. Handles nesting by indentation width.
 */
function renderList(lines, ctx) {
  const items = [];
  let current = null;

  for (const raw of lines) {
    const indent = raw.match(/^ */)[0].length;
    const content = raw.trim().replace(/^([-*+]|\d+\.)\s+/, '');
    if (indent === 0 || !current) {
      current = { indent, content, children: [] };
      items.push(current);
    } else if (indent > current.indent) {
      current.children.push(raw.slice(current.indent + 2));
    } else {
      current = { indent, content, children: [] };
      items.push(current);
    }
  }

  const ordered = /^\s*\d+\.\s/.test(lines[0]);
  const tag = ordered ? 'ol' : 'ul';

  const html = items
    .map((item) => {
      let inner = renderInline(item.content, ctx);
      if (item.children.length) {
        inner += renderList(item.children, ctx);
      }
      return `<li>${inner}</li>`;
    })
    .join('');

  return `<${tag}>${html}</${tag}>`;
}

/**
 * Render a Markdown document to HTML.
 * @param {string} markdown
 * @param {{knownPages?: Set<string>, headingOffset?: number}} [options]
 */
function renderMarkdown(markdown, options = {}) {
  const ctx = { knownPages: options.knownPages };
  const offset = options.headingOffset || 0;
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n');
  const html = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1];
      const body = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1;
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : '';
      html.push(`<pre><code${cls}>${escapeHtml(body.join('\n'))}</code></pre>`);
      continue;
    }

    // Blank line
    if (!line.trim()) {
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
      html.push('<hr>');
      i += 1;
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = Math.min(6, heading[1].length + offset);
      const text = heading[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${renderInline(text, ctx)}</h${level}>`);
      i += 1;
      continue;
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const block = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
        block.push(lines[i]);
        i += 1;
      }
      html.push(renderTable(block, ctx));
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const block = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        block.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      html.push(`<blockquote>${renderMarkdown(block.join('\n'), options)}</blockquote>`);
      continue;
    }

    // List
    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const block = [];
      while (i < lines.length && (/^\s*([-*+]|\d+\.)\s+/.test(lines[i]) || (lines[i].trim() && /^\s{2,}\S/.test(lines[i])))) {
        block.push(lines[i]);
        i += 1;
      }
      html.push(renderList(block, ctx));
      continue;
    }

    // Paragraph
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6})\s/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^\s*([-*+]|\d+\.)\s+/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim());
      i += 1;
    }
    if (para.length) {
      html.push(`<p>${renderInline(para.join(' '), ctx)}</p>`);
    }
  }

  return html.join('\n');
}

/** Strip Markdown syntax down to plain text (for search indexes and previews). */
function toPlainText(markdown) {
  return String(markdown)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, label) => label || target)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = { renderMarkdown, renderInline, toPlainText, slugify, escapeHtml };
