const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, {filename = "styles", extractTextPluginOptions} = {}) {
    configSettings.validatePackageDependency("extract-text-webpack-plugin");

    const ExtractTextPlugin = resolver("extract-text-webpack-plugin");

    configSettings.addPostGenerationTransformation(config => {
        const styleRules = config.module.rules
            .filter(rule => rule.use.some(item => item.loader === "style-loader"));

        for (const rule of styleRules) {
            rule.use = ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: rule.use.filter(item => item.loader !== "style-loader")
            })
        }

        return config;
    });

    configSettings
        .addPlugin(new PluginSettings({
            name: "ExtractTextPlugin",
            ctor: ExtractTextPlugin,
            parameters: Object.assign({
                filename: `${filename}.css`
            }, extractTextPluginOptions)
        }));
}