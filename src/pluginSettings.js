/**
 * Settings required to configure plugin
 */
class PluginSettings {
    constructor({name, ctor, parameters}) {
        this._name = name;
        this._ctor = ctor;
        this._parameters = parameters;
    }

    get name() {
        return this._name;
    }

    get ctor() {
        return this._ctor;
    }

    get parameters() {
        return this._parameters;
    }
}

module.exports = PluginSettings;