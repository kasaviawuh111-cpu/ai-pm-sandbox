import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appSource = fs.readFileSync(path.join(__dirname, "..", "public", "app.js"), "utf8");
const scenarioSource = appSource.slice(0, appSource.indexOf("const stackItems"));
const sandbox = {};
vm.runInNewContext(`${scenarioSource}\nthis.__scenarios = scenarios;`, sandbox);
const scenarios = sandbox.__scenarios;

function decisionStages() {
  return scenarios.flatMap((scenario) => scenario.stages
    .filter((stage) => !stage.choices.every((choice) => choice.isFinal))
    .map((stage) => ({ scenario, stage })));
}

test("story map contains eight real decisions and two reflection endings", () => {
  assert.equal(scenarios.length, 3);
  assert.equal(scenarios.reduce((sum, scenario) => sum + scenario.stages.length, 0), 10);
  assert.equal(decisionStages().length, 8);
  assert.equal(decisionStages().reduce((sum, entry) => sum + entry.stage.choices.length, 0), 24);
});

test("every later act covers every previous choice with a distinct branch", () => {
  scenarios.forEach((scenario) => {
    scenario.stages.slice(1).forEach((stage, index) => {
      const previous = scenario.stages[index];
      const expectedIds = previous.choices.map((choice) => choice.id).sort();
      const branchIds = Object.keys(stage.contextBranch || {}).sort();
      assert.equal(
        branchIds.join("|"),
        expectedIds.join("|"),
        `${scenario.id} stage ${stage.index} must branch from every choice in stage ${previous.index}`
      );
      assert.equal(
        new Set(Object.values(stage.contextBranch)).size,
        expectedIds.length,
        `${scenario.id} stage ${stage.index} branches must not silently converge`
      );
    });
  });
});

test("decision options stay neutral, balanced in length, and structurally complete", () => {
  const ids = new Set();
  const answerPositionCounts = [0, 0, 0];
  const answerLeak = /推荐|最佳|标准答案|唯一正确|正确选项/u;

  decisionStages().forEach(({ scenario, stage }) => {
    assert.equal(stage.choices.length, 3, `${scenario.id} stage ${stage.index} should have three choices`);
    const visibleChoices = stage.optionOrder
      ? stage.optionOrder.map((id) => stage.choices.find((choice) => choice.id === id))
      : stage.choices;
    assert.ok(visibleChoices.every(Boolean), `${scenario.id} stage ${stage.index} optionOrder must reference valid choices`);

    const lengths = visibleChoices.map((choice) => choice.text.length);
    assert.ok(
      Math.max(...lengths) - Math.min(...lengths) <= 10,
      `${scenario.id} stage ${stage.index} option copy should have comparable detail`
    );

    visibleChoices.forEach((choice) => {
      assert.ok(!ids.has(choice.id), `choice id ${choice.id} must be unique`);
      ids.add(choice.id);
      assert.equal(typeof choice.score, "number", `${choice.id} must have a numeric score`);
      assert.ok(choice.consequence, `${choice.id} must show a consequence`);
      assert.ok(choice.whyThisScore, `${choice.id} must explain the score after completion`);
      assert.doesNotMatch(`${choice.title} ${choice.text}`, answerLeak, `${choice.id} leaks the answer`);
    });

    const bestScore = Math.max(...visibleChoices.map((choice) => choice.score));
    answerPositionCounts[visibleChoices.findIndex((choice) => choice.score === bestScore)] += 1;
  });

  answerPositionCounts.forEach((count, index) => {
    assert.ok(count >= 2, `best choice should appear in position ${String.fromCharCode(65 + index)} at least twice`);
  });
});

test("reflection endings do not create fake scored choices", () => {
  const reflections = scenarios.flatMap((scenario) => scenario.stages)
    .filter((stage) => stage.choices.every((choice) => choice.isFinal));
  assert.equal(reflections.length, 2);
  reflections.forEach((stage) => {
    assert.equal(stage.choices.length, 1);
    assert.equal(stage.choices[0].score, undefined);
    assert.equal(stage.choices[0].whyThisScore, undefined);
  });
});
