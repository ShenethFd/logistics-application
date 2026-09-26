/**
 * INTENTIONALLY INSECURE STATIC-ANALYSIS FIXTURE.
 * This file is never imported by the application and must never ship to production.
 */
import fs from 'node:fs'
import { exec } from 'node:child_process'

// Command injection: untrusted input is concatenated into a shell command.
export function insecureDiagnostic(host) {
  exec('ping -c 1 ' + host)
}

// Path traversal: a caller-controlled path is read directly.
export function insecureFilePreview(fileName) {
  return fs.readFileSync('/tmp/uploads/' + fileName, 'utf8')
}

// Code injection: arbitrary text is evaluated as JavaScript.
export function insecureFormula(formula) {
  return eval(formula)
}

// ReDoS: nested quantifiers can cause catastrophic backtracking.
export function insecureTrackingCode(value) {
  return /^(a+)+$/.test(value)
}

// Prototype/object injection through a dynamic property key.
export function insecurePreference(settings, key) {
  return settings[key]
}

// Timing attack: secret values are compared with an early-exit operator.
export function insecureTokenCheck(providedToken, storedToken) {
  return providedToken === storedToken
}

// General quality issues intentionally detectable by core ESLint rules.
export function unreliableStatus(status) {
  const unusedMessage = 'This variable is never used'
  if (status == 'shipped') {
    console.log('Shipment complete')
  }
}
