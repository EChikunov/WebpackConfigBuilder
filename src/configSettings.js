class ConfigSettings {
    constructor({projectRoot, outputDirPath, sourceCodeDirPath, entry, output, projectPackage}) {
        this._projectRoot = projectRoot;
        this._outputDirPath = outputDirPath;
        this._sourceCodeDirPath = sourceCodeDirPath;
        this._resolvableExtensions = [];
        this._resolvableModulePaths = [];
        this._pluginSettings = [];
        this._ruleSettings = [];
        this._customSections = {};
        this._entry = entry;
        this._output = output;
        this._projectPackage = projectPackage;
        this._postGenerationTransformations = [];
    }

    get projectRoot() {
        return this._projectRoot;
    }

    get outputDirPath() {
        return this._outputDirPath;
    }

    get sourceCodeDirPath() {
        return this._sourceCodeDirPath;
    }

    get resolvableExtensions() {
        return this._resolvableExtensions;
    }

    get resolvableModulePaths() {
        return this._resolvableModulePaths;
    }

    get pluginSettings() {
        return this._pluginSettings;
    }

    get ruleSettings() {
        return this._ruleSettings;
    }

    get customSections() {
        return this._customSections;
    }

    get entry() {
        return this._entry;
    }

    get output() {
        return this._output;
    }

    get projectPackage() {
        return this._projectPackage;
    }

    get postGenerationTransformations() {
        return this._postGenerationTransformations;
    }

    /**
     * Change entry of the application
     *
     * @param {string|array|object} newEntry
     */
    changeEntry(newEntry) {
        this._entry = newEntry;
    }

    /**
     * Change output of the application
     *
     * @param {object} newOutput
     */
    changeOutput(newOutput) {
        this._output = newOutput;
    }

    /**
     * Add file extension that could be resolved by webpack
     *
     * @param {string} extension
     * @returns {ConfigSettings}
     */
    addResolvableExtension(extension) {
        if (this._resolvableExtensions.includes(extension)) {
            return;
        }

        if (extension.startsWith(".")) {
            this._resolvableExtensions.push(extension);
        } else {
            this._resolvableExtensions.push(`.${extension}`);
        }

        return this;
    }

    /**
     * Add path to modules that could be resolved by webpack
     *
     * @param {string} modulePath
     * @returns {ConfigSettings}
     */
    addResolvableModulePath(modulePath) {
        if (this._resolvableModulePaths.includes(modulePath)) {
            return;
        }

        this._resolvableModulePaths.push(modulePath);

        return this;
    }

    /**
     * Add plugin settings to the configuration
     *
     * @param {PluginSettings} pluginOption
     * @returns {ConfigSettings}
     */
    addPlugin(pluginSettings) {
        if (this._pluginSettings.find(setting => setting.name === pluginSettings.name)) {
            throw new Error(`Plugin settings "${pluginSettings.name}" are already added!`);
        }

        this._pluginSettings.push(pluginSettings);

        return this;
    }

    /**
     * Add rule settings to the configuration
     *
     * @param {RuleSettings} ruleSettings
     * @returns {ConfigSettings}
     */
    addRule(ruleSettings) {
        if (this._ruleSettings.find(settings => settings.name === ruleSettings.name)) {
            throw new Error(`Rule settings "${ruleSettings.name}" are already added!`);
        }

        this._ruleSettings.push(ruleSettings);

        return this;
    }

    /**
     * Add custom config section
     *
     * @param {object} section
     * @returns {ConfigSettings}
     *
     */
    addCustomSection(section) {
        Object.assign(this._customSections, section);

        return this;
    }

    addPostGenerationTransformation(transformation) {
        this._postGenerationTransformations.push(transformation);
    }

    /**
     * Retrieve custom section by name
     * Return undefined if section not found
     *
     * @param {string} sectionName
     * returns {object}
     */
    getCustomSection(sectionName) {
        return this._customSections[sectionName];
    }

    /**
     * Retrieve rule by name.
     * Returns undefined if no rule found
     *
     * @param {string} ruleName
     */
    getRuleByName(ruleName) {
        return this._ruleSettings.find(rule => rule.name === ruleName);
    }

    /**
     * Retrieve array of rules by type ("script", "style")
     * Returns empty array if no rules found
     *
     * @param {string} ruleType
     */
    getRulesByType(ruleType) {
        return this._ruleSettings.filter(rule => rule.type === ruleType);
    }

    /**
     * Validate that dependency is present in package.json
     *
     * @param {string} dependencyName
     * @returns {ConfigSettings}
     */
    validatePackageDependency(dependencyName) {
        if (!Object.keys(this._projectPackage.devDependencies).includes(dependencyName)) {
            throw new Error(`package.json does not contain dev dependency "${dependencyName}"`);
        }

        return this;
    }

    /**
     * Validate config has given rule
     *
     * @param {string} ruleName
     * @returns {ConfigSettings}
     */
    validateRule(ruleName) {
        if (!this._ruleSettings.find(rule => rule.name === ruleName)) {
            throw new Error(`Rule ${ruleName} should be defined!`);
        }

        return this;
    }

    /**
     * Checks if configuration has custom section with provided name
     *
     * @param {string} sectionName
     */
    validateCustomSection(sectionName) {
        if (!this._customSections.hasOwnProperty(sectionName)) {
            throw new Error(`Custom section ${sectionName} should be defined!`);
        }
    }
}

module.exports = ConfigSettings;