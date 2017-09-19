module.exports = function({configSettings}, {cssClassPattern} = {}) {
    const styleRules = configSettings.getRulesByType("style");
    if (styleRules.length === 0) {
        throw new Error("Style rules should be defined before CssModules feature could be applied");
    }

    for (const rule of styleRules) {
        rule.updateLoaderOptions("css-loader", () => ({
            modules: true,
            localIdentName: cssClassPattern
        }));
    }
}