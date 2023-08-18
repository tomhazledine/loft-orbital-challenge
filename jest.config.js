const config = {
    verbose: true,
    collectCoverage: true,
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    automock: false
};

export default config;
