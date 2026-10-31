import { getRecord } from "./records.js";

const allowedKeys = new Set(["programIds"]);

export function validateModelPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Request body must be an object");
  }
  const unexpected = Object.keys(payload).filter((key) => !allowedKeys.has(key));
  if (unexpected.length) {
    throw new Error(`Personal or free-text fields are not allowed: ${unexpected.join(", ")}`);
  }
  if (!Array.isArray(payload.programIds) || payload.programIds.length === 0) {
    throw new Error("programIds must be a non-empty array");
  }
  const records = payload.programIds.map((id) => getRecord(id));
  if (records.some((record) => !record || record.id === "ADV-01")) {
    throw new Error("programIds contains an unknown or unsupported record");
  }
  return records;
}

export function buildGroundedPrompt(programRecords) {
  const evidence = programRecords.map((record) => ({
    sourceId: record.id,
    lastChecked: record.lastChecked,
    name: record.name,
    facts: record.facts
  }));
  return JSON.stringify({
    task: "Explain the differences using only the supplied evidence. State that unknown eligibility and seats require a human advisor.",
    evidence
  });
}
