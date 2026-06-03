# Agent-Authoring Platform — Landscape Scan (what to copy)

> **Built:** 2026-06-03 HKT · **For:** the "teachers/researchers build their own
> teaching & research agents" platform direction.
> **Sources scanned:** GitHub, Hugging Face, arXiv, OpenAlex, Crossref. Scopus
> was attempted but its API returned HTTP 401 (needs a paid Elsevier API key we
> do not hold). OpenAlex + Crossref are used as open substitutes: their coverage
> **overlaps substantially** with Scopus but is **not equivalent** — a Scopus
> pass should be re-run from an institutional account before the proposal's
> formal literature review, especially for journal (non-arXiv) sources.
> **Framing reference:** OpenAI, *How to Build Agents for Higher Education*
> (Apr 2026) — the six-building-block model (job · knowledge · tools ·
> workflow/instructions · guardrails · evaluation loop).

This is a "don't reinvent" map. Each row says **what it is** and, crucially,
**what we should copy** for our platform. Nothing here is a finished competitor
to clone wholesale — the gap we fill (academic *speaking* + voice + anonymous,
minor-safe data + a research design) is unoccupied. But the *authoring UX*, the
*runtime*, and the *evaluation method* are all solved problems we should borrow.

---

## 1. Closest analogs to our actual vision (teachers build agents)

| Product | What it is | What to copy | What it lacks (our wedge) |
|---|---|---|---|
| **Playlab.ai** | Nonprofit; educators/students build custom AI apps **no-code**. Founders from MIT, Harvard, Google, Teach For All. Explicit *agency-not-dependency / equity* framing. | The whole **mission framing** (it is almost word-for-word SAIL's equity + co-creation case), the no-code app-builder UX, the community sharing model. | No academic-speaking/voice focus; not a research instrument; not anonymous-by-design for a study. |
| **MagicSchool AI** | Huge teacher tool suite; "Custom Chatbot" inside Student Rooms. | Teacher-first onboarding, template gallery, the "Room" container for a class session. | Closed; English-general; no SRL/transfer research; no voice rehearsal. |
| **SchoolAI** | "Spaces" (teacher-authored activities) + "Dot" student assistant; live teacher monitoring dashboard. | The **live monitoring dashboard** over many student sessions, and the "Space = authored activity" object. | Closed; US-curriculum; no speaking; no consent/anonymity model for minors-as-research-subjects. |
| **Mizou** | Educator chatbot/persona builder; strong on **role-play personas**. | Persona/role-play authoring patterns (relevant to our viva/Q&A simulator). | Closed; thin pedagogy; no transfer measurement. |
| **OpenAI AgentKit** (Agent Builder + Connector Registry + ChatKit, Oct 2025) → **Workspace Agents** (Apr 2026) | The six-block builder, commercialized: visual agent builder, connectors, embeddable chat. | The **ChatKit embeddable runtime** idea and the connector registry pattern; AgentKit's node-based builder is the reference UX for our six-block form. | Vendor-locked to OpenAI; not education-specific; data leaves our servers (violates our Pref J). |
| **Google LearnLM** (in Gemini 2.5) + **Gemini Gems** | Pedagogy-tuned models + a "Gem" custom-tutor builder. | LearnLM's **pedagogy-tuning principles** (worth reading as a system-prompt design source); the Gem = lightweight agent spec. | Closed model; no authoring of guardrails/eval; data residency. |
| **Khanmigo** (Khan Academy) | Socratic tutor; **withholds answers**, asks questions. | Direct precedent for our **hint-not-answer / fading** guardrail (and proof it ships at scale). | Closed; maths/general; no teacher-authoring of agents. |

**Takeaway:** *Playlab.ai is the single closest existing project to the stated
vision* and should be studied first — it validates the market and mirrors SAIL's
equity/co-creation thesis. Our defensible difference is **academic speaking +
voice + anonymous, minor-safe data + an embedded transfer study**.

---

## 2. Open-source infrastructure we can build on (the "engine")

Building a visual agent builder + multi-model runtime from scratch is the
expensive mistake. These are mature, permissively-licensed, and self-hostable
(which satisfies Pref J — data stays on our servers).

| Repo | Stars | What it is | Copy / reuse decision |
|---|---|---|---|
| `langgenius/dify` | ~144k | Production agentic-workflow platform; visual builder, RAG, model-agnostic, self-host. | **Top candidate as the engine** to fork/embed for the authoring + runtime layer. |
| `langflow-ai/langflow` | ~149k | Visual node graph for agents/workflows (Python). | Alternative engine; great for the "workflow" block as a node graph. |
| `FlowiseAI/Flowise` (+ `FlowiseChatEmbed`) | ~53k | Visual agent builder + an **embeddable chat widget**. | Copy the **embed widget** pattern so authored agents drop into any LMS/page. |
| `danny-avila/LibreChat` | ~38k | Multi-model chat, agents, MCP, auth, prompt presets. | Reference for the **multi-provider runtime + admin panel** (matches our TTS/STT-style provider chaining). |
| `Mintplex-Labs/anything-llm` | ~61k | Local-first; workspaces = knowledge + agents. | Copy the **workspace = knowledge-scoped agent** model and local-first stance. |
| `labring/FastGPT` | ~28k | Knowledge-base-grounded agent platform with a flow editor. | Reference for the **knowledge block** UX. |
| `inkeep/agents` | ~1.2k | No-code **visual builder + TypeScript SDK**, 2-way sync. | Copy the **builder↔code two-way sync** idea (lets us escape no-code ceilings). |
| `SmythOS/smythos-studio` | ~0.2k | Open-source visual agent builder + deployable runtime. | Smaller reference design; useful for a lean architecture. |
| `CAHLR/OATutor` | ~0.2k | Academic **open-source Intelligent Tutoring System** with Bayesian Knowledge Tracing (React + Firebase). | Copy the **mastery/knowledge-tracing** model if we ever add skill-progression — research-grade and citable. |
| `GeminiLight/gen-mentor` (GenMentor, WWW'25) | — | LLM **multi-agent** goal-oriented tutoring framework (paper + code). | Copy the **multi-narrow-agent orchestration** (matches SAIL's Planner/Monitor/Reflector suite). |
| `JushBJJ/Mr.-Ranedeer-AI-Tutor` | ~30k | Prompt-only customizable tutor with a config schema. | Copy the **declarative config schema** idea — our `bot-config` is already a primitive version. |

### License / self-host due diligence (verified via GitHub API, 2026-06-03)

License is a go/no-go for SAIL because of **Pref J** (student data stays on our
servers) and grant commercial-use rules. SPDX as reported by GitHub:

| Repo | License (SPDX) | Self-host | Risk for our use |
|---|---|---|---|
| `langflow-ai/langflow` | **MIT** | yes | **Low — clean.** Preferred engine. |
| `danny-avila/LibreChat` | **MIT** | yes | Low — clean. |
| `Mintplex-Labs/anything-llm` | **MIT** | yes | Low — clean. |
| `SmythOS/smythos-studio` | **MIT** | yes | Low (smaller project). |
| `CAHLR/OATutor` | **MIT** | yes | Low. |
| `langgenius/dify` | **NOASSERTION** (Dify Open Source License = Apache-2.0 + extra conditions: no multi-tenant resale, keep branding) | yes | **Medium — read the licence.** Fine for self-hosted research use; verify before any hosted/commercial offering. |
| `FlowiseAI/Flowise` | **NOASSERTION** (Apache-2.0 with addendum) | yes | Medium — verify the addendum. |
| `labring/FastGPT` | **NOASSERTION** (restricted) | yes | Medium–high — restrictive; verify. |
| `inkeep/agents` | **NOASSERTION** | yes | Medium — verify before depending on it. |
| `JushBJJ/Mr.-Ranedeer-AI-Tutor` | **NOASSERTION** | n/a (prompt only) | Low (idea, not code). |

> "NOASSERTION" means GitHub could not match a standard SPDX licence — it does
> **not** mean unlicensed; it means *read the LICENSE file manually before
> committing*. The MIT-licensed options carry the least legal friction.

**Engine recommendation (revised after licence check):** prototype the
authoring/runtime on **Langflow (MIT)** as the primary candidate — clean licence,
Python (matches our Flask stack), node-graph fits the "workflow" block. Keep
**Dify** as a strong secondary (richer out-of-the-box RAG/admin) *only after*
confirming its custom licence is acceptable for self-hosted research use. Keep our
Flask app as the **speaking/voice + consent + research-logging layer** in front:
we own the wedge (voice, anonymity, study data) and rent the commodity (node
builder, RAG, model routing). **Pref J note:** self-hosting the *orchestrator*
does not by itself satisfy Pref J — the LLM/TTS/STT *provider* calls still send
data off-box. Pref J compliance = self-hosted orchestration **plus** an approved,
contracted model/voice provider (or local models) for any student data.

---

## 3. Research grounding (method + design we can cite and copy)

### 3a. LLM pedagogical agents — the field map
- **A Scoping Review of LLM-Based Pedagogical Agents** — arXiv:2604.12253 (2026).
  *Start here*: it taxonomizes the whole space; use it to position our platform.
- **A Theory of Adaptive Scaffolding for LLM-Based Pedagogical Agents** —
  arXiv:2508.01503 (2025). **Directly underpins SAIL's RQ2 (fading scaffolding).**
- **TeachTune: Reviewing Pedagogical Agents Against Diverse Student Profiles with
  Simulated Students** — arXiv:2410.04078 (2024). **Copy this as our evaluation
  method** — test an authored agent against simulated student personas before it
  meets real minors. This *is* the six-block "evaluation loop," made rigorous.
- **The AI Teacher Test** — arXiv:2205.07540 (2022). A measure of pedagogical
  ability; useful for agent-quality metrics.
- **Exploring Teachers' Perspectives on Using Conversational AI Agents for Group
  Collaboration** — arXiv:2602.07142 (2026). Co-creation evidence for SAIL RQ3.
- **Advancing Education through Tutoring Systems: A Systematic Literature
  Review** — arXiv:2503.09748 (2025).
- **A Scoping Review of Platform Tools for Developing LLM-Grounded Multi-Agent
  Systems** — Crossref, 2026. Engine-selection background.
- **Multi-agent approach for collaborative authoring and indexing of pedagogical
  material** — Int. J. Continuing Engineering Education, 2020. Early precedent for
  *authoring* (not just using) agents.

### 3b. Language-learning chatbots (our domain runtime)
- **User-Adaptive Language Learning Chatbots with a Curriculum** —
  arXiv:2304.05489 (2023).
- **Curriculum-Driven EduBot** — arXiv:2309.16804 (2023).
- **Grammar Control in Dialogue Response Generation for Language Learning
  Chatbots** — arXiv:2502.07544 (2025). Copy: controlling output difficulty.
- **Enhancing conversational quality in language-learning chatbots: GPT-4
  evaluation** — arXiv:2307.09744 (2023).

### 3c. Self-regulated learning + GenAI (SAIL's theoretical spine)
- *Empowering student self-regulated learning and science education through
  ChatGPT* (2024, ~252 cit).
- *Empowering ChatGPT with a guidance mechanism in blended learning: effect on
  SRL* (2024, ~189 cit).
- *A classification tool to foster self-regulated learning with generative AI*
  (2024, ~155 cit).
- Extended-TAM acceptance of ChatGPT for **metacognitive** SRL (2024, ~170 cit).

### 3d. GenAI feedback on L2 / academic writing (the feedback engine)
- *The role of generative AI and hybrid feedback in improving L2 writing skills:
  a comparative study* (2025).
- *Generative AI-assisted feedback and EFL writing: proficiency, revision
  frequency* (2025).
- *University students' engagement with GenAI-supported automated writing
  evaluation (AWE) feedback* (2025).
- *Improving Writing Feedback for Struggling Writers: Generative AI to the
  Rescue?* (2024).

### 3e. AIED canon (for the proposal's background section)
- Zawacki-Richter et al. (2019) — *Systematic review of AI applications in higher
  education* (~5,000 cit). DOI 10.1186/s41239-019-0171-0 ·
  OpenAlex W2981863007.
- Kasneci et al. (2023) — *ChatGPT for good?* (~4,900 cit).
  DOI 10.1016/j.lindif.2023.102274 · OpenAlex W4323655724.
- *Artificial Intelligence in Education: A Review* (2020, ~3,400 cit).
- *Students' voices on generative AI* (2023).
- SRL anchor: *Empowering student self-regulated learning and science education
  through ChatGPT* (2024, ~252 cit). DOI 10.1111/bjet.13454 · OpenAlex W4393086054.

### 3f. Hugging Face — reusable models, datasets, demos
Thinner than GitHub for *platforms*, but useful for **drop-in components**:
- **Demos to study** (Spaces): `towardsai-tutors/ai-tutor-chatbot` (♥14, RAG tutor
  pattern), `reachy_mini_language_tutor` (♥26), `pratikshahp/Education-Chatbot-
  Guardrail` (a worked example of the *guardrail* block),
  `Sanjay-Ai/AI-Powered-Socratic-Teaching-Assistant`.
- **Pronunciation/speaking** (our domain): `aletrn/ai-pronunciation-trainer`,
  `pwenker/pronunciation_trainer`, `fabiosuizu/pronunciation-assessment` — copy
  approaches for the **acoustic-fluency** module (Pref D).
- **Datasets**: `Eedi/Question-Anchored-Tutoring-Dialogues-2k` (tutoring dialogue
  — useful for evaluation prompts / few-shot).
- **Models** (self-hostable → helps Pref J): `vennify/t5-base-grammar-correction`
  (♥184) and similar grammar-correction models for on-box L2 feedback without an
  external provider call.

---

## 4. What no one is doing (our unoccupied wedge)

Across every product and paper above, four gaps recur — and we already hold
working assets for all four:

1. **Academic *speaking* + a real voice loop** (TTS/STT, rehearsal, acoustic
   fluency). The field is overwhelmingly reading/writing/maths. *We have it.*
2. **Anonymous-by-design, minor-safe data** with opt-in audio + one-click delete.
   Every classroom product assumes accounts and stores PII. *We have it, and it
   is exactly what SAIL needs for F.5–F.6 subjects.*
3. **The platform as an embedded research instrument** (transfer study,
   comparison arm, simulated-student evaluation à la TeachTune). Products are
   tools, not studies. *SAIL is the study.*
4. **Authoring of the *guardrails and evaluation* blocks**, not just the prompt.
   Most builders let you write a persona; almost none let an author declare a
   green/yellow/red risk map and an eval loop. *This is our differentiator and a
   publishable contribution.*

---

## 5. Recommended "copy list" (the short version)

- **Mission & UX:** Playlab.ai (vision, no-code authoring, equity framing).
- **Engine:** **Langflow (MIT)** first for the builder + runtime + RAG (clean
  licence, Python); Dify second *after* a licence check; Flowise's embed widget
  for drop-in deployment (verify its addendum).
- **Multi-provider runtime + admin:** LibreChat patterns.
- **Evaluation method:** TeachTune (simulated-student review) — make it our eval
  loop.
- **Scaffolding theory:** the Adaptive-Scaffolding theory paper (fading).
- **Mastery modeling (optional, later):** OATutor's knowledge tracing.
- **Keep building ourselves:** voice pipeline, anonymous/consent layer, the
  six-block *guardrail + eval* authoring, and the transfer-study instrumentation.
