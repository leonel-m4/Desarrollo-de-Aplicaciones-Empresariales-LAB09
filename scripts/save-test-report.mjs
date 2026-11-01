// Save a readable, portable summary of a real Vitest JSON report.
// Usage: node scripts/save-test-report.mjs input.json output.json "npm.cmd run duel"
import fs from "node:fs";
import path from "node:path";

const [input, output, command] = process.argv.slice(2);
const report = JSON.parse(fs.readFileSync(input, "utf8"));
const summary = {
  command,
  passed: report.numPassedTests,
  failed: report.numFailedTests,
  total: report.numTotalTests,
  files: report.testResults.map((file) => ({
    file: path.relative(process.cwd(), file.name).replaceAll("\\", "/"),
    tests: file.assertionResults.map((test) => ({
      name: test.fullName,
      status: test.status,
      ...(test.failureMessages.length ? { messages: test.failureMessages } : {}),
    })),
  })),
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`${output}: ${summary.passed} passed, ${summary.failed} failed (${summary.total})`);
for (const file of summary.files) {
  const passed = file.tests.filter((test) => test.status === "passed").length;
  console.log(`${file.file}: ${passed}/${file.tests.length} passed`);
}
