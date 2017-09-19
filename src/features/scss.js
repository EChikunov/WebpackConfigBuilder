const RuleSettings = require("../ruleSettings");
const LoaderSettings = require("../loaderSettings");

module.exports = function({configSettings}, {styleLoaderOptions, cssLoaderOptions, sassLoaderOptions} = {}) {
    configSettings
        .validatePackageDependency("style-loader")
        .validatePackageDependency("css-loader")
        .validatePackageDependency("sass-loader");

    configSettings
        .addResolvableExtension("scss");

    configSettings
        .addRule(
            new RuleSettings({
                name: "scss",
                type: "style",
                test: /\.scss$/,
                loaders: [
                    new LoaderSettings({name: "style-loader", options: styleLoaderOptions}),
                    new LoaderSettings({
                        name: "css-loader",
                        options: Object.assign({
                            importLoaders: 1,
                            camelCase: true
                        }, cssLoaderOptions)
                    }),
                    new LoaderSettings({
                        name: "sass-loader",
                        options: Object.assign({
                            includePaths: [configSettings.sourceCodeDirPath]
                        }, sassLoaderOptions)
                    })
                ]
            })
        );
}