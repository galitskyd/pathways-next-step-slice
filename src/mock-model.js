import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildGroundedPrompt, validateModelPayload } from "./model-boundary.js";

const MOCK_RESPONSE = "Northline is paid and has a Nov 30, 2026 application deadline; Cascade is a three-quarter, day-only certificate starting Jan 6, 2027. Eligibility and seat availability cannot be confirmed here—ask a human advisor. Sources: PRG-02 and PRG-01.";

export function callMockModel(payload, { logPath = "model-calls.log" } = {}) {
  const programRecords = validateModelPayload(payload);
  const input = buildGroundedPrompt(programRecords);
  const output = MOCK_RESPONSE;
  const destination = logPath instanceof URL ? fileURLToPath(logPath) : resolve(logPath);
  appendFileSync(destination, `${JSON.stringify({ input, output })}\n`, "utf8");
  return { input, output, label: "Local deterministic mock model" };
}
