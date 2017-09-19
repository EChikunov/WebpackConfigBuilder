const path = require("path");
const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, {template, minify, htmlWebpackPluginOptions} = {}) {
    configSettings
        .validatePackageDependency("html-webpack-plugin");

    const HtmlWebpackPlugin = resolver("html-webpack-plugin");

    configSettings
        .addPlugin(new PluginSettings({
            name: "HtmlWebpackPlugin",
            ctor: HtmlWebpackPlugin,
            parameters: Object.assign({
                template: path.resolve(configSettings.sourceCodeDirPath, template),
                hash: true,
                minify: minify || false,
                showErrors: true,
                inject: false
            }, htmlWebpackPluginOptions)
        }));
}