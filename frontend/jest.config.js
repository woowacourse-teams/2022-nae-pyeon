module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  collectCoverage: false,
  moduleFileExtensions: ["jsx", "tsx", "js", "json", "node", "ts", "svg"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};
