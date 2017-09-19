const fs = require("fs");
const path = require("path");
const ConfigSettings = require("./configSettings");

class ConfigBuilder {
    constructor({outputDir, sourceCodeDir, entry} = {}) {
        const root = process.cwd();
        const outputDirPath = path.resolve(root, outputDir || "dist");
        const sourceCodeDirPath = path.resolve(root, sourceCodeDir || "src");
        const projectPackage = require(path.join(root, 'package.json'));

        const entryPoint = entry || "index.js";
        const output = {
            path: outputDirPath,
            filename: "[name].js"
        };

        this._configSettings = new ConfigSettings({
            projectRoot: root,
            outputDirPath: outputDirPath,
            sourceCodeDirPath: sourceCodeDirPath,
            projectPackage: projectPackage,
            entry: entryPoint,
            output: output
        });

        this._configSettings.addResolvableModulePath(sourceCodeDirPath);
        this._configSettings.addResolvableModulePath("node_modules");

        this._loadFeatures(path.join(__dirname, "features"));
    }

    toWebpackConfig() {
        const config = Object.assign({
            entry: this._configSettings.entry,
            output: this._configSettings.output,
            resolve: {
                extensions: this._configSettings.resolvableExtensions,
                modules: this._configSettings.resolvableModulePaths
            },
            context: this._configSettings.sourceCodeDirPath,
            module: {
                rules: this._getRules()
            },
            plugins: this._getPlugins(),
            stats: false
        }, this._configSettings.customSections);

        for (const transform of this._configSettings.postGenerationTransformations) {
            transform(config);
        }

        return config;
    }

    _getPlugins() {
        return this._configSettings.pluginSettings
            .map(pluginSettings => {
                if (Array.isArray(pluginSettings.parameters)) {
                    return new (Function.prototype.bind.apply(
                        pluginSettings.ctor,
                        [null].concat(pluginSettings.parameters)));
                }

                return new pluginSettings.ctor(pluginSettings.parameters);
            });
    }

    _getRules() {
        return this._configSettings.ruleSettings
            .map(ruleSettings => ({
                enforce: ruleSettings.enforce,
                test: ruleSettings.test,
                include: ruleSettings.include,
                exclude: ruleSettings.exclude,
                use: this._getLoaders(ruleSettings.loaders)
            }));
    }

    _getLoaders(loaderSettings) {
        return loaderSettings.map(loaderSettings => ({
            loader: loaderSettings.name,
            options: loaderSettings.options
        }));
    }

    _loadFeatures(featuresDir) {
        const filenames = fs.readdirSync(featuresDir);

        filenames.forEach((fileName) => {
            const pathToFile = path.join(featuresDir, fileName);
            const feature = require(pathToFile);

            const methodName = fileName.replace(".js", "");

            this[methodName] = (...args) => {
                feature({configSettings: this._configSettings, resolver: this._resolver}, ...args);

                return this;
            };
        });
    }

    _resolver(packageName) {
        return require(path.join(process.cwd(), "node_modules", packageName));
    }
}

module.exports = ConfigBuilder;