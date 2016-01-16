var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');

// webpack.config.js
module.exports = {
    entry: './main.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: "/assets/"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.scss$/, loader: 'style!css?sourcemap&-minimize!sass'}
        ]
    },
    plugins: [
        new BowerWebpackPlugin({
          excludes: /.*\.less/
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        })
    ],
    devtool: "#inline-source-map"
};
