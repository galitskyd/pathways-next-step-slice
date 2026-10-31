# Pathways Next-Step Slice

A dependency-free, mobile-first proof of concept for CampusEvolve's Pathways product. It serves one fictional persona end to end, uses only the supplied synthetic records, and makes the minor-data boundary observable and testable.

## Run

Prerequisite: Node.js 20 or newer. No installation, account, API key, or paid service is required.

```powershell
npm start
```

Open `http://localhost:3000`.

## Test

```powershell
npm test
```

The command runs five automated checks with visible pass/fail output and recreates `model-calls.log` with the exact mock-model input and output. An optional API demonstration is available with `npm run demo`.

## Section A — Build summary

This slice serves Dani, a 17-year-old high-school senior who likes hands-on work and is weighing an electrical apprenticeship against community college. It moves her toward one concrete action before winter break: prepare the Northline checklist and ask a human advisor to confirm age-at-start, education requirements, eligibility, and seats before the November 30 application deadline. The deterministic planner selects this step because Northline is hands-on, paid, and has the earliest listed action date. The model does not decide eligibility or rank programs.

The records, dates, decision rules, privacy boundary, local plan saving, and automated checks are real code. The explanatory model is a clearly labeled deterministic mock; the advisor handoff and all institutions are fictional. Saving the plan uses browser storage and is explicitly not an application, enrollment, eligibility decision, or award.

The largest 30-minute trade-off was choosing a narrow, inspectable rules engine over an open-ended chatbot. That reduces conversational flexibility but makes grounding and minor-data handling demonstrable. Five checks prove a time-bound next step, source/date attribution, honest unknown handling, advisor routing, rejection of personal or free-text model fields, and exact model-call logging. They would not catch every accessibility or visual-layout regression, so production needs browser and assistive-technology testing.

Marcus could use the same planner with a different deterministic policy: filter for evening options under six months, surface PRG-05, and connect the layoff-notice requirement to AID-B and ADV-01 without claiming eligibility.

## Section B — AI Usage Log

| Interaction | Asked | AI produced | Kept, changed, or rejected |
|---|---|---|---|
| Requirements and persona | Extract the authenticated rubric and choose one persona for the strongest end-to-end slice. | A Dani-centered plan emphasizing the under-18 privacy boundary, deadline, and eligibility uncertainty. | Kept Dani because the privacy requirement becomes testable product behavior. Rejected a broad two-persona build because the challenge explicitly rewards one finished slice. |
| Architecture | Design a no-dependency flow that is AI-native without letting a model make eligibility decisions. | A deterministic planner plus a mock explanatory model receiving only program IDs and grounded records. | Kept the split. Tightened the boundary so unexpected fields are rejected rather than merely omitted, making leakage fail closed and testable. |
| Evaluation | Create checks for grounding, unknowns, privacy, and the required model log. | Five Node tests and a JSON-lines log of exact inputs and outputs. | Kept deterministic checks. Added a direct regression test for name, age, note, and free-text fields after rejecting a weaker test that only searched one happy-path prompt. |

## Key files

- `SPEC.md` — agent outcome, constraints, product decisions, and acceptance criteria.
- `src/planner.js` — deterministic recommendation, unknowns, and advisor handoff.
- `src/model-boundary.js` — strict allowlist before any model context is built.
- `src/mock-model.js` — labeled local model and exact call logging.
- `public/` — responsive user flow and browser-local advisor note.
- `test/pathways.test.js` — five automated trust and behavior checks.
- `VIDEO_OUTLINE.md` — timed walkthrough guide.

## Production path

At roughly 100,000 users, put authenticated APIs behind a gateway, store plans in encrypted tenant-scoped storage, separate minor PII from AI services, tokenize identifiers, enforce retention/deletion policies, and send only allowlisted, versioned context through a model gateway with audit logs and redaction alarms. Keep deterministic eligibility/status rules server-side, require human review for unknowns, version source records, monitor grounding and escalation rates, and test policy changes against a fixed evaluation set before rollout.
