const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
        }
    ],
    webpack: {
        configure: webpackConfig => {
            webpackConfig.resolve.extensions.push('.less');
            return webpackConfig;
        }
    }
};
