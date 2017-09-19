const RuleSettings = require("../ruleSettings");
const LoaderSettings = require("../loaderSettings");

module.exports = function({configSettings}, {failOnError, tslintLoaderOptions} = {}) {
    configSettings
        .validatePackageDependency("tslint")
        .validatePackageDependency("tslint-loader")
        .validatePackageDependency("tslint-eslint-rules")
        .validatePackageDependency("tslint-react")
        .validateRule("typescript");

    configSettings
        .addRule(
            new RuleSettings({
                name: "tslint",
                enforce: "pre",
                test: /\.tsx?$/,
                loaders: [
                    new LoaderSettings({
                        name: "tslint-loader",
                        options: Object.assign({failOnHint: failOnError, emitErrors: true}, tslintLoaderOptions)
                    })
                ]
            })
        );
}