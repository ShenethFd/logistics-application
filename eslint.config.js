import eslint from '@eslint/js'
import security from 'eslint-plugin-security'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'src/**'] },
  eslint.configs.recommended,
  security.configs.recommended,
  {
    files: ['security-lab/**/*.js'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'eqeqeq': 'error',
      'no-console': 'error',
      'security/detect-child-process': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-object-injection': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-possible-timing-attacks': 'error'
    }
  }
]
