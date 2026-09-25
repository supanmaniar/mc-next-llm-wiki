# Contributing

Thanks for wanting to improve this wiki. This is a study resource, so the bar is **accuracy and clarity** — not volume.

## Ways to Contribute

| Contribution | How |
|---|---|
| 🐛 **Fix an error** | Open an issue or a PR with the correction and a source |
| 📄 **Add a concept page** | Copy `_templates/wiki-page.md` into `concepts/` and follow the format below |
| ❓ **Add practice questions** | Add to the relevant file in `Exam Q&A Study Guide/` |
| 🃏 **Add flashcards** | Add to the relevant deck in `Exam Section Based Flashcards/` |
| 🔗 **Fix a broken wiki link** | Links use `[[page-name]]` — the target must be a file stem in the vault |

## The Concept Page Format

Every page in `concepts/` **must** include these sections, in this order:

```markdown
# Title

## Core Idea
One sentence. Explain it like I'm 5.

## Prerequisites
- [[foundational-concept-1]]
- [[foundational-concept-2]]

## Detailed Explanation
Clear headings, tables, ASCII diagrams, and concrete examples.

## Common Pitfalls / Misconceptions
⚠️ What learners get wrong, and why.

## Active Recall Questions
1. Question?
2. Question?

## Related Concepts
- [[adjacent-topic]]

## Sources
- Source file or official doc reference
```

### Why this format?

The structure is deliberate and serves two audiences at once:

- **Humans** get a predictable shape: thesis → prerequisites → mechanism → traps → self-test.
- **LLMs** get atomic, self-contained chunks that front-load their core idea — ideal for retrieval.

Please don't deviate from it. Consistency is what makes the vault traversable.

## Style Rules

1. **Depth over brevity.** Explain the *why*, not just the *what*. A bulleted list of facts is not a concept page.
2. **Cross-link aggressively.** Use `[[wiki links]]` to connect related ideas. The graph is the value.
3. **Flag traps with ⚠️.** Misconceptions and exam gotchas are the most valuable content here.
4. **Never present an advanced topic without linking its prerequisites.**
5. **Flag contradictions.** If sources disagree, note it explicitly with a ⚠️ rather than silently picking one.
6. **Cite your sources.** Add the source file or official documentation reference.

## Wiki Link Conventions

- Link by **file stem**, not path: `[[consent-cache]]`, not `[[concepts/consent-cache]]`.
- Use `|` for display text: `[[consent-cache|the consent cache]]`.
- Link to headings with `#`: `[[consent-cache#Why a Cache?]]`.
- **Check your links resolve.** A link to a non-existent page is a broken graph edge.

## Adding a New Concept Page

1. Copy `_templates/wiki-page.md` to `concepts/your-topic.md`.
2. Fill in every section from the format above.
3. Add `[[links]]` **from** related existing pages **to** your new page — a page nobody links to is invisible.
4. Add it to the appropriate track in `_index/study-roadmap.md`.
5. Regenerate `llms.txt` if you want it indexed (see below).

## Regenerating `llms.txt`

`llms.txt` is generated from the actual page titles and core ideas. After adding pages, regenerate it so the index stays accurate.

## Accuracy and Versioning

Marketing Cloud Next changes with each release. When you contribute:

- **State the release** your information applies to (e.g., "Summer '26").
- **Prefer official Salesforce documentation** as the source of truth.
- **Don't paste vendor documentation verbatim.** Synthesize it in your own words. This repo deliberately does not redistribute raw Salesforce material.

## What Not to Contribute

- ❌ Raw vendor documentation or copyrighted material
- ❌ Exam dumps or actual exam questions (this repo contains *practice* questions written in exam style, not real exam content)
- ❌ Speculation presented as fact — if you're unsure, say so

## Pull Request Checklist

- [ ] Page follows the required section format
- [ ] All `[[wiki links]]` resolve to real pages
- [ ] Prerequisites are linked
- [ ] At least one ⚠️ pitfall is documented
- [ ] Active recall questions are included
- [ ] Sources are cited
- [ ] Release version is stated where relevant

## License

By contributing, you agree your contributions are licensed under [CC BY 4.0](LICENSE).
