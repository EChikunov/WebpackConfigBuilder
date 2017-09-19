const PluginSettings = require("../pluginSettings");
const RuleSettings = require("../ruleSettings");
const LoaderSettings = require("../loaderSettings");

module.exports = function({configSettings, resolver}, {
    awesomeTypescriptLoaderOptions,
    checkerPluginOptions,
    tsconfigPathsPluginOptions
} = {}) {
    configSettings
        .validatePackageDependency("awesome-typescript-loader")
        .validatePackageDependency("typescript");

    configSettings
        .addResolvableExtension("js")
        .addResolvableExtension("ts")
        .addResolvableExtension("tsx");

    const {CheckerPlugin, TsConfigPathsPlugin} = resolver('awesome-typescript-loader');

    configSettings
        .addRule(new RuleSettings({
            name: "typescript",
            type: "script",
            test: /.tsx?$/,
            loaders: [
                new LoaderSettings({
                    name: "awesome-typescript-loader",
                    options: Object.assign({
                        // Remove as soon as @types/lodash will fix their declaration
                        // see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/14662
                        // and https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14324
                        ignoreDiagnostics: [2428]
                    }, awesomeTypescriptLoaderOptions)
                })
            ]
        }));

    configSettings
        .addPlugin(new PluginSettings({
            name: "CheckerPlugin",
            ctor: CheckerPlugin,
            parameters: checkerPluginOptions
        }))
        .addPlugin(new PluginSettings({
            name: "TsConfigPathsPlugin",
            ctor: TsConfigPathsPlugin,
            parameters: tsconfigPathsPluginOptions
        }));
}