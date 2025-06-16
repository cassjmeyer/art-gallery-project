module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
};
