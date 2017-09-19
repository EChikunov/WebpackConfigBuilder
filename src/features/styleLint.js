const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, {failOnError, styleLintPluginOptions}) {
    configSettings.validatePackageDependency("stylelint-webpack-plugin");

    const StyleLintPlugin = resolver("stylelint-webpack-plugin");
    const scssRule = configSettings.getRuleByName("scss");

    configSettings
        .addPlugin(new PluginSettings({
            name: "StyleLintPlugin",
            ctor: StyleLintPlugin,
            parameters: Object.assign({
                syntax: scssRule ? "scss" : undefined,
                emitErrors: true,
                failOnError: failOnError || false
            }, styleLintPluginOptions)
        }));
}