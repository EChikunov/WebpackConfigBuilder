module.exports = function({configSettings}, {stats = {assets: true, colors: true, timings: true}} = {}) {
    const devServerSection = configSettings.getCustomSection("devServer");

    const statOptions = Object.assign({
        assets: false,
        colors: false,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        children: false
    }, stats);

    if (devServerSection) {
        devServerSection.stats = statOptions;
    } else {
        configSettings.addCustomSection({ stats: statOptions });
    }
}