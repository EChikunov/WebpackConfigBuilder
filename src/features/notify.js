const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, {title, notifierPluginOptions} = {}) {
    configSettings.validatePackageDependency("webpack-notifier");

    const NotifierPlugin = resolver("webpack-notifier");

    configSettings
        .addPlugin(new PluginSettings({
            name: "NotifierPlugin",
            ctor: NotifierPlugin,
            parameters: Object.assign({title}, notifierPluginOptions)
        }));
}