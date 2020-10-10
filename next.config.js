const withSass = require("@zeit/next-sass");
const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");

module.exports = withPlugins([
    [withSass(
        withCSS({
            webpack(config, options) {
                config.module.rules.push({
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1000000,
                            name: '[name].[ext]'
                        }
                    },

                })
                return config;
            }
        })
    )],
]);