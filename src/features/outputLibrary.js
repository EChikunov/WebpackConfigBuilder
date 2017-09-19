module.exports = function({configSettings}, {name = "library", target = "umd"} = {}) {
    configSettings
        .changeOutput(Object.assign(configSettings.output, {
            filename: `${name}.js`,
            library: name,
            libraryTarget: target
        }));
}