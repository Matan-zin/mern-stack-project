module.exports = async () => {
    return {
        rootDir: './',
        collectCoverage: true,
        coveragePathIgnorePatterns: [
            "/App.js",
            "/index.js",
            "/assets/",
            "/context/",
            "/helpers/",
            "/services/",
            "/constants/"
          ],
        moduleNameMapper: {
            '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$': '<rootDir>/mocks/media.js',
            "\\.(css)$": "identity-obj-proxy"
        },
        coverageThreshold: {
            "global": {
                "branches": 90,
                "functions": 90,
                "lines": 90,
                "statements": 90
            }
        },
        coverageReporters: [
            "html",
            "text" 
        ]
    }
}