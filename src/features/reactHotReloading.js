const LoaderSettings = require("../loaderSettings");
const PluginSettings = require("../pluginSettings");

function addHotEntry(entry, devServerSettings) {
    const additionalEntries = [
        "react-hot-loader/patch",
        `webpack-dev-server/client?http://${devServerSettings.host}:${devServerSettings.port}`,
        "webpack/hot/only-dev-server"
    ];

    if (typeof entry === "string") {
        return additionalEntries.concat([entry]);
    }

    if (typeof entry === "array") {
        return additionalEntries.concat(entry);
    }

    throw new Error("Unknown entry type! Expected string or array");
}

function addHotLoaderToRule(rule) {
    const babelLoader = rule.getLoaderByName("babel-loader");
    if (babelLoader) {
        babelLoader.updateOptions({
            plugins: babelLoader.options.plugins.concat(["react-hot-loader/babel"])
        });
    } else {
        rule.addLoader({
            loaderSettings: new LoaderSettings({name: "react-hot-loader/webpack"}),
            beforeLoader: rule.loaders.length > 0 ? rule.loaders[0].name : undefined
        });
    }
}

function changeEntryPoints(configSettings, entryPointName, devServerSettings) {
    if (typeof configSettings.entry === "object") {
        if (!configSettings.entry.hasOwnProperty(entryPointName)) {
            throw new Error(`Application entry object should contain entry point name: "${entryPointName}"`);
        }

        configSettings.changeEntry(
            Object.assign(configSettings.entry, {
                [entryPointName]: addHotEntry(configSettings.entry[entryPointName], devServerSettings)
            }));
    } else {
        configSettings.changeEntry(addHotEntry(configSettings.entry, devServerSettings));
    }
}

function addHotPlugin(configSettings, resolver) {
    const HotModuleReplacementPlugin = resolver("webpack/lib/HotModuleReplacementPlugin");

    configSettings
        .addPlugin(new PluginSettings({
            name: "HotModuleReplacementPlugin",
            ctor: HotModuleReplacementPlugin
        }));
}

function addNamedModulesPlugin(configSettings, resolver) {
    const NamedModulesPlugin = resolver('webpack/lib/NamedModulesPlugin');

    configSettings
        .addPlugin(new PluginSettings({
            name: "NamedModulesPlugin",
            ctor: NamedModulesPlugin
        }));
}

function changeDevServerSettings(devServerSettings) {
    devServerSettings.hot = true;
}

module.exports = function({configSettings, resolver}, {entryPointName = "app"} = {}) {
    configSettings.validatePackageDependency("react-hot-loader");
    configSettings.validateCustomSection("devServer");

    const scriptRules = configSettings.getRulesByType("script");
    if (scriptRules.length === 0) {
        throw new Error("Script rules should be defined before React Hot Reloading feature could be applied");
    }

    for (const rule of scriptRules) {
        addHotLoaderToRule(rule);
    }

    const devServerSettings = configSettings.getCustomSection("devServer");

    changeEntryPoints(configSettings, entryPointName, devServerSettings);
    changeDevServerSettings(devServerSettings);
    addHotPlugin(configSettings, resolver);
    addNamedModulesPlugin(configSettings, resolver);
}