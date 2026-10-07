import { test } from "node:test";
import assert from "node:assert/strict";
import { sendLeadNotification, SAMPLE_LEAD } from "../../src/lib/leads.server.ts";

const template = { subject: "Test", intro: "Test", footer: "Test" };
const originalFetch = globalThis.fetch;

for (const [name, body, expected] of [
  ["boolean provider acknowledgement", { success: true }, true],
  ["string provider acknowledgement", { success: "true" }, true],
  ["HTTP 200 with provider rejection", { success: false }, false],
  ["HTTP 200 without acknowledgement", { message: "Activation needed" }, false],
] as const) {
  test(name, async () => {
    globalThis.fetch = async () => Response.json(body);
    try {
      const result = await sendLeadNotification(template, SAMPLE_LEAD, { maxAttempts: 1 });
      assert.equal(result.ok, expected);
    } finally { globalThis.fetch = originalFetch; }
  });
}

test("permanent rejection is not retried", async () => {
  let attempts = 0;
  globalThis.fetch = async () => { attempts++; return new Response("Denied", { status: 403 }); };
  try {
    const result = await sendLeadNotification(template, SAMPLE_LEAD);
    assert.equal(result.ok, false);
    assert.equal(attempts, 1);
  } finally { globalThis.fetch = originalFetch; }
});

test("provider timeout is reported as failure", async () => {
  globalThis.fetch = async () => { throw new Error("Timeout"); };
  try {
    assert.equal((await sendLeadNotification(template, SAMPLE_LEAD, { maxAttempts: 1 })).ok, false);
  } finally { globalThis.fetch = originalFetch; }
});
