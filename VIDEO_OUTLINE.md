# 8–10 Minute Video Outline

Use this as speaking landmarks, not a script. Replace the personal mission section with your own honest reasons.

## 0:00–0:45 — Problem and choice

- Pathways helps people move from school or unemployment to a real next step.
- I chose Dani because the minor-data boundary is central to state-agency trust.
- The outcome is deliberately narrow: a grounded comparison, a deadline-aware checklist, and an honest advisor handoff.

## 0:45–4:30 — Demo

1. Run `npm start` and open the mobile-width UI.
2. Show Northline and Cascade cards, including source IDs and last-checked dates.
3. Explain why the deterministic planner highlights Northline: hands-on, paid, earliest listed action date.
4. Highlight the unknowns: age on March 1, diploma status, eligibility, and seats cannot be confirmed.
5. Click “Explain the comparison.” State that this is a labeled local mock model and that the code—not the model—selects the next step.
6. Enter an advisor note, save the plan, and show the message that nothing was submitted.
7. Run `npm test`; explain the personal-field rejection check and show `model-calls.log`.
8. In code, show `validateModelPayload()` and `buildDaniPlan()` as the privacy and decision points.

## 4:30–5:45 — Mandatory AI question

- Specific redirection: an initially plausible privacy test only inspected the happy-path prompt for Dani's name and age.
- Why it missed the bar: an accidental future caller could still add `note` or arbitrary free text, and the test would remain green.
- What changed: reject every unexpected field at the boundary and test `name`, `age`, `note`, and `freeText` individually.
- Why: for minors' data, “the current UI does not send it” is weaker than “the server refuses to accept it.”

Only use this account after personally reviewing and agreeing with that design decision.

## 5:45–7:15 — Scale and privacy

- At 100,000 users: authenticated APIs, tenant isolation, encrypted storage, queues for advisor workflows, observability, and regional reliability.
- Separate minor PII from model services; use allowlisted structured context, tokenized IDs, retention limits, audit logs, and redaction alarms.
- Keep eligibility and status decisions deterministic and versioned. Models can explain evidence but cannot invent or approve outcomes.
- Run a fixed grounding/privacy evaluation suite before model, prompt, or policy releases.

## 7:15–9:15 — Why CampusEvolve and first 90 days

Personalize this. Suggested structure:

- Connect to a specific user outcome: a student should leave with one safe, achievable action—not another wall of information.
- Explain why state-scale trust is interesting: engagement matters, but one fabricated eligibility answer can damage a statewide rollout.
- First 30 days: observe students, advisors, districts, and existing data flows; define trust and outcome metrics.
- Days 31–60: ship the grounded planning/evaluation foundation and advisor escalation workflow with one pilot cohort.
- Days 61–90: measure completed next steps, unknown-to-advisor conversion, grounding failures, and privacy incidents; harden what works for broader rollout.

## Final check

- Keep the demo under five minutes and the whole recording under ten.
- Do not imply that the mock handoff contacts anyone.
- Do not claim a personal motivation or AI disagreement you did not actually have.
