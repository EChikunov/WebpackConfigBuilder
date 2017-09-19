module.exports = function({configSettings}, {cssLoaderOptions} = {}) {
    const styleRules = configSettings.getRulesByType("style");
    if (styleRules.length === 0) {
        throw new Error("Style rules should be defined before MinifyStyles feature could be applied");
    }

    for (const rule of styleRules) {
        rule.updateLoaderOptions("css-loader", () => (Object.assign({
            minimize: true
        }, cssLoaderOptions)));
    }
}