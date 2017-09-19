class RuleSettings {
    constructor({name, type, test, include, exclude, loaders, enforce}) {
        this._name = name;
        this._type = type;
        this._test = test;
        this._include = include;
        this._enforce = enforce;
        this._exclude = ["node_modules"].concat(exclude || []);
        this._loaders = loaders || [];
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get test() {
        return this._test;
    }

    get include() {
        return this._include;
    }

    get exclude() {
        return this._exclude;
    }

    get enforce() {
        return this._enforce;
    }

    get loaders() {
        return this._loaders;
    }

    addLoader({loaderSettings, afterLoader, beforeLoader}) {
        if (!loaderSettings) {
            throw new Error("Loader settings should be set!");
        }

        if (afterLoader && beforeLoader) {
            throw new Error("AfterLoader and BeforeLoader should not be set at the same time");
        }

        let insertionIndex = this._loaders.length;
        if (afterLoader) {
            const referencedLoaderIndex = this._loaders.findIndex(loader => loader.name === afterLoader);
            insertionIndex = referencedLoaderIndex + 1;
        } else if (beforeLoader) {
            const referencedLoaderIndex = this._loaders.findIndex(loader => loader.name === beforeLoader);
            insertionIndex = referencedLoaderIndex - 1;
            if (insertionIndex < 0) {
                insertionIndex = 0;
            }
        }
        this._loaders.splice(insertionIndex, 0, loaderSettings);

        return this;
    }

    updateLoaderOptions(loaderName, updater) {
        const loader = this._loaders.find(loader => loader.name === loaderName);
        if (!loader) {
            throw new Error(`Unknown loader name: ${loaderName}!`);
        }

        const newOptions = updater(loader);

        loader.updateOptions(newOptions);
    }

    changeLoaders(newLoaders) {
        this._loaders = newLoaders;
    }

    getLoaderByName(loaderName) {
        return this._loaders.find(loader => loader.name === loaderName);
    }
}

module.exports = RuleSettings;