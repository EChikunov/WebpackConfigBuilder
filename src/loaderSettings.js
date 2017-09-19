class LoaderSettings {
    constructor({name, options}) {
        this._name = name;
        this._options = options;
    }

    get name() {
        return this._name;
    }

    get options() {
        return this._options;
    }

    updateOptions(newOptions) {
        Object.assign(this._options, newOptions);
    }
}

module.exports = LoaderSettings;