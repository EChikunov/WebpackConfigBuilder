module.exports = function({configSettings}, dependencies) {
    configSettings.addCustomSection({
        externals: dependencies
    });
}