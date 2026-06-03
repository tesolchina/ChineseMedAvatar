# Development Log

A running, plain-language record of what changed and **why** — written for
Simon Wang (project owner) so any future developer (or future-Simon) can
re-trace decisions without reading every commit message.

Format per entry:
1. **Date / commit** — short SHA when known.
2. **User request** — quoted or paraphrased from the chat.
3. **What changed** — files / functions touched.
4. **Why this approach** — alternatives considered, trade-offs.
5. **How to verify / debug** — what to look at if it breaks.

Newest entries at the top.

---

## 2026-05-11 · Literature PDF → Markdown converter

**User request.** Convert `docs/research/Lit/1-s2.0-S0346251X24000368-main.pdf`
(Fathi, Rahimi, & Derakhshan, 2024 — *System* 121, 103254) to a readable
Markdown copy with verbatim text and in-text citations linked to their
References-section anchors. "No change of content, properly readable and
formatted with links to ref texts."

**What changed.**
- New `scripts/pdf_to_md.py` (~470 lines) — generic Elsevier-style article
  converter using PyMuPDF. Detects headings via bold spans + numbered
  prefixes, joins column-wrapped lines, strips running headers/footers,
  parses the References section, assigns each entry a stable anchor
  (`ref-<firstauthor-surname>-<year>`), and rewrites narrative + parenthetical
  citations into Markdown links.
- New output `docs/research/Lit/Fathi-Rahimi-Derakhshan-2024.md` (319 lines,
  ≈103 KB).
- Reference-splitting heuristic: anchored regex on `Surname, X. … (YYYY).`
  with two guards — (a) always preserve the chunk's leading position so
  multi-author entries whose first author has co-authors with comma-only
  separators are not lost; (b) only accept a candidate split point if the
  immediately preceding non-space character is a sentence terminator
  (`. ? ! )`) or a digit (DOI/page tail). This rejects mid-author-list
  matches like "Ayedoun, E., **Hayashi**, Y." while still splitting
  references that end with a DOI.
- Co-author pattern accepts comma-separated lists, `&`/`and` final
  conjunction, and two-word surnames (e.g. "Plano Clark").

- Conservative wrap-hyphenation joiner: only drops a trailing `-` when the
  word stem before the hyphen is ≥5 characters AND fully lowercase. This
  preserves real compounds at line breaks like `AI-mediated`, `face-to-face`,
  `pre-and`, `text-based` (which a naive joiner had been mangling into
  `AImediated`, `faceto`, `preand`, `textbased`).
- Subsection-heading split: the source PDF emits `2.1.`, `5.1.`, `6.1.` …
  inline at body font size, so a paragraph-prefix regex promotes them to
  `###` headings with their own anchors.
- Running-footer strip for repeating "X. Surname et al." author lines.

**Why this approach.**
- PyMuPDF was the lightest dependency that exposes per-span font metadata
  (size, bold flag, font name) — needed to distinguish the 8.0 pt
  CharisSIL-Bold numbered headings from inline bold runs.
- Elsevier reference lists do not delimit entries reliably (URLs end
  references mid-line, no blank lines between entries), so a regex on the
  author/year *opening* of each entry is more robust than line-break
  heuristics. The two guards above were the result of iterating from a
  buggy 37-ref version (over-splitting author lists) and a 64-ref version
  (under-splitting DOI-ended refs) to the final 79-ref version.

**How to verify / debug.**
- Re-run: `python3 scripts/pdf_to_md.py <pdf> <md>`.
- Health check: `refs: 79  citations: 106  unique cited: 74  broken: []`
  — no in-text link should point at a missing anchor.
- Hyphenation regression check: search the output for `AImediated`, `faceto`,
  `textbased`, `preand` — all should be 0.
- If a real reference is missing: print `pattern.finditer(text)` matches for
  that block in `split_ref_block` and check whether the preceding-char guard
  is rejecting a legitimate split (relax the terminator set, do not relax
  the regex, to avoid mid-author-list false positives).

---

## 2026-05-11 — Hu materials ingested + Drive corpus mirrored + reconciliation written

**What.** Prof Hu delivered four files to `docs/meetings/` (requirements doc,
pain-points doc, syllabus, poster-skill zip) and shared a Drive folder
(`medical-paper-to-oral-ppt`, currently 3,144 entries, still uploading per
Hu). Processed all of them.

**Files added / changed.**
- `docs/meetings/国际医学学术会议英语教学痛点.md` — Word doc extracted to
  Markdown (verbatim from `.docx` XML, with frontmatter).
- `docs/meetings/博士英语课程教学大纲.md` — `.doc` extracted via `antiword`,
  wrapped with frontmatter. Tables are flowed text; refer to `.doc` for grid.
- `docs/skills/medical-paper-to-research-poster/` — unzipped poster skill
  (SKILL.md + 7 references + 1 workflow). Ready to wire in once we adopt
  PPT Master.
- `docs/plan/2026-05-11-meeting-transcript.txt` — full 27 KB transcript
  extracted from the PDF for grep-ability.
- `docs/research/drive-index/medical-paper-to-oral-ppt-tree.tsv` — full
  3,144-row TSV index of the Drive folder (path / mime / size / id).
- `docs/research/drive-corpus/` — 26 narrative MDs mirrored locally
  (top-level READMEs, AGENTS.md, CLAUDE.md, all docs/, both SKILL.md files)
  plus a per-file MANIFEST.md and a curated README.md. SVGs / PPTX / PNGs
  not mirrored (binary-ish, fetch on demand).
- `docs/plan/2026-05-11-reconciliation.md` — module-by-module reconciliation
  of Hu's April-2026 ICET requirements doc against the May-11 pivot.
  Verdict: pain-points doc + pivot doc are ~95% aligned; the larger ICET
  requirements doc is over-scoped; PPT Master from Drive is the engine the
  pivot needs but didn't have.
- `docs/plan/2026-05-11-action-plan.md` — five-phase plan (decisions,
  infra prep, v0 behind a flag, pilot, September cohort) plus 8 numbered
  discussion questions for the next sync.

**Why this approach.**
- The April-2026 ICET requirements doc predates the pivot meeting and
  describes a much bigger product (10 modules incl. accounts, conference
  search, recommendation engine, K8s-on-MySQL stack). Treating it as gospel
  would derail the pivot. Treating it as input — keep oral/PPT/poster
  modules, drop accounts/search/dashboard/heavy-infra — preserves both
  Hu's intent and our preferences B/J/F.
- The Drive folder turned out to be `PPT Master v2.6.0` (Hugo He, MIT) plus
  a medical wrapper. It solves "paper → editable slides" — the row in our
  pivot doc that said "to be built". Reconciliation note recommends
  vendoring it; action plan defers the actual integration behind decisions
  D1–D4 (Phase 0).
- Mirroring only the narrative subset of the Drive folder (26 MDs of 2,914
  files) keeps the local repo small while preserving everything we need to
  reason about the engine. The TSV index lets us grep paths without
  re-traversing Drive.

**How to verify / debug.**
- Re-index the Drive folder: open `code_execution`, reuse the saved
  `globalThis.driveTopLevel.token`, and re-run the BFS in the indexer cell.
  Folder ID `1WLLb2CvZUG3Xh7rvtfbiX1iCiJfRWEeC`. Hu indicated more uploads
  to come — re-run weekly until count stabilises.
- `wc -l docs/research/drive-index/medical-paper-to-oral-ppt-tree.tsv`
  should grow as Hu uploads more.
- Doc/docx extraction: `antiword <file.doc>` and the inline Python in
  `code_execution` (zipfile + regex strip of `<w:*>` tags) are both
  text-only — no formatting, no images. For full fidelity, open the
  originals in Word.
- Reconciliation note + action plan are pure prose; no tests.
- 30/30 pytest still passing — no code changed.

**Open follow-ups (now tracked in `docs/plan/2026-05-11-action-plan.md`).**
- Decisions D1–D4 (engine, format, anonymity-vs-gradebook, oral-vs-poster).
- Modular split of `server.py` and `app.js` (still flagged from before the
  pivot — needs to land before Phase 2 endpoints).
- Wait for Hu to send sample student PPTs/posters and recorded feedback;
  re-pull Drive folder when she signals upload is complete.

---

## 2026-05-14 — Project identity established + Drive folder created + reusable-skills inventory

**What.** Established a project-wide unique slug (`aspp-academic`),
created a matching folder at the root of Simon's Google Drive, uploaded
the canonical planning docs into it as proof of write access, and wrote
two new inventory documents so sister projects can reuse pieces of this
codebase without re-reading it line-by-line.

**Files added.**
- `docs/plan/project-identity.md` — naming convention (slug `aspp-academic`
  used everywhere: repo, Drive folder, cookies, env vars), a placeholder
  table for sister projects, and the verified Drive folder URL.
- `docs/plan/reusable-skills-inventory.md` — 12 reusable components
  documented: schema, hot-reload prompt pattern, TTS chain, STT chain,
  audio retention, PDF→MD converter, test scaffolding, dev-log
  discipline, dual-table model, admin export, bilingual UI plan, and a
  verified Google Drive recipe (with code snippets).
- `docs/plan/ppt-master-iteration-notes.md` — nine project-management
  patterns to borrow from PPT Master (gates, `spec_lock.md`, eight
  confirmations, page-rhythm tags, structure-preserved-across-durations,
  SKILL.md as single source of truth, compatibility-boundary clause,
  bilingual docs).

**Drive write — verified working.**
- Created folder `aspp-academic` at the root of Simon's Drive
  (id `1-AKvT4MMR1Dyhbk_wW_OLFNkfzqh-bEX`,
  https://drive.google.com/drive/folders/1-AKvT4MMR1Dyhbk_wW_OLFNkfzqh-bEX).
- Uploaded 5 canonical docs into it: PROJECT_INDEX.md,
  REUSABLE_SKILLS_INVENTORY.md, PPT_MASTER_ITERATION_NOTES.md,
  RECONCILIATION_2026-05-11.md, ACTION_PLAN_2026-05-11.md.
- Re-runnable via the recipe in `reusable-skills-inventory.md` § 12.

**Why this approach.**
- The user explicitly asked for a unique cloud name to disambiguate
  this project from other sister projects on the same accounts.
  `aspp-academic` is short, ASCII, lowercase, hyphenated, and unlikely
  to collide. The legacy GitHub repo name `ChineseMedAvatar` is
  intentionally **not** reused — it predates the pivot and is misleading.
- The reusable-skills inventory is paths + verification commands only.
  No copy-pasted code blocks except where the syntax actually matters
  (the Drive recipe). Keeps the doc maintainable as `server.py` evolves.
- Drive uploads use multipart updates so re-running the upload script
  patches the existing file (Drive's native version history preserves
  the previous version). Names on Drive are SCREAMING_SNAKE so they're
  visually distinct from the lowercase repo filenames.

**How to verify / debug.**
- Visit the Drive folder URL above; you should see 5 files.
- Re-run the upload code in `code_execution`:
  `listConnections('google-drive')` → reuse `access_token` →
  `PATCH https://www.googleapis.com/upload/drive/v3/files/<id>?uploadType=multipart`.
- `wc -l docs/plan/*.md` should show 5 planning docs at this point.
- Anything that lands on Drive is also a copy of a local file — Drive
  is the public-facing mirror, the repo is the source of truth.

**Open follow-ups.**
- Replit project rename: workspace is still `workspace`; rename to
  `aspp-academic` when convenient (cosmetic, not functional).
- GitHub rename: `tesolchina/ChineseMedAvatar` → `tesolchina/aspp-academic`.
  Will require a one-line update to `git remote set-url`.
- DB filename rename `mvp_data.db` → `aspp_data.db` (deferred — needs
  migration script).
- Front-matter (title page / abstract) renders as one paragraph blob — known
  cosmetic issue, content is preserved verbatim.

---

## 2026-05-11 · Development log + audio-retention design (this entry)

**User request.** "Keep a running file documenting our changes so we have
a reference. Also we want to save the voice recordings (with privacy
consent and front-end playback). Also research open-source code for
analysing audio fluency / pronunciation. Also keep every file modular
(≤500 lines) and add headers explaining each file's role and how to
debug it."

**What changed in this commit.**
- New file `docs/dev-log.md` (this file) — backfilled with all
  significant changes since the project moved from iframe to native.
- File-size + responsibility audit added to `docs/architecture.md`
  (TODO next commit, see plan below).

**Audio-retention design (proposed, not yet implemented).** See section
"Audio retention — design proposal" near the bottom of this file. Will
be built in a follow-up commit after Simon confirms the consent wording
and storage choice.

**Speech-analysis library research.** See section "Speech analysis
libraries" near the bottom. Only verified-real packages listed.

---

## 2026-05-11 · "Start the conversation" gate (commit a2f48094)

**User request.** "On entry the avatar starts speaking either too early
or too late — it's awkward. Show a clear prompt that says you're about
to talk to the patient, then let the student click a button to start.
Also the existing tip text still says 'hold the mic'."

**What changed.**
- `public/app.js`
  - New `showStartGate()` — renders a card in the chat log with the
    patient's name and a single "Start the conversation" button. Locks
    `setChatBusy(true)` and `setMicLocked(true)` while visible.
  - New `startConversation()` — runs only on click: pushes the welcome
    line into HISTORY, renders it, locks the mic, calls `speak()`. Mic
    auto-unlocks when the TTS `onended` fires (existing logic).
  - `loadScenario()` no longer auto-speaks the welcome — it just calls
    `showStartGate()` instead.
  - Reset button now also re-shows the start gate (consistent flow on
    every "fresh start").
  - `var log_ = log;` alias because `showStartGate` needed a local DOM
    variable named `log` for the chat element. Function declarations
    are hoisted so the alias resolves.
- `public/index.html` — chat-hint text rewritten ("click the mic once
  to start … click again to send"), consent dialog "Voice handling"
  bullet rewritten to match.
- `public/styles.css` — new `.start-gate`, `.start-gate-title`,
  `.start-gate-body`, `.start-gate-btn` rules.
- New event logged to `events` table: `chat_started` with
  `{has_welcome: true|false}`.

**Why this approach.** Auto-playing the welcome had two failure modes:
(a) student wasn't wearing headphones yet and missed it; (b) browser
auto-play policy blocked it silently. A click gate solves both because
the click counts as user activation for the audio API.

**How to verify / debug.** Open `/`, accept consent, you should see the
greyed start-gate card and disabled mic. Click "Start the conversation",
the welcome should play once, mic unlocks at the end. Hit Reset, gate
should reappear.

---

## 2026-05-11 · No talking over the avatar (commit 55b98b8b)

**User request.** "When the avatar is speaking or about to speak, the
mic should stop. Don't make us fight for the floor."

**What changed.**
- `public/app.js`
  - New `setMicLocked(locked, reason)` — disables/enables `#mic-btn`,
    toggles `.locked` CSS, calls `cancelRecording()` if user was mid-talk.
  - New `cancelRecording()` — silent teardown of both
    SpeechRecognition and MediaRecorder paths without uploading.
  - `sendMessage()` calls `setMicLocked(true)` before the fetch.
  - `speakBrowser` and `speakElevenLabs` `onended`/`onerror` handlers
    call `setMicLocked(false)`.
  - `silenceAvatar()` (barge-in) also unlocks the mic.
- `public/styles.css` — new `.mic.locked` rule (grey, .45 opacity, no
  pulse).

**Why this approach.** Locking the button rather than just dropping
incoming audio (a) makes the state visible to the student, (b) prevents
the avatar's own playback from leaking into the mic on speakerphones
and being transcribed back as spurious user input.

**How to verify.** Send any message → mic should grey out for the
duration of "thinking" + speaking, then snap back. Click the greyed
mic mid-utterance → barge-in fires, audio stops, mic unlocks
immediately and starts listening.

---

## 2026-05-11 · Mobile chat layout + TTS prefix bug (commit 95ccac7c)

**User request.** "On mobile the input box is cut off — I can see the
transcript started with 'Well actually I'm with my' and the rest is
hidden. Also the avatar repeats a syllable before the real reply
('da-da-da'-style stutter)."

**What changed.**
- `server.py` `_tts_minimax()` — strip leading whitespace and stray
  punctuation from `text`; add `language_boost: "English"` to the
  request body. MiniMax otherwise auto-detects language from the first
  byte and occasionally produces a leading-syllable stutter for English
  text. Verified live: clean MP3 at 3.0s latency.
- `public/styles.css`
  - `.chat-input textarea` now `font-size:1rem` (prevents iOS auto-zoom),
    `resize:none`, `line-height:1.35`.
  - `@media (max-width:980px)` — chat-input flex-wraps; textarea takes
    the full width on its own row, mic + Send share the row below.
- `public/app.js`
  - New `autosizeTextarea(ta)` — grows the textarea up to ~280px with
    content. Wired to `input` event in `wireChat()`. `showLiveTranscript`
    triggers an `input` event so the box grows as voice transcripts
    stream in.

**How to verify.** Resize browser to 375×812 → input row should stack.
Send any TTS request via curl, listen — first syllable should be clean.

---

## 2026-05-11 · Wish-list "Skip — use default" button (commit e5cd22ec)

**User request.** "Let students skip filling out the wish-list."

**What changed.**
- `public/index.html` — new `#skip-wishlist` button next to Save.
- `public/app.js`
  - `DEFAULT_WISHLIST` constant (5 generic communication-skills goals).
  - `submitWishlist(text, viaSkip)` — extracted shared POST logic, logs
    `wishlist_saved_ui` with `default: true|false`.
  - `wireWishlist()` — Skip button fills textarea with default and
    submits.

**Why.** Lower friction for impatient students; default text still
goes into the database so research data isn't lost.

---

## 2026-05-10 · Realtime voice (toggle mic, streaming partials, barge-in)

**User request.** "Make voice realtime — push-to-talk is annoying."

**What changed.**
- `public/app.js` — switched `#mic-btn` from press-and-hold to
  click-toggle (`toggleMic()`); browser `SpeechRecognition` with
  `interimResults=true` streams partial transcripts into the textarea
  via `showLiveTranscript()`; falls back to MediaRecorder→`/api/stt`
  on browsers without SpeechRecognition (Safari mainly).
- Spacebar binding added (works only when not focused in a text field).
- `silenceAvatar()` lets the user interrupt TTS by clicking the mic
  while the patient is talking.

**Why.** Two engines because: SpeechRecognition is free and gives live
partials but iOS Safari ships an incompatible/limited version;
MediaRecorder→Scribe (ElevenLabs STT) works everywhere as a fallback.

---

## 2026-05-10 · Editable system prompts on disk (commits before checkpoint 1)

- `prompts/<scenario_id>.md` is now read on **every** `/api/chat` call
  in `server.py`. Hot-reload, no restart required. `bot-config/<id>/
  config.json:systemPrompt` is used only when no `.md` file exists.
- Hot-reload makes Simon's iteration loop ~30s faster per prompt edit.

---

## 2026-05-10 · Native chat replacing textbot.hkbu.tech iframe

**User request.** "Replace the textbot iframe with a native avatar."

**Stack chosen.**
- Backend: Flask 3 + SQLite (file-backed), in-memory rate limiting.
- LLM: OpenRouter `openai/gpt-4o-mini` (HISTORY-based, full conversation
  resent every turn for stateless server).
- TTS chain: MiniMax (`MinimaxAPIkey`) → ElevenLabs (`ELEVENLABS_API_KEY`)
  → browser `speechSynthesis`. Response carries `X-TTS-Engine` header.
- STT chain: ElevenLabs Scribe → browser `SpeechRecognition`.
- Avatar: hand-drawn animated SVG with lip-sync driven by Web Audio API
  `AnalyserNode` on the TTS audio element.

---

# ─── Reference sections (kept up to date) ───

## File map and responsibilities

| File                            | Lines | Role                                                  | Owns / writes to            | Likely-fault map (when X breaks, look here) |
|---------------------------------|------:|-------------------------------------------------------|-----------------------------|----------------------------------------------|
| `server.py`                     |  ~860 | Flask app: chat, TTS, STT, wishlist, admin, schema    | `mvp_data.db`, `prompts/`   | 5xx errors, rate limits, model proxying, DB locks |
| `public/index.html`             |  ~210 | Single-page shell, consent modal, chat scaffolding    | DOM only                    | layout glitches, missing IDs referenced by app.js |
| `public/app.js`                 |  ~930 | All client logic: chat, mic, TTS, lip-sync, gate      | `localStorage` (consent)    | mic stuck, audio not playing, transcript glitches |
| `public/styles.css`             |  ~225 | All visual styling                                    | —                           | mobile layout, button states                 |
| `prompts/<scenario>.md`         |     — | System prompt for each scenario, hot-reloaded         | —                           | patient-personality drift, wrong scenario behaviour |
| `bot-config/<scenario>/config.json` | — | Scenario metadata: name, welcome line, model, voice   | —                           | wrong avatar name shown, wrong voice used     |
| `tests/test_regression.py`      |  ~135 | Hermetic unit tests (sessions, events, wishlists)     | tmp DB                      | regression on schema or admin endpoints       |
| `tests/test_e2e_chat_voice.py`  |  ~230 | End-to-end chat/TTS/STT with monkeypatched upstreams  | tmp DB                      | regression on engine fallbacks                |
| `tests/conftest.py`             |   ~65 | Pytest fixtures: app, client, isolated DB             | tmp DB                      | flaky setup / leaking state across tests      |

**500-line policy.** Two files exceed the soft limit:
`server.py` (859) and `public/app.js` (926). Both are flagged for
extraction in the next commit, see "Refactor plan" below.

## Refactor plan (to land next)

Goal: every file ≤500 lines OR a header comment explaining why it must
stay together. Module boundaries chosen so each file owns one concern.

**`server.py` → split into:**
- `server.py` (entrypoint + routes only, ~250 lines)
- `tcm/db.py` — schema, `_db_lock`, `init_db`, helper queries.
- `tcm/llm.py` — OpenRouter chat + system-prompt loader.
- `tcm/tts.py` — MiniMax + ElevenLabs + chain logic.
- `tcm/stt.py` — Scribe upload + size limits.
- `tcm/ratelimit.py` — in-memory token-bucket.
- `tcm/admin.py` — export, list-sessions endpoints.

**`public/app.js` → split into ES modules (loaded as `<script type=module>`):**
- `static/js/main.js` — bootstrap + wiring.
- `static/js/chat.js` — sendMessage, HISTORY, rendering.
- `static/js/voice.js` — toggleMic, SpeechRecognition, MediaRecorder,
  cancelRecording, setMicLocked.
- `static/js/tts.js` — speak, speakBrowser, speakElevenLabs, lip-sync,
  silenceAvatar.
- `static/js/consent.js` — click-wrap modal.
- `static/js/wishlist.js` — Save / Skip wish-list flow.
- `static/js/gate.js` — start-conversation gate.

Each new module gets a top-of-file comment block with: purpose, public
API, dependencies, "if X breaks look here" notes (template below).

**Standard file-header template** to be added to every module:
```
/* file: <path>
 * purpose: <one sentence>
 * public API: <list of exported symbols>
 * depends on: <other files / globals>
 * if it breaks: symptoms → likely culprit table
 */
```

## Audio retention — design proposal (NEEDS APPROVAL)

User wants to **keep** the audio of student utterances (currently
discarded after STT) and let students replay them in the UI. Key
decisions to make before coding:

1. **Consent.** Two options:
   - (a) Add a *second*, **separate**, opt-in checkbox in the consent
     modal: "I additionally agree that my voice recordings may be
     stored to allow playback and acoustic analysis." Default
     unchecked. Without it, audio is discarded as today.
   - (b) Make audio retention a project-wide policy and rewrite the
     existing consent. Simpler, but you can't compare audio-yes vs
     audio-no cohorts.
   - **Recommendation: (a)** — keeps anonymous-by-design intact for
     students who only want text recorded, and gives you a clean
     consented-audio cohort for analysis.

2. **Storage.** Two options:
   - (a) Filesystem under `audio/<session_id>/<turn_no>.webm`,
     filename also referenced in a new `turns.audio_path` column.
   - (b) Blob inside `turns.audio_blob` (SQLite BLOB).
   - **Recommendation: (a)** — keeps DB small, easy to back up, easy
     to delete a single session, and easy to expose via a signed URL.

3. **Format.** Browser MediaRecorder default output is WebM/Opus on
   Chrome and MP4/AAC on Safari. Store as-is (don't transcode in the
   request path). Add a `turns.audio_mime` column.

4. **Playback.** Render a 🔊 button next to each user bubble that
   has an `audio_path`; clicking it loads `/api/audio/<sid>/<turn>`
   into a hidden `<audio>` element. Audio served with
   `Cache-Control: private, no-store`.

5. **Retention / deletion.** Add a "Delete my audio" button at the
   bottom of the page that POSTs `/api/session/<sid>/audio/delete`.
   Also: nightly cron prunes audio for sessions older than N days
   (configurable, suggest 90).

6. **Size cap.** Already have `MAX_STT_BYTES = 8 MiB` per upload.
   Keep that. Reject anything larger.

**Implementation outline (once approved).**
- Schema migration (idempotent): `ALTER TABLE turns ADD COLUMN
  audio_path TEXT; ALTER TABLE turns ADD COLUMN audio_mime TEXT;`
- New consent flag `consent_audio` stored in the existing consent
  hash payload (versioned to v2).
- `/api/stt` writes the upload bytes to disk *only if* the session has
  `consent_audio=true`, then sets `audio_path` on the new turn row.
- New `/api/audio/<sid>/<turn>` GET endpoint: rate-limited,
  same-session check via cookie/sessionStorage, streams the file.
- New `/api/session/<sid>/audio/delete` POST.
- Frontend: render 🔊 in user bubbles when the response from `/api/stt`
  includes `audio_url`; consent modal v2 with the second checkbox.
- Tests: extend `test_e2e_chat_voice.py` with audio-on / audio-off
  paths.

## Speech-analysis libraries (verified)

Only listing libraries I have first-hand confidence exist and are
actively maintained as of the project's knowledge cutoff. The earlier
research turn over-stated some packages — those have been removed. To
be re-verified before any one is adopted:

| Library | URL | License | Useful for | Notes |
|---------|-----|---------|------------|-------|
| **OpenAI Whisper** (large-v3) | github.com/openai/whisper | MIT | Word-level timestamps, low-WER transcript | Already a defacto standard; CPU runs are slow, GPU recommended. |
| **WhisperX** | github.com/m-bain/whisperX | BSD-2 | Forced alignment for word-level timestamps + speaker diarization | Wraps Whisper + wav2vec2 alignment; great for pause / pacing analysis. |
| **SpeechBrain** | github.com/speechbrain/speechbrain | Apache-2.0 | Generic toolkit: VAD, prosody, speaker, emotion | Many pretrained recipes; pick what you need. |
| **pyannote.audio** | github.com/pyannote/pyannote-audio | MIT | Voice-activity detection, diarization | Useful for pause-duration metrics. Requires HF token for some models. |
| **parselmouth** (Praat) | github.com/YannickJadoul/Parselmouth | GPL-3.0 | Pitch, intensity, formants, jitter/shimmer | Gold-standard phonetics; scriptable Praat from Python. |
| **Allosaurus** | github.com/xinjli/allosaurus | Apache-2.0 | Universal phoneme recognizer (>2000 phones) | Building block for GOP-style pronunciation scoring. |
| **goodness-of-pronunciation (research repos)** | search github "GOP wav2vec2" | varied | Pronunciation accuracy scoring | No single canonical package — fork an open implementation. |

**Recommended starting stack for our use case** (post-hoc, batch
analysis after each session):

1. **WhisperX** to re-transcribe the saved audio with word-level
   timestamps. Compare against the live transcript already in `turns`
   to catch STT errors.
2. **pyannote VAD** to extract pause durations → speaking-rate (WPM),
   articulation rate, pause ratio.
3. **parselmouth** for pitch range + intensity variability →
   prosody / "monotone" detection.
4. **Disfluency counter**: simple regex on the WhisperX transcript
   for `\b(uh|um|uhh|er|like|you know)\b` plus repeated words.
5. **(Stretch goal)** GOP via wav2vec2 phoneme model → per-phoneme
   pronunciation score; only after the four basics are in production.

This belongs in a separate `analysis/` package (Python), run as a
batch job — not in the request path. Suggested entrypoint:
`python -m analysis.run --session <sid>` writing scores into a new
`session_scores` table.

## Operational notes / known issues

- **Rate limiter is in-memory.** Will not work across multiple
  workers. Needs Redis before horizontal scaling. Tracked in
  scratchpad, not yet a code issue because we run a single Flask
  process.
- **ELEVENLABS_API_KEY is currently a Poe key** (works for OpenRouter
  fallbacks but not for ElevenLabs TTS). Real key needed before TTS
  fallback chain is fully operational. MiniMax is primary so this
  hasn't been blocking.
- **Tests don't cover JS UI logic.** Consider adding Playwright tests
  if mic-lock or start-gate regress.

---

## 2026-05-11 · Audio retention (opt-in) — full implementation

### What
End-to-end audio-retention pipeline behind a separate opt-in checkbox in
the click-wrap consent (`CONSENT_VERSION` bumped `v1 → v2`).

- **Schema**: `sessions.consent_audio INTEGER DEFAULT 0`, `turns.audio_path TEXT`,
  `turns.audio_mime TEXT`. Idempotent ALTER TABLEs in `init_db()` so the
  prod database upgrades on next restart without a migration script.
- **Storage**: `audio/_pending/<token>.<ext>` between `/api/stt` and
  `/api/chat`; finalised to `audio/<sid>/<turn_no>.<ext>`. Pending files
  older than 1 h pruned at server start.
- **Endpoints**:
  - `/api/stt` now returns `audio_token` when (and only when) the session
    has `consent_audio=1`. The bytes are buffered to `_pending/`.
  - `/api/chat` accepts `audio_token`, finalises the file inside the same
    `_db_lock` that allocates the turn number, returns
    `user_turn_no` + `audio_url`.
  - `GET  /api/audio/<sid>/<turn>` — streams the saved clip with
    `Cache-Control: private, no-store`. Path traversal blocked by
    `_safe_session_id()` + resolve-under-AUDIO_DIR check.
  - `POST /api/session/<sid>/audio/delete` — wipes every file for the
    session, NULLs `audio_path`/`audio_mime`, logs `audio_deleted_by_user`.
- **Frontend**:
  - Second checkbox `#consent-audio-checkbox` (default unchecked).
  - `PENDING_AUDIO_TOKEN` carried from `/api/stt` to the next
    `sendMessage()` and cleared after one use (so a user typing between
    voice turns can't accidentally reuse it).
  - `attachPlayback(bubble, url)` mounts a 🔊 button + hidden `<audio>`
    on the user bubble whenever the server confirmed the file was kept.
  - Footer "Delete my saved audio" button (`#delete-audio-btn`) shown
    only when `SESSION.consent_audio` is true.

### Why
User Pref C — separate consent, two cohorts (audio-yes / audio-no),
playback for self-review, foundation for the offline acoustic-fluency
analysis module (Pref D).

### Verification
- `pytest -q` → **30/30 passing** (added two new tests:
  `test_audio_not_kept_when_consent_audio_false`,
  `test_audio_kept_and_finalised_when_consent_audio_true`; the latter
  drives STT → chat → playback → delete end-to-end).
- Live workflow restart green; consent modal screenshot confirms both
  checkboxes render and the audio bullet is visible.

### Debugging map
| Symptom | Look at |
|---|---|
| `audio_token` always null in `/api/stt` response | `consent_audio` column in `sessions` row → check `/api/session/start` payload |
| `audio_url` null in `/api/chat` response despite a token | (a) token expired in `_pending/` (1 h TTL pruned on restart); (b) `_finalise_pending_audio()` returned None — token not alphanumeric or file missing |
| `GET /api/audio/...` 404 after a successful turn | `audio_path` in the turn row vs. file under `audio/<sid>/`; mismatch means `_finalise_pending_audio` never ran |
| Play button missing on a user bubble | server returned `audio_url=None` — check `consent_audio=1` AND `audio_token` was forwarded by the client (cleared after one use!) |
| Delete button hidden | `SESSION.consent_audio` false — the user did not tick the second checkbox |

### Known follow-ups
- `server.py` now 1082 lines, `app.js` 1000 lines — both still need the
  modular split planned in this log's earlier "refactor plan" entry.
- No cron yet for `AUDIO_RETENTION_DAYS` — file pruning is on-demand
  only. Add a daily job or wire into the next request cycle.
- Acoustic-fluency analysis module (Pref D) can now consume
  `audio/<sid>/<turn>.<ext>` paths joined to the `turns` table.

---

## 2026-05-11 — Project pivot: TCM interview → academic speaking practice platform

### What
Reframed the project from a single-scenario TCM doctor–patient interview prototype
to a **multi-scenario speaking practice platform** with academic conference
oral-presentation training as the headline use case. No code changes in this
commit — only documentation and project framing.

Changes in this commit:
- `replit.md` rewritten: new project name and overview, new preferences G–J
  (bilingual UI, hide-transcript-by-default, AI-verbosity constraint,
  data-stays-on-our-servers), updated project structure, current schema snapshot.
- `docs/pivot-2026-05-11.md` created: pivot rationale, agreed pipeline,
  reusable-asset matrix, Hu's pain points, what-we-need-from-Hu list, timeline,
  out-of-scope, risks.
- `docs/meetings/2026-05-11-hu-wenwen.md` created: 5-minute scannable summary
  of the 1-hour Tencent Meeting that drove the pivot.
- TCM scenario remains a configurable scenario; not removed.

### Why
2026-05-11 09:55 meeting with Prof. Hu Wenwen (Guangzhou University of Chinese
Medicine). She test-drove the Mr Wang prototype and her feedback steered us
toward her actual pain point: 100+ student "International Conference
Presentation" course taught alone, with manual feedback as the bottleneck.
Both agreed the conference-presentation direction has wider audience, stronger
publication framing (LLT short-paper niche), and aligns with Simon's HKBU
doctoral English course → clean two-cohort study design.

Crucially, the audio-retention work shipped earlier today is **exactly** the
infrastructure the new rehearsal + acoustic-feedback module needs. Pivot does
not invalidate the recent build — it repurposes it.

### Verification
- Documentation only; no behaviour change.
- `replit.md` reads end-to-end; `docs/pivot-2026-05-11.md` and
  `docs/meetings/2026-05-11-hu-wenwen.md` are linked from `replit.md`.
- Workflow `Start application` running green post-restart (port 5000 conflict
  cleared earlier in the session).
- Tests not re-run for this commit (no code touched). Baseline remains 30/30
  from the 2026-05-11 01:25 run; logs in `test-reports/`.

### Debugging map
| Symptom | Look at |
|---|---|
| Future contributor confused about project scope | `replit.md` overview + `docs/pivot-2026-05-11.md` |
| "Why is there a TCM scenario in a presentation-practice app?" | `docs/pivot-2026-05-11.md` § Reusable-asset matrix — TCM stays as a scenario |
| Looking for what Hu actually said | `docs/meetings/2026-05-11-hu-wenwen.md` (5-min) → `docs/plan/20260511095554-AI教学设计小聚-转写原文版-1.pdf` (full) |
| Need to know what's been promised vs deferred | `docs/pivot-2026-05-11.md` § Out-of-scope and § Timeline |

### Known follow-ups (now formally on the roadmap)
- **Blocked on Hu**: syllabus, sample student PPTs/posters, sample feedback,
  pain-point list, revised teaching PPTs. Tracking in
  `docs/plan/requestHu.md` as items arrive.
- **Modular split** (Pref F) of `server.py` (1082) and `app.js` (1000) — now
  a pre-condition for the new agent-pipeline modules. Worth doing while we
  wait on Hu.
- **Mr Wang opener** (Hu's feedback #3) — too sceptical for a Chinese clinic
  context; trivial prompt edit when we touch the TCM scenario again.
- **Mic-press-did-nothing** (Hu's feedback #2) — verify cross-browser STT;
  reproduce on a Windows Chrome install.
- New pipeline modules to scaffold once materials arrive: paper upload,
  paper→slides agent, slides→script agent, slide-by-slide rehearsal UI,
  acoustic-fluency analyzer, feedback synthesizer, Q&A reviewer scenario,
  bilingual UI shim. Detailed in `docs/pivot-2026-05-11.md`.

---

## 2026-05-14 (later) — Drive folder relocated + GitHub rename approved

**What.**
- Moved our Drive folder `aspp-academic` from Simon's Drive root into
  `medical-paper-to-oral-ppt/skills/` (sibling of `ppt-master/` and
  `medical-paper-to-oral-ppt/`). Folder ID unchanged
  (`1-AKvT4MMR1Dyhbk_wW_OLFNkfzqh-bEX`); URL unchanged.
- User approved the GitHub rename `ChineseMedAvatar → aspp-academic`.
  Recorded in `docs/plan/project-identity.md`. Cannot execute the rename
  from here (no GitHub connector configured); Simon does it once on
  github.com, then I run `git remote set-url origin https://github.com/tesolchina/aspp-academic` locally.

**Why.**
- Co-locating our project folder with the upstream skill bundles makes the
  cross-project picture visible from a single Drive view: `skills/medical-paper-to-oral-ppt/`,
  `skills/ppt-master/`, `skills/aspp-academic/`. Easy to share with Hu —
  one folder URL covers all collaborating skill packages.
- GitHub rename: legacy name is misleading post-pivot; aligning the repo
  name with the slug closes the last "current vs target" mismatch except
  for the `MVP_*` env vars (deferred — needs schema migration).

**How to verify.**
- `gdrive get 1-AKvT4MMR1Dyhbk_wW_OLFNkfzqh-bEX` → parents should be
  `["1abYfZer-gale8EeWcnV4qXqrOBhDvVds"]` (the `skills` folder).
- After Simon renames on github.com:
  `git remote -v` will still show `ChineseMedAvatar` until we run
  `git remote set-url`. GitHub auto-redirects HTTPS pushes, so old URL
  keeps working — but update it for clarity.

**Open follow-ups.**
- Simon: rename repo on github.com, then ping me to run the local
  `git remote set-url`.
- D2/D3/D4 still pending (deferred per user — "later").

---

## 2026-05-27 — Repo root tidy-up (pre-pivot archive)

**What.** Moved 11 pre-pivot directories out of the repo root into a
single `_archive_pre_pivot/` folder with a README explaining each.
Removed empty `.agent/`. Updated `replit.md` "Project Structure" to
reflect the new shape and added a "Cross-project hub" section pointing
at `docs/plan/project-identity.md`.

**Folders archived** (none referenced by live code — verified by
ripgrep against `server.py`, `public/`, `scripts/`, `tests/`,
`main.py`, `replit.md`):
`archive/`, `attached_assets/`, `avatar/`, `bytewise-configs/`,
`communications/`, `contacts/`, `content/`, `demo/`, `iframe-embeds/`,
`integration/`, `static/`.

**Root after cleanup** (excluding dotfiles + caches):
`audio/`, `bot-config/`, `docs/`, `prompts/`, `public/`, `scripts/`,
`test-reports/`, `tests/`, plus the standard top-level files
(`server.py`, `main.py`, `README.md`, `replit.md`, `HOW_TO_RUN.md`,
`pyproject.toml`, `uv.lock`, `mvp_data.db`, `.gitignore`, `.replit`).

**Why.**
- Pref F says files ≤ 500 lines; same spirit applies to root noise.
  After 6 months of pre-pivot exploration the root had 22 entries,
  more than half of which were no longer wired into anything.
- Conservative move (not delete) so any forgotten dependency can be
  restored with a one-liner. See the archive's own README for the
  recovery + final-removal recipes.

**How to verify / debug.**
- `python3 -m pytest tests/ -q` → 30 passed in 20.01s (no regressions).
- `ls *.py` shows only `main.py` and `server.py`.

**Open follow-ups.**
- Still pending from earlier turns: D1–D4 decisions, GitHub repo
  rename to `aspp-academic`, modular split of `server.py` + `app.js`,
  final Drive re-pull when Hu signals upload is complete.
- The voice/mic vibe-coding repo Simon mentioned (`zarazhang`) — that
  username only owns a fork of `ant-design`; awaiting Simon's
  confirmation of the right username before importing any code.

---

## 2026-06-03 — Linked into the `vibecodingskills` GitHub hub

**What.** Connected the GitHub integration (Replit connector, account
`tesolchina`) and registered this project in Simon's cross-project hub
repo `tesolchina/vibecodingskills`:
- Added `crossprojects/aspp-academic.md` — a PII-free "Cross-Project
  Context Brief" pointer card, matching the existing
  `examagent.md` / `genre2027.md` format (summary, infrastructure,
  design principles, reusable-skill candidates, bridge index, access).
- Added an `aspp-academic` row to the "Sister projects" table in the
  repo's `AGENT.md`.
- Removed the local staging scaffold `docs/vibecodingskills-bridge/` —
  superseded by the hub's own conventions; the hub card is now canonical.

**Why.**
- User asked to make `vibecodingskills` the bridge between projects,
  hosting pointers (not code) back to each project's own repo. The repo
  already existed (private; returned 404 unauthenticated) as a
  structured hub, so we followed its conventions instead of imposing a
  new layout.

**Safety note — public/private discrepancy (RESOLVED 2026-06-03).**
- The repo's `AGENT.md` self-declares `visibility: public`; the GitHub API
  reports it as **private**. User confirmed it is **genuinely private and
  staying private**, and approved mirroring heavier materials there
  (with secrets stripped). Acted on that confirmation.
- A pre-upload scan (`rg` for `sk-…`, `ghp_…`, `AKIA…`, `AIza…`, PEM
  headers, Slack tokens) found **no secret values** in any mirrored file —
  our docs reference env-var *names* only. Skipped binary duplicates
  (`.doc`/`.docx`/`.zip`) that already have `.md` equivalents.

**What was added to the hub (this session, continued).**
- 3 generalised, PII-free skills under `skills/`:
  `anonymous-session-schema`, `pdf-to-markdown`, `regression-test-runbook`.
- Indexed them in the root `README.md` (new "Platform Engineering"
  category) and `skills/README.md` (new "Contributed from ASPP-Academic"
  section + a related-repo entry for `ChineseMedAvatar`).
- `projects/aspp-academic/` — `README.md` (pointer) + `context-brief.md`
  (fuller), matching the examagent layout.
- `projects/aspp-academic/resources/` — mirrored 18 planning + meeting
  files (pivot doc, dev-log, all `plan/*.md`, the meeting transcript `.txt`
  + original `.pdf`, and the meeting `.md` notes; CJK filenames romanised).
- Updated `crossprojects/aspp-academic.md` "Reusable skills" to split
  contributed-to-hub vs still-project-local.

**How to verify / debug.**
- `crossprojects/` lists `aspp-academic.md`; `AGENT.md` Sister-projects
  table has the `ChineseMedAvatar` row.
- `skills/{anonymous-session-schema,pdf-to-markdown,regression-test-runbook}/SKILL.md`
  exist; both README indexes link them.
- `projects/aspp-academic/resources/{,plan/,meetings/}` hold the 18 files.
- GitHub writes use the Replit connector token via
  `listConnections('github')` → contents API (PUT). No token stored.

**Open follow-ups (unchanged from earlier turns).**
- D1–D4 decisions, GitHub repo rename to `aspp-academic`, modular split of
  `server.py` + `app.js`, final Drive re-pull, the `zarazhang` voice/mic
  repo (awaiting correct username).

---

## 2026-06-03 — Agent-authoring platform: landscape scan + spec

**What.** New strategic direction: a platform that lets teachers/researchers
**build their own teaching & research agents** (interactive, personalized,
alternatives to lecturing). Grounded in OpenAI's *How to Build Agents for
Higher Education* (six building blocks). Produced two planning docs:
- `docs/plan/agent-platform-landscape.md` — competitive + research scan across
  GitHub, Hugging Face, arXiv, OpenAlex, Crossref (Scopus API = 401, no key;
  used open substitutes). Says explicitly *what to copy* from each.
- `docs/plan/agent-platform-spec.md` — the platform spec: the six blocks turned
  into a declarative **Agent Spec**, mapped to a build plan, architecture
  (rent the engine, own the wedge), how it doubles as SAIL's RQ3 deliverable,
  and a phased roadmap.

**Why.** User chose "spec-first before code" and asked for an extensive prior-art
search to avoid reinventing. Key findings: **Playlab.ai** is the closest analog
to the vision (no-code teacher agent-builder, equity framing); **Dify/Langflow**
are the engine to build on (self-host → satisfies Pref J); **TeachTune**
(arXiv:2410.04078) is the evaluation method to copy (simulated students). Our
unoccupied wedge = academic *speaking* + voice + anonymous minor-safe data +
the study itself — all of which ASPP-Academic already part-owns.

**How to verify.** Both files exist under `docs/plan/`; landscape lists repos
with star counts + papers with arXiv ids/years; spec includes the Agent Spec
YAML, the six-block→build-plan table, and the SAIL RQ3 mapping.

**Open decisions (need Simon).** Engine choice (spike Dify); seed-vs-authored
agent scope for the grant; confirm fully self-hosted (rules out AgentKit/Gemini
Gems as runtime); platform naming/branding; Playlab as reference vs collaborator.

**Addendum (same day) — tools & skills.** Per Simon's question on Block 3,
expanded the spec with §2A (a ~30-tool catalogue grouped by category, each with
read/write access + green/yellow/red risk) and §2B (the skills framework). Core
distinction recorded: **tool = atomic verb the platform provides; skill =
reusable playbook (instructions + tools + knowledge + guardrails + eval cases);
agent = job + selected skills + their tools + guardrails + eval.** Skills reuse
the existing `SKILL.md` convention and the `vibecodingskills` hub as the registry;
three sourcing channels (seed / teacher-authored-behind-eval-gate / sourced).
**Decided (Simon):** teachers may *author* new skills, not just select — with the
simulated-student "eval gate" as a hard prerequisite (moved to Phase 2) that gates
publishing. Roadmap re-sequenced accordingly (P1 select/compose · P2 knowledge +
guardrails + eval gate · P3 open eval-gated teacher authoring + sharing).
After-licence-check engine rec corrected to **Langflow (MIT)** primary,
Dify secondary; landscape doc gained a licence due-diligence table + HF entries +
DOIs + a Pref-J orchestrator-vs-provider note.
