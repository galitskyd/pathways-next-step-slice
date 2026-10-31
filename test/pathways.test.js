import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { test } from "node:test";
import { buildDaniPlan } from "../src/planner.js";
import { validateModelPayload } from "../src/model-boundary.js";
import { callMockModel } from "../src/mock-model.js";

const logPath = new URL("../model-calls.log", import.meta.url);
writeFileSync(logPath, "", "utf8");

test("planner reaches a concrete, time-bound next step", () => {
  const plan = buildDaniPlan();
  assert.equal(plan.recommendation.programId, "PRG-02");
  assert.match(plan.recommendation.rationale, /Nov 30, 2026/);
  assert.equal(plan.checklist.length, 3);
  assert.match(plan.disclaimer, /not an application/i);
});

test("every displayed program is grounded with a source and date", () => {
  const plan = buildDaniPlan();
  for (const record of plan.comparison) {
    assert.match(record.id, /^PRG-/);
    assert.match(record.lastChecked, /Oct \d{2}, 2026/);
    assert.ok(record.facts.length > 0);
  }
});

test("unknown eligibility is explicit and routed to a human", () => {
  const plan = buildDaniPlan();
  assert.ok(plan.unknowns.some((item) => /18 by/i.test(item)));
  assert.ok(plan.unknowns.some((item) => /seat availability/i.test(item)));
  assert.equal(plan.handoff.source.id, "ADV-01");
  assert.match(plan.handoff.message, /cannot contact|does not contact/i);
});

test("model boundary rejects names, ages, notes, and other extra fields", () => {
  for (const field of ["name", "age", "note", "freeText"]) {
    assert.throws(
      () => validateModelPayload({ programIds: ["PRG-02"], [field]: "private" }),
      /not allowed/
    );
  }
});

test("mock model receives only grounded records and logs exact input/output", () => {
  const result = callMockModel({ programIds: ["PRG-02", "PRG-01"] }, { logPath });
  assert.doesNotMatch(result.input, /Dani|17|advisor note/i);
  assert.match(result.input, /PRG-02/);
  assert.match(result.output, /cannot be confirmed/i);
  const entries = readFileSync(logPath, "utf8").trim().split("\n").map(JSON.parse);
  assert.deepEqual(entries, [{ input: result.input, output: result.output }]);
});
