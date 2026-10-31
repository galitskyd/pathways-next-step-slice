# Evaluation and Release Decision Plan

## North-star outcome

Pathways should increase the number of people who complete a verified next step—not merely the number who receive information or generate a plan. For this slice, the meaningful outcome is: the learner receives an advisor-confirmed answer about Northline requirements in time to use the official application process before November 30.

## Automated release gates

These checks run on every change and are release-blocking:

| Gate | Required result | Why it matters |
|---|---:|---|
| Grounded recommendation | Every displayed program fact has a known source ID and last-checked date | State partners need traceable evidence |
| Unknown handling | Age-at-start, diploma status, eligibility, and seats remain explicitly unconfirmed | The product must not turn missing data into advice |
| Minor-data boundary | Name, age, notes, and arbitrary free text are rejected before model context | Privacy must fail closed, not depend on UI behavior |
| Model auditability | Exact model input and output are logged | Reviewers can reconstruct what the model saw and said |
| Action semantics | Saved plans never claim application, enrollment, eligibility, or award | Users must understand what did and did not happen |

Any privacy-boundary or grounding failure blocks release. A model-quality improvement cannot offset a safety regression.

## Synthetic-user expansion

The current harness covers Dani's successful path plus adversarial personal-field requests. Before a pilot, add cases for expired source dates, missing records, conflicting program facts, prompt-injection text inside retrieved content, duplicate advisor requests, network failures, and users who do not meet a known rule. Add Marcus as a separate policy fixture only after Dani's path is stable; expect PRG-05 and AID-B to appear, while personal eligibility remains unknown.

## Pilot evidence

Automated checks establish trust properties, but they do not prove user impact. Instrument privacy-safe events such as plan viewed, comparison expanded, advisor handoff prepared, and next step verified by an advisor. Review completion rate, time to verified answer, drop-off by step, unknown-to-advisor conversion, stale-source rate, grounding defects, privacy alarms, accessibility findings, and support contacts.

Release decisions should combine the automated gates with co-design research and pilot outcomes. Expand only when trust gates remain green and the verified-next-step rate improves without widening inequities across schools, regions, disability needs, language, or device constraints.
