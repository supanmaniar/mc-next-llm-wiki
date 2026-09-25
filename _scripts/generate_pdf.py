#!/usr/bin/env python3
"""Generate a consolidated study guide PDF for Marketing Cloud Next.

Usage:
    pip install -r _scripts/requirements.txt
    python _scripts/generate_pdf.py

Paths are resolved relative to this script, so it works from any directory.
"""
import os, re, sys

# Repo root is the parent of this script's directory.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Prefer a vendored copy if present (legacy), otherwise use the installed package.
_vendor = os.path.join(ROOT, "_scripts", "vendor")
if os.path.isdir(_vendor):
    sys.path.insert(0, _vendor)

try:
    from fpdf import FPDF
except ImportError:
    sys.exit(
        "fpdf2 is not installed.\n"
        "Install it with:  pip install -r _scripts/requirements.txt"
    )

CONCEPTS = os.path.join(ROOT, "concepts")
FLASHCARDS = os.path.join(ROOT, "flashcards")
INDEX = os.path.join(ROOT, "_index")
OUT = os.path.join(ROOT, "Marketing_Cloud_Next_Study_Guide.pdf")

# Track order (page filenames, no extension)
TRACKS = [
    "Study Roadmap",
    "Track 1 — Foundations & Platform Architecture",
    ["marketing-cloud-next-overview", "data-kits-and-data-streams", "data-architecture-layers"],
    "Track 2 — Data Foundation & Identity",
    ["identity-resolution-rulesets", "segments-and-audiences", "data360-segment-types",
     "segment-canvas-and-filters", "people-records-prospects"],
    "Track 3 — Access & Governance",
    ["user-access-and-permission-sets", "business-units"],
    "Track 4 — Channels & Deliverability",
    ["channels-overview", "email-domain-authentication", "domain-settings",
     "domain-warming-ip-infrastructure", "email-sending-setup"],
    "Track 5 — Consent & Compliance",
    ["consent-and-compliance", "web-tracking", "contact-points-activation"],
    "Track 6 — Content & Personalization",
    ["content-and-personalization", "email-building-personalization",
     "marketing-objects-ampscript-handlebars"],
    "Track 7 — Campaign Orchestration",
    ["campaigns-and-flows", "decision-branching-path-experiments", "marketing-triggers",
     "distributed-marketing"],
    "Track 8 — AI & Agentforce",
    ["ai-features", "agentic-marketing", "conversational-marketing", "einstein-segments"],
    "Track 9 — Reporting, Scoring & Optimization",
    ["reporting-analytics-setup", "reporting-metrics-dashboards",
     "opportunity-influence-b2b-analytics", "scoring-models"],
    "Track 10 — DevOps & Limits",
    ["sandbox-and-deployment", "allocations-limits-page-customization"],
]

FLASH_DECKS = [
    "marketing-cloud-next-setup",
    "channels-consent-reporting",
    "campaigns-content-beyond",
    "agentic-conversational-data-email",
    "data360-segmentation",
]

def _find_font(*candidates):
    """Return the first existing font path, or None."""
    for c in candidates:
        if c and os.path.exists(c):
            return c
    return None


# DejaVu is bundled with most Linux distros and is required for Unicode (emoji, arrows).
# Fall back to common system fonts on macOS/Windows so the script still runs.
FONT = _find_font(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    "/Library/Fonts/DejaVuSans.ttf",
    "C:/Windows/Fonts/DejaVuSans.ttf",
    "C:/Windows/Fonts/arial.ttf",
)
FONT_B = _find_font(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
    "/Library/Fonts/DejaVuSans-Bold.ttf",
    "C:/Windows/Fonts/DejaVuSans-Bold.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
)
FONT_O = _find_font(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans-Oblique.ttf",
    "/Library/Fonts/DejaVuSans-Oblique.ttf",
    "C:/Windows/Fonts/DejaVuSans-Oblique.ttf",
    "C:/Windows/Fonts/ariali.ttf",
)
MONO = _find_font(
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/dejavu/DejaVuSansMono.ttf",
    "/Library/Fonts/DejaVuSansMono.ttf",
    "C:/Windows/Fonts/DejaVuSansMono.ttf",
    "C:/Windows/Fonts/consola.ttf",
)

if not FONT:
    sys.exit(
        "No usable TrueType font found.\n"
        "Install DejaVu fonts (e.g. `sudo apt install fonts-dejavu`) and re-run."
    )

MARGIN = 18
PAGE_W = 210
PAGE_H = 297


EMOJI = {
    "✅": "[OK] ", "🟡": "[PARTIAL] ", "❌": "[MISSING] ", "📋": "",
}


def strip_md_inline(text):
    """Convert inline markdown to plain text, removing markers."""
    for emoji, repl in EMOJI.items():
        text = text.replace(emoji, repl)
    # wiki links [[x]] or [[path/x]] -> last component
    text = re.sub(r"\[\[([^\]]+)\]\]", lambda m: m.group(1).split("/")[-1], text)
    # images
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    # links [text](url)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    # bold/italic markers
    text = text.replace("**", "").replace("__", "")
    text = text.replace("`", "")
    return text


class PDF(FPDF):
    def __init__(self):
        super().__init__(format="A4")
        self.set_auto_page_break(auto=True, margin=20)
        self.add_font("DejaVu", "", FONT)
        self.add_font("DejaVu", "B", FONT_B or FONT)
        self.add_font("DejaVu", "I", FONT_O or FONT)
        self.add_font("Mono", "", MONO or FONT)
        self._toc = []
        self._page_for_toc = True

    def header(self):
        if self.page_no() > 2:
            self.set_font("DejaVu", "I", 8)
            self.set_text_color(140, 140, 140)
            self.cell(0, 6, "Marketing Cloud Next — Consultant Exam Study Guide", align="C")
            self.ln(8)
            self.set_y(18)

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font("DejaVu", "", 8)
            self.set_text_color(140, 140, 140)
            self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def _render_inline(self, text):
        """Render a line with mixed bold/italic/regular segments."""
        # pre-process emoji + wiki links before tokenizing (so they render everywhere)
        for emoji, repl in EMOJI.items():
            text = text.replace(emoji, repl)
        text = re.sub(r"\[\[([^\]]+)\]\]", lambda m: m.group(1).split("/")[-1], text)
        self.set_font("DejaVu", "", self.font_size)
        self.set_text_color(30, 30, 30)
        # tokenize **bold** and *italic*
        tokens = re.split(r"(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)", text)
        for tok in tokens:
            if not tok:
                continue
            if tok.startswith("**") and tok.endswith("**"):
                self.set_font("DejaVu", "B", self.font_size)
                self.write(self.font_size + 2, tok[2:-2])
                self.set_font("DejaVu", "", self.font_size)
            elif tok.startswith("`") and tok.endswith("`"):
                self.set_font("Mono", "", self.font_size - 1)
                self.write(self.font_size + 2, tok[1:-1])
                self.set_font("DejaVu", "", self.font_size)
            elif tok.startswith("*") and tok.endswith("*") and len(tok) > 2:
                self.set_font("DejaVu", "I", self.font_size)
                self.write(self.font_size + 2, tok[1:-1])
                self.set_font("DejaVu", "", self.font_size)
            else:
                self.write(self.font_size + 2, tok)

    def heading(self, level, text):
        sizes = {1: 18, 2: 14, 3: 12}
        self.set_font("DejaVu", "B", sizes.get(level, 11))
        self.set_text_color(20, 40, 80)
        y = self.get_y()
        if level == 1:
            self.add_page()
            self._toc.append((1, strip_md_inline(text), self.page_no()))
            y = self.get_y()
        elif level == 2:
            self._toc.append((2, strip_md_inline(text), self.page_no()))
            self.ln(2)
        self.multi_cell(0, 7, strip_md_inline(text))
        self.ln(1.5)
        self.set_text_color(30, 30, 30)

    def paragraph(self, text):
        self.set_font("DejaVu", "", 10)
        text = strip_md_inline(text)
        self._render_inline(text)
        self.ln(5)

    def bullet(self, text):
        self.set_font("DejaVu", "", 10)
        x = self.get_x()
        self.cell(5, 5, "\u2022")
        self.set_x(x + 5)
        self._render_inline(text)
        self.ln(5)

    def numbered(self, text):
        self.set_font("DejaVu", "", 10)
        self.cell(6, 5, "")
        self._render_inline(text)
        self.ln(5)

    def quote(self, text):
        self.set_font("DejaVu", "I", 10)
        self.set_text_color(80, 80, 80)
        self.set_x(MARGIN + 4)
        self.multi_cell(0, 5, strip_md_inline(text))
        self.set_text_color(30, 30, 30)
        self.ln(2)

    def divider(self):
        self.ln(2)
        self.set_draw_color(180, 180, 180)
        self.line(MARGIN, self.get_y(), PAGE_W - MARGIN, self.get_y())
        self.ln(4)

    def code_block(self, lines):
        self.set_font("Mono", "", 8.5)
        self.set_fill_color(245, 245, 245)
        self.set_text_color(20, 20, 20)
        for ln in lines:
            self.ln(0.5)
            self.set_x(MARGIN + 2)
            self.multi_cell(0, 4.5, ln)
        self.set_font("DejaVu", "", 10)
        self.set_text_color(30, 30, 30)
        self.ln(2)

    def table(self, rows):
        """rows: list of lists (first = header)."""
        self.set_font("DejaVu", "", 8.5)
        col_count = max(len(r) for r in rows)
        col_w = (PAGE_W - 2 * MARGIN) / col_count
        for i, row in enumerate(rows):
            cells = row + [""] * (col_count - len(row))
            for c in cells:
                if i == 0:
                    self.set_font("DejaVu", "B", 8.5)
                    self.set_fill_color(230, 235, 245)
                else:
                    self.set_font("DejaVu", "", 8.5)
                    if 40 < self.get_y() > PAGE_H - 15:
                        pass
                self.multi_cell(col_w, 4.5, strip_md_inline(c).replace("<br/>", "\n"),
                                border=1, fill=(i == 0))
            self.ln(0)
        self.ln(3)
        self.set_font("DejaVu", "", 10)


def render_md(pdf, text):
    lines = text.split("\n")
    i = 0
    in_code = False
    code_buf = []
    in_table = False
    table_buf = []
    list_kind = None
    numbered_counter = 0

    def flush_table():
        if table_buf:
            rows = []
            for l in table_buf:
                l = l.strip()
                if l.startswith("|") and l.endswith("|"):
                    cells = [c.strip() for c in l.strip("|").split("|")]
                    if all(re.match(r"^:?-{3,}:?$", c) for c in cells):
                        continue
                    rows.append(cells)
            if rows:
                pdf.table(rows)

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # code fence
        if stripped.startswith("```"):
            if in_code:
                pdf.code_block(code_buf)
                code_buf = []
                in_code = False
            else:
                flush_table()
                in_code = True
            i += 1
            continue
        if in_code:
            code_buf.append(line)
            i += 1
            continue

        # table rows
        if stripped.startswith("|"):
            in_table = True
            table_buf.append(line)
            i += 1
            continue
        else:
            if in_table:
                flush_table()
                in_table = False
                table_buf = []

        # headings
        m = re.match(r"^(#{1,3})\s+(.*)", stripped)
        if m:
            flush_table()
            level = len(m.group(1))
            pdf.heading(level, m.group(2))
            list_kind = None
            i += 1
            continue

        # horizontal rule
        if re.match(r"^-{3,}$", stripped) or re.match(r"^\*{3,}$", stripped):
            flush_table()
            pdf.divider()
            list_kind = None
            i += 1
            continue

        # blockquote
        if stripped.startswith(">"):
            flush_table()
            pdf.quote(stripped.lstrip(">").strip())
            list_kind = None
            i += 1
            continue

        # blank line
        if not stripped:
            flush_table()
            list_kind = None
            i += 1
            continue

        # bullet list
        m = re.match(r"^[-*]\s+(.*)", stripped)
        if m:
            flush_table()
            pdf.bullet(m.group(1))
            list_kind = "ul"
            i += 1
            continue

        # numbered list
        m = re.match(r"^(\d+)[.)]\s+(.*)", stripped)
        if m:
            flush_table()
            numbered_counter = int(m.group(1))
            pdf.numbered(f"{numbered_counter}. {m.group(2)}")
            list_kind = "ol"
            i += 1
            continue

        # normal paragraph
        flush_table()
        pdf.paragraph(stripped)
        i += 1


def cover(pdf):
    pdf.add_page()
    pdf.set_y(80)
    pdf.set_font("DejaVu", "B", 28)
    pdf.set_text_color(20, 40, 80)
    pdf.cell(0, 14, "Marketing Cloud Next", ln=True, align="C")
    pdf.cell(0, 14, "Consultant Exam Study Guide", ln=True, align="C")
    pdf.ln(6)
    pdf.set_font("DejaVu", "", 13)
    pdf.set_text_color(90, 90, 90)
    pdf.cell(0, 8, "Salesforce Certified Marketing Cloud Next Consultant", ln=True, align="C")
    pdf.cell(0, 8, "Summer '26  |  60 questions  |  72% pass", ln=True, align="C")
    pdf.ln(30)
    pdf.set_font("DejaVu", "", 10)
    pdf.cell(0, 6, "Contents:  Study Roadmap  \u2192  Concept Pages (by track)  \u2192  Flashcard Decks  \u2192  Exam Revision Summary", ln=True, align="C")
    pdf.cell(0, 6, "Generated " + ("from workspace notes"), ln=True, align="C")


def toc(pdf):
    pdf.add_page()
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(20, 40, 80)
    pdf.cell(0, 10, "Table of Contents", ln=True)
    pdf.ln(3)
    pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(30, 30, 30)
    for level, title, page in pdf._toc:
        if level == 1:
            pdf.set_font("DejaVu", "B", 10)
            indent = 0
        else:
            pdf.set_font("DejaVu", "", 9)
            indent = 6
        pdf.set_x(MARGIN + indent)
        w = pdf.get_string_width(title)
        avail = PAGE_W - 2 * MARGIN - indent - 20
        dots = max(1, int((avail - w) / pdf.get_string_width(".")))
        pdf.cell(w + 1, 6, title)
        pdf.set_font("DejaVu", "", 9)
        pdf.cell(dots, 6, "." * 40)
        pdf.cell(0, 6, str(page), ln=True, align="R")
        pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(30, 30, 30)


def main():
    pdf = PDF()
    pdf.set_title("Marketing Cloud Next Consultant Exam Study Guide")
    pdf.set_author("Study Notes")
    cover(pdf)

    # 1. Study roadmap
    pdf.heading(1, "Study Roadmap")
    with open(os.path.join(INDEX, "study-roadmap.md"), encoding="utf-8") as f:
        render_md(pdf, f.read())

    # 2. Concept pages in track order
    pdf.heading(1, "Concept Pages")
    for item in TRACKS:
        if isinstance(item, str):
            pdf.heading(2, item)
        else:
            for name in item:
                path = os.path.join(CONCEPTS, name + ".md")
                with open(path, encoding="utf-8") as f:
                    render_md(pdf, f.read())

    # 3. Flashcard decks
    pdf.heading(1, "Flashcard Decks")
    for name in FLASH_DECKS:
        path = os.path.join(FLASHCARDS, name + ".md")
        with open(path, encoding="utf-8") as f:
            render_md(pdf, f.read())

    # 4. Exam revision summary
    pdf.heading(1, "Exam Revision Summary")
    with open(os.path.join(INDEX, "exam-revision-summary.md"), encoding="utf-8") as f:
        render_md(pdf, f.read())

    pdf.output(OUT)
    print(f"PDF written to {OUT} ({os.path.getsize(OUT)} bytes, {pdf.page_no()} pages)")


if __name__ == "__main__":
    main()