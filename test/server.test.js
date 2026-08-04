import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import { server } from "../server.js";

let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeIdleConnections();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("health endpoint accepts query parameters", async () => {
  const response = await fetch(`${baseUrl}/api/health?check=1`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  assert.deepEqual(await response.json(), {
    ok: true,
    name: "ai-pm-sandbox",
    version: "0.2.0"
  });
});

test("HTML portfolio export escapes user-provided markup", async () => {
  const response = await fetch(`${baseUrl}/api/export-portfolio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      format: "html",
      portfolio: [{
        scenarioId: "test",
        scenario: { title: "Test", level: "L1" },
        answer: '<img src=x onerror="alert(1)">',
        score: 80,
        xp: 10
      }]
    })
  });

  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.ok, true);
  assert.doesNotMatch(result.content, /<img src=x/);
  assert.match(result.content, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
});

test("static traversal attempts cannot expose repository files", async () => {
  const response = await fetch(`${baseUrl}/..%2Fserver.js`);
  assert.equal(response.status, 403);
  assert.doesNotMatch(await response.text(), /import crypto from "node:crypto"/);
});

test("missing static assets return 404 instead of the HTML app", async () => {
  const response = await fetch(`${baseUrl}/missing.css`);
  assert.equal(response.status, 404);
  assert.match(response.headers.get("content-type"), /text\/plain/);
});
