import { execFileSync } from 'node:child_process';

const exceptions = new Map([
  [
    'https://github.com/advisories/GHSA-fc5q-39xc-vjpf',
    {
      expires: '2027-02-16',
      severity: 'high',
      reason: 'No patched Picomatch release is available; it is used by development tooling.',
    },
  ],
]);
const severityRank = { low: 0, moderate: 1, high: 2, critical: 3 };
const today = new Date().toISOString().slice(0, 10);

let auditOutput;
try {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    throw new Error('Run this audit through npm run audit:ci so npm can be located.');
  }
  auditOutput = execFileSync(process.execPath, [npmCli, 'audit', '--json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
} catch (error) {
  if (!error.stdout) {
    throw error;
  }
  auditOutput = error.stdout;
}

const report = JSON.parse(auditOutput);
const severityTotals = report.metadata?.vulnerabilities;
if (!severityTotals) {
  throw new Error('npm audit returned a report without vulnerability totals.');
}

const advisories = new Map();
for (const [packageName, vulnerability] of Object.entries(report.vulnerabilities ?? {})) {
  for (const item of vulnerability.via ?? []) {
    if (typeof item === 'string' || (severityRank[item.severity] ?? 0) < severityRank.moderate) {
      continue;
    }

    if (!item.url) {
      throw new Error(`npm audit returned an advisory without a URL for ${packageName}.`);
    }
    advisories.set(item.url, { packageName, title: item.title, severity: item.severity });
  }
}

const unexpected = [...advisories].filter(([url]) => !exceptions.has(url));
const moderateOrHigherCount =
  severityTotals.moderate + severityTotals.high + severityTotals.critical;
if (unexpected.length > 0 || (moderateOrHigherCount > 0 && advisories.size === 0)) {
  console.error('npm audit found unapproved moderate-or-higher advisories:');
  for (const [url, advisory] of unexpected) {
    console.error(`- ${advisory.severity}: ${advisory.packageName}: ${advisory.title} (${url})`);
  }
  process.exit(1);
}

for (const [url, advisory] of advisories) {
  const exception = exceptions.get(url);
  if (!exception || today > exception.expires || advisory.severity !== exception.severity) {
    console.error(`The npm audit exception for ${url} has expired or is missing.`);
    process.exit(1);
  }
  console.warn(
    `Temporary npm audit exception through ${exception.expires}: ${advisory.title}. ${exception.reason}`,
  );
}

if (advisories.size === 0) {
  console.log('npm audit found no moderate-or-higher advisories.');
}
