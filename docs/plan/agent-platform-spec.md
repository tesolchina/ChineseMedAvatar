# Teaching & Research Agent Platform — Specification (v0.1, draft)

> **Built:** 2026-06-03 HKT · **Status:** spec-first, pre-code (per decision to
> design the architecture before building).
> **Vision (Simon):** a platform that lets teachers and researchers **build their
> own agents** for teaching and research — more interactive and personalized ways
> to engage students, as alternatives to lecturing.
> **Framework:** OpenAI's six building blocks (job · knowledge · tools ·
> workflow/instructions · guardrails · evaluation loop), from *How to Build
> Agents for Higher Education* (Apr 2026).
> **Companion docs:** `agent-platform-landscape.md` (what to copy);
> `reusable-skills-inventory.md` (our existing components);
> hub `projects/scolar-rnd-2027-28/` (the SAIL grant this can serve).

---

## 1. The core object: an **Agent Spec**

The platform's central artifact is a structured, declarative **Agent Spec** — the
six blocks turned into editable fields. Today ASPP-Academic encodes a primitive
version of this in `prompts/<scenario>.md` + `bot-config/<scenario>/config.json`.
The leap is to make it a **guided form** a non-technical teacher can fill, with
the runtime generated from it.

```yaml
# agent-spec v0.1
id: viva-coach
block1_job:
  name: "Viva / Q&A Coach"
  primary_user: "Year-1 postgraduate, rehearsing a defence"
  job_to_be_done: "Run a realistic Q&A on the student's own work"
  produces: "Per-answer feedback + a short practice plan"
  never_does: "Give the student the answer; grade for credit"
  ask_human_when: "Student is distressed; content is outside the uploaded sources"
block2_knowledge:
  sources:
    - {name: "student's paper/slides", scope: this-session, retrieval: rag}
    - {name: "the assessment rubric", scope: shared, retrieval: rag}
  on_missing: "Say you can't confirm and point to the supervisor"
block3_tools:        # read-only first; writes need approval
    - {name: rubric_lookup, access: read, who: student}
    - {name: read_student_draft, access: read, who: student}
skills:              # composed playbooks; each pulls in the tools it needs
    - viva-question-bank
    - grade-against-rubric
block4_workflow:     # the anti-lecture loop (one step at a time)
    - intake: "ask target venue + question type"
    - generate: "produce 5 likely questions"
    - loop: "ask ONE question -> student answers (voice or text) -> targeted feedback"
    - finalize: "practice plan"
    - capture: "was this useful? what to improve?"
block5_guardrails:   # green / yellow / red risk map
    green:  ["practice questions", "feedback on clarity/structure"]
    yellow: ["rephrase a claim (then student confirms)"]
    red:    ["invent evidence", "write the answer for them"]
    fading: true            # scaffolding withdraws as competence rises (SAIL RQ2)
    verbosity: short        # Pref I — constrain AI turn length
block6_eval:
    feedback_capture: thumbs + free text
    simulated_students: ["over-confident", "anxious", "low-proficiency"]   # TeachTune-style
    metrics: ["over-reliance", "turn balance", "rubric self-score delta"]
runtime:
    voice: {tts: chain, stt: scribe-fallback}   # ASPP-Academic asset
    data: anonymous-by-design                    # opaque sid, opt-in audio, one-click delete
```

Everything else in the platform is in service of authoring, running, evaluating,
and sharing these specs.

---

## 2. Mapping the six blocks to our build plan

| Block | What the author declares | What we already have | What to build | Copy from |
|---|---|---|---|---|
| **1. Job** | name, user, moment, produces, never-does, escalation | `bot-config` name/welcome/model | a guided "job description" wizard | OpenAI job template; Playlab UX |
| **2. Knowledge** | trusted sources + on-missing behaviour | system-prompt text | file upload → chunk → retrieval (RAG), scoped per-session vs shared | Dify/FastGPT knowledge UX |
| **3. Tools** | read-only tools first; writes gated | — | a small tool registry (rubric lookup, read student draft/slides) | OpenAI tool checklist; MCP (LibreChat) |
| **4. Workflow + instructions** | the step loop + role/tone/format | editable, hot-reloaded prompt | a step-template editor (intake→one-question→feedback→plan) | Langflow node graph; OpenAI workflow patterns |
| **5. Guardrails** | green/yellow/red map, fading, verbosity, human-in-loop points | Pref I verbosity + hint-not-answer ethos | declarative risk-map UI + enforcement at runtime | Khanmigo (withholds answers); Adaptive-Scaffolding theory paper |
| **6. Evaluation loop** | feedback capture + simulated-student tests + metrics | turn/event logging; planned acoustic-fluency | "test your agent" runner vs simulated students; per-agent quality dashboard | **TeachTune** (arXiv:2410.04078) |
| **(cross-cutting) personalization** | per-learner memory across sessions | anonymous `sid` sessions | anonymous, per-`sid` memory layer | — (our wedge) |
| **(cross-cutting) ethics/data** | consent, retention, deletion | **done**: opaque sid, opt-in audio, delete, no PII | extend to multi-tenant authors | — (our wedge) |
| **(cross-cutting) voice** | TTS/STT per agent | **done**: provider-chained TTS + STT | expose as an agent toggle | — (our wedge) |

The decisive point: **three of the cross-cutting requirements the OpenAI playbook
assumes you must build (minor-safe data, personalization substrate, voice) are
already working in ASPP-Academic.** We are closer than a green-field build.

---

## 2A. Tool catalogue (Block 3, expanded)

A **tool** is one atomic capability the agent can call (a verb). Rule (from the
OpenAI playbook): **start read-only; gate every write behind human review** — the
more impact an action has, the more review it needs. Risk uses our green/yellow/red
map. The platform ships the *registry*; an author *selects* the tools an agent may
use (directly or via the skills it loads).

**Knowledge & retrieval** (mostly read-only / green)
| Tool | Does | Access | Risk |
|---|---|---|---|
| `literature_search` | Crossref / OpenAlex / arXiv / Semantic Scholar | read | green |
| `read_student_doc` | RAG over the student's own paper/slides/draft | read | green |
| `rubric_lookup` | fetch the assessment rubric | read | green |
| `course_material_search` | search teacher-uploaded sources | read | green |
| `web_search` | controlled web search | read | yellow (off-box, provenance) |
| `citation_lookup` | resolve / format references | read | green |

**Documents & artifacts**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `read_file` / `write_file` | read / draft files | R / W | green / yellow |
| `pdf_to_markdown` | convert a paper (we have `scripts/pdf_to_md.py`) | read | green |
| `outline_generator` | structure a paper or talk | write | green |
| `slides_generator` / `poster_generator` | Hu's poster skill, ppt-master | write | yellow |
| `track_changes_diff` | annotate a student draft | R / W | yellow |

**Speaking & voice (our wedge)**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `tts_speak` | voice a prompt/question | write(audio) | green |
| `stt_transcribe` | transcribe student speech | read | green (consent-gated) |
| `acoustic_fluency` | pace / pauses / fillers / pitch (Pref D) | read | green |
| `pronunciation_assess` | score pronunciation | read | green |
| `record_capture` / `playback` | opt-in audio retention | R / W | yellow (consent) |

**Assessment & feedback**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `rubric_scorer` | score a response vs a rubric (advisory) | read | yellow |
| `language_feedback` | grammar/lexis — on-box T5 model possible (Pref J) | read | green |
| `readability_metrics` / `lexical_diversity` | text metrics | read | green |
| `self_rating_capture` | student rates own confidence | write | green |
| `compare_to_model_answer` | gap vs an exemplar | read | yellow |

**Pedagogical interaction**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `question_generator` | likely exam/viva questions from a paper | write | green |
| `hint_generator` | graduated hints, **never the answer** (core to fading) | write | green |
| `quiz_flashcard_generator` | practice items | write | green |
| `misconception_detector` | spot a misunderstanding | read | yellow |
| `simulated_student` | role-play personas to **test** an agent (TeachTune) | read | green |

**Workflow & state**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `session_memory` | anonymous per-`sid` recall | R / W | green |
| `pacing_timer` | enforce one-step-at-a-time | — | green |
| `progress_tracker` / `mastery_state` | track skill progression | R / W | green |
| `escalation_flag` | route to human / supervisor | write | yellow → red trigger |

**Research & data (researcher persona)**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `anonymized_export` | logs / turns / events | read | yellow (ethics-gated) |
| `survey_capture` | wishlists / feedback (we have `wishlists`) | write | green |
| `transcript_export` | export a session transcript | read | yellow |
| `qualitative_coding_helper` | annotate transcripts | R / W | yellow |

**School-system integrations (all gated, mostly later phases)**
| Tool | Does | Access | Risk |
|---|---|---|---|
| `lms_read` | assignments / rubrics from the LMS | read | yellow |
| `calendar_read` | advising-prep context | read | yellow |
| `email_draft` | **draft only, never send** | write(draft) | yellow (human sends) |

---

## 2B. Skills — the authoring framework (the key question)

**Tool vs skill, made crisp:**
- A **tool** is an atomic capability the *platform* provides (a verb / API).
- A **skill** is a reusable *playbook* — instructions + the tools it needs +
  bundled knowledge + its own guardrails + eval cases — that teaches the agent
  *how* to do one higher-level job well. Same idea as this environment's
  `SKILL.md`, Anthropic's "skills," and your own `docs/skills/` folder.

> **Agent (six-block spec) = a job + a chosen set of SKILLS + the TOOLS those
> skills require + guardrails + eval.** Tools are the verbs; skills are the
> recipes; an agent is a curated menu of recipes for one user in one moment.

**You already run a skill ecosystem — connect it, don't reinvent it:**
- `docs/skills/medical-paper-to-research-poster/` — Hu's poster skill.
- `docs/testDebug/skills/` — the test-debug runbook.
- `tesolchina/vibecodingskills` hub (anonymous-session-schema, pdf-to-markdown,
  regression-test-runbook) — **this is your skill registry.**

**Proposed skill schema** (reuse the `SKILL.md` convention you already use, so a
teacher writes one file):

```
---
name: grade-against-rubric
description: one line on WHEN to use it (drives auto-selection)
owner:           # who maintains it
version:
tools_required: [rubric_lookup, rubric_scorer, language_feedback]
knowledge:       [the rubric file]
guardrails: { green: [...], yellow: [...], red: [invent a score] }
eval_cases:      # sample inputs + expected behaviour, fed to the TeachTune runner
---
# Instructions  (the playbook the agent loads on demand)
1. ...
2. ...
```

**Where skills come from — three channels:**
1. **Seed** — we ship a starter set: paper→outline, viva-Q&A, Socratic
   discussion, grade-against-rubric, lit-review-plan, poster.
2. **Authored** — teachers write skills from the template, then must pass the
   **"test against simulated students" gate** before publishing (quality control
   = the eval loop). This is the SAIL RQ3 co-creation act.
3. **Sourced** — adapt from the open ecosystem (the Replit/Anthropic skill
   format, community skill libraries), reviewed before admission to the registry.

**So "a good framework for people to write" (your words) = four pieces:** the
*template* + the *registry* (your hub) + the *eval gate* + a clear *tool
catalogue* (§2A) to draw from.

**Decided (Simon, 2026-06-03): teachers may *author new* skills, not just select
them — but the "simulated-student test" quality gate is a hard prerequisite and
must be built first.** Consequence: the eval gate is no longer a late-stage nice-
to-have; it moves forward in the roadmap and becomes the *gate that opens
authoring*. No teacher-authored skill reaches the shared registry until it passes
its `eval_cases` against the simulated-student panel. (Selecting + composing
existing skills can ship earlier and does not require the gate.)

---

## 3. Architecture (lowest-risk path)

```
            ┌─────────────────────────────────────────────┐
            │  Authoring UI  (six-block form + test runner)│  ← build (copy Playlab/Dify UX)
            └───────────────┬─────────────────────────────┘
                            │ writes Agent Spec (yaml/json)
            ┌───────────────▼─────────────────────────────┐
            │  Agent Spec store  (versioned, shareable)    │  ← extend bot-config/prompts
            └───────────────┬─────────────────────────────┘
                            │ generates runtime
   ┌────────────────────────▼───────────────────────────────────────┐
   │  Runtime layer (OURS — the wedge)                                │
   │  • conversational loop (turn-by-turn, fading, hint-not-answer)   │
   │  • VOICE: TTS chain + STT  ← ASPP-Academic                       │
   │  • DATA: anonymous sid, opt-in audio, one-click delete ← ours    │
   │  • event/turn logging for research + eval                        │
   └───────────────┬───────────────────────────┬─────────────────────┘
                   │                            │
        ┌──────────▼─────────┐      ┌───────────▼───────────┐
        │  Engine (RENT)     │      │  Eval (copy TeachTune) │
        │  RAG + model rout. │      │  simulated students    │
        │  Dify / Langflow   │      │  + quality dashboard   │
        └────────────────────┘      └────────────────────────┘
```

**Build vs rent rule:** rent the commodity (node builder, RAG, model routing —
Dify/Langflow self-hosted); **own** the wedge (voice, anonymity/consent,
research logging, the guardrail+eval authoring). Keep the current Flask app as
the runtime/consent layer in front of the rented engine.

---

## 4. How this doubles as SAIL's RQ3 deliverable

SAIL's RQ3 is: *can teachers and students author and share effective SRL agents,
and what supports sustainable, equitable adoption?* This platform **is** that
deliverable, and the mapping is exact:

- **The authoring UI** = the instrument that lets teachers/NGO tutors *make*
  agents (frontline ownership, equity — the SCOLAR scoring criteria).
- **The Agent Spec + sharing** = the "shared starter library" (the 3 seed agents:
  Planner / Monitor / Reflector) plus community-authored agents.
- **The guardrail block (fading, hint-not-answer)** = the operationalization of
  SAIL's RQ2 (autonomy not dependency).
- **The evaluation loop (simulated students, over-reliance metrics)** = SAIL's
  evidence pipeline; TeachTune gives it a citable method.
- **Our voice + anonymous-data layer** = what makes SAIL's *speaking* component
  (DSE Paper 4 + SBA presentation) and its *minor-subject ethics* feasible —
  filling the one gap the reading/writing seed agents leave open.

So a single engineering effort yields (a) the product Simon described and (b) a
fundable, novel research artifact — with the *research* staying focused on
transfer + co-creation, and the platform serving the study (SAIL's own caution).

Add to SAIL Part B as: **"ASPP-Academic supplies the speaking module, the voice
pipeline, and the anonymous minor-safe data layer; the agent-authoring platform
is the RQ3 co-creation instrument, evaluated via simulated-student review."**

---

## 5. Phased roadmap (research-first, not a software moonshot)

**Phase 0 — Spec & seed (now).** Lock the Agent Spec schema (this doc). Re-express
our existing speaking scenario as a v0.1 spec. Pick the engine (spike Dify vs
Langflow self-hosted). *Deliverable: this spec + one working seed agent.*

**Phase 1 — Authoring MVP (select & compose).** Turn `prompts`/`bot-config`
editing into a six-block form + a "test your agent" runner (chat, then voice).
Teachers compose agents by **selecting** seed skills + tools. No skill-authoring
yet. *Deliverable: a teacher can stand up an agent from existing skills without
editing files.*

**Phase 2 — Knowledge, guardrails + the eval gate (prerequisite).** Add
per-session source upload (RAG) and the green/yellow/red guardrail UI with runtime
enforcement + fading. **Build the TeachTune-style simulated-student runner here**
— it is the prerequisite Simon set for opening skill-authoring. *Deliverable:
grounded, safe agents + a working "simulated-student test" any skill must pass.*

**Phase 3 — Open teacher skill-authoring + sharing.** Now that the eval gate
exists, open the skill template so teachers **write new skills**; publishing to the
shared registry requires passing `eval_cases` against the simulated-student panel.
Add the per-agent quality dashboard and the sharing library. *Deliverable: the
RQ3 co-creation instrument (teacher-authored, eval-gated), ready for SAIL Cycle 1.*

**Phase 4 — Multi-tenant + transfer instrumentation.** Author accounts (still
anonymous *student* data), the live monitoring dashboard (copy SchoolAI), and the
secondary→tertiary transfer logging (UE1 site). *Deliverable: study-ready.*

---

## 6. Open decisions (need Simon)

- **Engine choice:** Dify vs Langflow vs lean custom (recommendation: spike Dify).
- **Scope discipline:** keep the platform serving the study — which agents are
  *seed* (we build) vs *authored* (teachers build) in the grant?
- ~~Select-only vs author-new skills for teachers~~ **RESOLVED 2026-06-03:**
  teachers may author new skills; the simulated-student eval gate is a hard
  prerequisite (Phase 2) and gates publishing to the shared registry.
- **Hosting/data:** confirm everything self-hosted to satisfy Pref J (no
  third-party agent platforms for student data) — rules out OpenAI AgentKit /
  Gemini Gems as the runtime, keeps them only as design references.
- **Naming:** the platform vs ASPP-Academic vs SAIL — one brand or a family?
- **Partner alignment:** does Playlab.ai become a reference, a collaborator, or a
  competitor to differentiate from in the proposal?

---

## 7. Appendix — engine selection criteria (go/no-go)

Score candidates (from `agent-platform-landscape.md`) before committing in Phase 0.
**Hard gates** (any fail = reject):

1. **Licence** — must be a standard permissive licence (MIT/Apache-2.0) *or* a
   custom licence explicitly read and cleared for self-hosted academic research.
   *Status: Langflow = MIT (pass); Dify/Flowise/FastGPT = NOASSERTION (read first).*
2. **Self-hostable** with no mandatory phone-home for student data (Pref J).
3. **Model-agnostic** — can route to OpenRouter / our own provider chain, not
   locked to one vendor.

**Weighted criteria** (score 1–5): integration effort with our Flask + voice +
consent layer · RAG quality for the knowledge block · workflow/node editor fit ·
community + maintenance health · how much of the six-block authoring UI we get
for free.

**Pref J compliance note (important):** self-hosting the *orchestrator* is
necessary but **not sufficient**. Student data still leaves the box on every
LLM/TTS/STT *provider* call. Pref J = self-hosted orchestration **plus** one of:
(a) a contracted provider with a data-processing agreement and no-training terms,
or (b) local/on-box models. Phase 0 must record which path each agent uses, and
the consent copy must reflect it.

**Recommendation:** Phase-0 spike = **Langflow** (passes all hard gates today);
benchmark **Dify** only after its custom licence is cleared.
