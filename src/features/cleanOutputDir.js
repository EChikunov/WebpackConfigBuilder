const path = require("path");
const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, {cleanPluginOptions} = {}) {
    configSettings.validatePackageDependency("clean-webpack-plugin");

    const CleanWebpackPlugin = resolver("clean-webpack-plugin");

    configSettings
        .addPlugin(new PluginSettings({
            name: "CleanWebpackPlugin",
            ctor: CleanWebpackPlugin,
            parameters: [
                [configSettings.outputDirPath],
                Object.assign({
                    root: configSettings.projectRoot,
                    verbose: true,
                    dry: false
                }, cleanPluginOptions)
            ]
        }));
}