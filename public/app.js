const startButton = document.querySelector("#start-button");
const planSection = document.querySelector("#plan");
const explainButton = document.querySelector("#explain-button");
const saveButton = document.querySelector("#save-button");
const advisorNote = document.querySelector("#advisor-note");

function sourceLine(record) {
  return `Source: ${record.id} · Last checked: ${record.lastChecked}`;
}

function optionCard(record, featured = false) {
  const card = document.createElement("article");
  card.className = `option-card${featured ? " featured" : ""}`;
  card.innerHTML = `
    ${featured ? '<span class="fit-label">Strong hands-on fit</span>' : ""}
    <h3>${record.name}</h3>
    <ul>${record.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>
    <p class="source">${sourceLine(record)}</p>`;
  return card;
}

async function loadPlan() {
  const plan = await fetch("/api/plan").then((response) => response.json());
  document.querySelector("#plan-heading").textContent = plan.heading;
  const comparison = document.querySelector("#comparison");
  comparison.replaceChildren(...plan.comparison.map((record, index) => optionCard(record, index === 0)));
  document.querySelector("#recommendation-title").textContent = plan.recommendation.title;
  document.querySelector("#recommendation-rationale").textContent = plan.recommendation.rationale;
  document.querySelector("#recommendation-source").textContent = `Source: ${plan.recommendation.source.id} · Last checked: ${plan.recommendation.source.lastChecked}`;
  document.querySelector("#unknowns").innerHTML = plan.unknowns.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#checklist").innerHTML = plan.checklist.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#handoff-message").textContent = plan.handoff.message;
  document.querySelector("#disclaimer").textContent = plan.disclaimer;
  advisorNote.value = localStorage.getItem("pathways-advisor-note") ?? "";
  planSection.hidden = false;
  planSection.scrollIntoView({ behavior: "smooth" });
}

startButton.addEventListener("click", loadPlan);

explainButton.addEventListener("click", async () => {
  explainButton.disabled = true;
  const response = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Deliberately only record IDs: no name, age, note, or free text.
    body: JSON.stringify({ programIds: ["PRG-02", "PRG-01"] })
  });
  const result = await response.json();
  const card = document.querySelector("#model-explanation");
  card.innerHTML = `<strong>${result.model}</strong><p>${result.explanation}</p>`;
  card.hidden = false;
  explainButton.disabled = false;
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("pathways-advisor-note", advisorNote.value);
  localStorage.setItem("pathways-plan-saved", "true");
  document.querySelector("#save-status").textContent = "Plan saved on this device. Nothing was submitted or sent to an advisor.";
});
