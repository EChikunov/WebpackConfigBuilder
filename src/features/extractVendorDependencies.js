const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}) {
    const CommonsChunkPlugin = resolver("webpack/lib/optimize/CommonsChunkPlugin");

    configSettings.changeEntry({
        app: configSettings.entry,
        vendor: Object.keys(configSettings.projectPackage.dependencies)
    });

    configSettings
        .addPlugin(new PluginSettings({
            name: "CommonsChunkPlugin",
            ctor: CommonsChunkPlugin,
            parameters: {
                name: "vendor",
                minChunks: Infinity
            }
        }));
}