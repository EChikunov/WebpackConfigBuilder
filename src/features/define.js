const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, definitions) {
    const DefinePlugin = resolver("webpack/lib/DefinePlugin");

    configSettings
        .addPlugin(new PluginSettings({
            name: "DefinePlugin",
            ctor: DefinePlugin,
            parameters: definitions,
        }));
}