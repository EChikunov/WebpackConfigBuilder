const PluginSettings = require("../pluginSettings");

module.exports = function({configSettings, resolver}, {uglifyJsPluginOptions} = {}) {
    const UglifyJsPlugin = resolver("webpack/lib/optimize/UglifyJsPlugin");

    configSettings
        .addPlugin(new PluginSettings({
            name: "UglifyJsPlugin",
            ctor: UglifyJsPlugin,
            parameters: Object.assign({
                beautify: false,
                mangle: {
                    except: ['webpackJsonp'],
                    screw_ie8: true
                },
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false
                }
            })
        }));
}