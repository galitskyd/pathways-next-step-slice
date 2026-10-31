export const records = Object.freeze({
  "PRG-01": {
    id: "PRG-01",
    name: "Cascade Community College, Medical Assistant Certificate",
    facts: ["3 quarters", "Day classes only", "Estimated total tuition: $4,200", "Next start: Jan 6, 2027"],
    lastChecked: "Oct 20, 2026"
  },
  "PRG-02": {
    id: "PRG-02",
    name: "Northline Electrical Apprenticeship",
    facts: [
      "Paid",
      "4 years",
      "Starts at 55% of journey-level wage",
      "Must be 18 by the program start date",
      "High-school diploma or GED required",
      "Applications close Nov 30, 2026",
      "Program starts Mar 1, 2027"
    ],
    lastChecked: "Oct 20, 2026"
  },
  "ADV-01": {
    id: "ADV-01",
    name: "Human advisor handoff",
    facts: ["Advisors confirm eligibility, seats, and award amounts", "Response within 2 business days"],
    lastChecked: "n/a"
  }
});

export function getRecord(id) {
  return records[id] ?? null;
}
