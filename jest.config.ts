import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts', // Support des fichiers TS/JS avec Jest et Babel
  testEnvironment: 'jsdom', // Nécessaire pour simuler un DOM dans les tests
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }], // Configuration pour TypeScript
    '^.+\\.(js|jsx)$': 'babel-jest', // Configuration pour JavaScript avec Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock des fichiers CSS/SCSS
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Fichier global de configuration pour Jest
  testRegex: '\\.(test|spec)\\.(tsx|ts|js)$', // RegEx pour détecter les fichiers de tests
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensions supportées
  collectCoverage: true, // Activer la collecte de couverture de code
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Cible les fichiers TypeScript dans le dossier src
    '!src/**/*.d.ts', // Ignore les fichiers de définition de type
    '!src/**/index.ts', // Ignore les fichiers d'index si nécessaire
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Générateurs de rapport de couverture
}

export default config
