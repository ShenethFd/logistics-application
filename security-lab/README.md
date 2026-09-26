# ESLint security lab

This directory contains deliberately insecure, non-executed examples for validating static-analysis tooling. Nothing in `src/` imports these files.

Run:

```bash
npm run security:lint
```

A successful detector run exits nonzero and reports issues including command injection, non-literal file access, `eval`, unsafe regular expressions, object injection, timing-sensitive comparison, loose equality, console output, and an unused variable.

Do not copy these examples into application code or include this directory in a production artifact.
