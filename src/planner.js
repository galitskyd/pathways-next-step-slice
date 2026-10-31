import { getRecord } from "./records.js";

export function buildDaniPlan() {
  const apprenticeship = getRecord("PRG-02");
  const college = getRecord("PRG-01");
  const advisor = getRecord("ADV-01");

  return {
    personaId: "dani-demo",
    heading: "A hands-on next step before winter break",
    recommendation: {
      programId: apprenticeship.id,
      title: "Prepare for the Northline application deadline",
      rationale: "Northline is paid, hands-on, and has the earliest listed action date: Nov 30, 2026.",
      source: { id: apprenticeship.id, lastChecked: apprenticeship.lastChecked }
    },
    comparison: [apprenticeship, college],
    unknowns: [
      "We cannot confirm whether you will be 18 by Mar 1, 2027.",
      "We cannot confirm your diploma or GED status.",
      "We cannot confirm personal eligibility or seat availability."
    ],
    checklist: [
      "Ask an advisor to confirm age-at-start and education requirements.",
      "Collect the documents the advisor says are needed.",
      "If confirmed eligible, use Northline's official process before Nov 30, 2026."
    ],
    handoff: {
      source: { id: advisor.id, lastChecked: advisor.lastChecked },
      message: "An advisor can confirm eligibility and seats and responds within 2 business days. This demo does not contact one."
    },
    disclaimer: "Saving this plan is not an application, enrollment, eligibility decision, or award."
  };
}
