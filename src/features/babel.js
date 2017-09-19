const RuleSettings = require("../ruleSettings");
const LoaderSettings = require("../loaderSettings");

module.exports = function({configSettings}, {presets = [], plugins = [], babelLoaderOptions} = {}) {
    configSettings
        .validatePackageDependency("babel-loader");

    for (const preset of presets) {
        const presetName = Array.isArray(preset) ? preset[0] : preset;
        configSettings.validatePackageDependency(presetName);
    }

    for (const plugin of plugins) {
        const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;
        configSettings.validatePackageDependency(pluginName);
    }

    const scriptRules = configSettings.getRulesByType("script");
    if (scriptRules.length === 0) {
        throw new Error("Script rules should be defined before Babel feature could be applied");
    }

    for (const scriptRule of scriptRules) {
        scriptRule.addLoader({
            loaderSettings: new LoaderSettings({
                name: "babel-loader",
                options: Object.assign({
                    presets: presets,
                    plugins: plugins
                }, babelLoaderOptions)
            }),
            beforeLoader: scriptRule.loaders.length > 0 ?
                scriptRule.loaders[0].name :
                undefined
        });
    }
}