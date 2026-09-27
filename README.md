# logistics-application

Test fixtures for exercising linting tools.

The `scripts/` directory contains small Node.js scripts that each contain a
handful of intentional linting issues (unused variables, `var` usage, loose
equality, fallthrough switch cases, assignment-in-condition, duplicate object
keys, unreachable code, leftover `debugger` statements, etc.) for use as
inputs to lint-checking tooling.

Run `npm run lint` (after `npm install`) to see ESLint flag the issues.
