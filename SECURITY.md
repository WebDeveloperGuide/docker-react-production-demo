# Security Policy

## Supported versions

Security fixes are applied to the current `main` branch. Older demo releases are
not maintained.

## Reporting a vulnerability

Please do not report an exploitable vulnerability in a public issue. If private
vulnerability reporting is enabled for this repository, use GitHub's
**Report a vulnerability** option on the Security tab. Otherwise, contact the
repository owner through the public GitHub profile to arrange a private
disclosure channel; do not include exploit details in that public message.

Include the affected component and version, impact, and steps to reproduce in
your private report. Do not send credentials, real user data, or unrelated
private information.

## Remediation

- CI fails `npm audit` at the moderate severity threshold for production
  dependencies and checks the full dependency tree. The full-tree check
  temporarily allows only GHSA-fc5q-39xc-vjpf, a high-severity advisory in
  Picomatch used by development build/test tooling. No patched Picomatch
  release is available. The exception expires on 2027-02-16; remove it sooner
  when a patched release is available. All other moderate-or-higher findings
  fail CI.
- The image publishing workflow fails for high or critical Trivy findings,
  including findings without an available fix. Review the affected image
  package, update the pinned base image or dependency, rebuild, and rescan.
- Do not suppress a finding only to make a workflow pass. If a finding is
  confirmed to be a false positive or not applicable, document the evidence
  and risk in a reviewed change before adding a narrow, time-bounded exception.
- CodeQL and Gitleaks results must be investigated. Rotate any exposed secret
  immediately; removing it from the latest source does not revoke it or remove
  it from Git history.

Scans are automated checks, not proof that the application is completely
secure. Review changes and alerts, and verify remediation in a fresh scan.
