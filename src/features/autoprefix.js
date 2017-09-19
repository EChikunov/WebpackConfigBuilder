const LoaderSettings = require("../loaderSettings");

module.exports = function({configSettings, resolver}, {supportedBrowsers, postcssLoaderOptions} = {}) {
    configSettings
        .validatePackageDependency("autoprefixer")
        .validatePackageDependency("postcss-loader");

    const styleRules = configSettings.getRulesByType("style");
    if (styleRules.length === 0) {
        throw new Error("Style rules should be defined before Autoprefix feature could be applied");
    }

    const AutoPrefixer = resolver("autoprefixer");

    for (const rule of styleRules) {
        rule.addLoader({
            loaderSettings: new LoaderSettings({
                name: "postcss-loader",
                options: Object.assign({
                    plugins: () => ([AutoPrefixer({ browsers: supportedBrowsers })])
                }, postcssLoaderOptions)
            }),
            afterLoader: "css-loader"
        });

        rule.updateLoaderOptions("css-loader", (options) => {
            importLoaders: options.importLoaders + 1
        });
    }
}