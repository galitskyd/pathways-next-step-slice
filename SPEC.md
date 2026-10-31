# Agent Specification — Pathways Next-Step Slice

## Outcome

Ship a small, mobile-first Pathways slice for Dani, a 17-year-old high-school senior who prefers hands-on work and is comparing an electrical apprenticeship with community college. The experience must move her to one honest next step before winter break: prepare the Northline application checklist and request an advisor eligibility review before the November 30 deadline.

## Product decisions

- The deterministic planner—not the model—selects and orders options, evaluates known requirements, identifies unknowns, and chooses the next step.
- A clearly labeled local mock model may only explain an already-selected plan from source records. It receives program IDs and grounded facts, never user data.
- The advisor handoff is mocked. It must never imply that an application, enrollment, eligibility decision, seat, or award was completed.
- The advisor note remains in browser-local state and is never sent to the server or model.

## Constraints

1. Use only the supplied fictional records. Show every source ID and last-checked date.
2. Treat seat availability, Dani's age on March 1, 2027, diploma status, personal eligibility, and unlisted details as unknown.
3. Unknowns must say they cannot be confirmed and point to `ADV-01`.
4. No name, age, or free-text personal detail may enter model context. Reject unexpected model-request fields rather than silently forwarding them.
5. Log the exact model input and output for every model call.
6. Run with one command, test with one command, use no paid service, account, database, API key, or external integration.
7. Build only Dani's end-to-end slice. Explain how Marcus would reuse the planner, but do not implement a second flow.

## Acceptance criteria

- `npm start` serves a usable mobile-first flow.
- Dani sees Northline and Cascade facts with source IDs and dates.
- The UI identifies the November 30 deadline and produces a concrete checklist.
- The UI says it cannot confirm age-at-start, diploma status, eligibility, or seats.
- Saving a plan is clearly not an application or enrollment.
- The advisor handoff is clearly mocked and promises only a response within two business days.
- The advisor note never appears in an API request or model log.
- `/api/explain` accepts only a list of known program IDs and rejects extra personal/free-text fields.
- `npm test` runs at least three automated checks with visible pass/fail output.
- `model-calls.log` contains exact mock-model input and output from the test run.
