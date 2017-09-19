module.exports = function({configSettings}, {host, port, devServer} = {}) {
    configSettings.validatePackageDependency("webpack-dev-server");

    configSettings.addCustomSection({
        devServer: Object.assign({
            port: port,
            host: host,
            contentBase: configSettings.outputDirPath,
            historyApiFallback: true
        }, devServer)
    });
}