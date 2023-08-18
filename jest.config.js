const config = {
    verbose: true,
    collectCoverage: true,
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    testEnvironment: "jsdom",
    automock: false
};

export default config;
