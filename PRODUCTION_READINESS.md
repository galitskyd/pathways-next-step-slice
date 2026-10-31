# Production Readiness and 100,000-User Path

## Architecture direction

Keep the current separation of concerns: deterministic policy chooses actions and identifies unknowns; retrieval supplies versioned evidence; models explain evidence but do not approve eligibility. At production scale, place a mobile web client behind an authenticated API layer, use a tenant-aware plan service, a versioned policy engine, a retrieval service with provenance, a model gateway, an advisor-workflow queue, and privacy-safe analytics. Every user-facing claim should retain its source version and evaluation trace.

## Protecting minors

- Separate identity/PII storage from planning and model services, using tokenized internal identifiers.
- Obtain age-appropriate consent and support guardian or institutional delegated access where required.
- Enforce school/district tenancy and role-based authorization for learners, advisors, and administrators.
- Allowlist model context; block raw names, ages, notes, and uncontrolled free text before the model gateway.
- Encrypt data in transit and at rest; define short retention periods, deletion workflows, access logs, and incident procedures.
- Keep advisor notes out of model-training and inference paths unless a separately reviewed use case and consent policy permits them.
- Evaluate portable credentials behind explicit consent and selective disclosure; do not make verifiable credentials a prerequisite for early user value.

## Reliability, cost, and observability

Use queues and idempotency keys for advisor handoffs, cache versioned public records, set model timeouts and bounded retries, and degrade to deterministic sourced content when the model is unavailable. Monitor task completion, advisor latency, stale evidence, grounding defects, privacy-policy rejections, model cost per completed outcome, latency, and error budgets. Sample audit traces without copying PII into telemetry.

## AI-native delivery lifecycle

Run a repeatable loop: co-design evidence → outcome specification → agent build → adversarial specification/code review → automated evaluation → human product/security review → controlled pilot → outcome analysis. Store specifications, evaluation fixtures, model-call traces, and release decisions beside the code. Coaches should review how engineers direct and correct agents, not reward raw generated-code volume.

## First 90 days

- Days 1–30: observe learners, advisors, product flows, data boundaries, and partner commitments; baseline trust and outcome metrics.
- Days 31–60: establish the shared planning, grounding, model-gateway, and evaluation patterns; ship one controlled learner cohort.
- Days 61–90: use pilot evidence to improve verified-next-step completion, close privacy/security findings, and harden the path to thousands of students without prematurely building a large platform or team.
