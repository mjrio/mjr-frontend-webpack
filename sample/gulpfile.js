"use strict";

var path = require("path");
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');

function buildJs (options, callback) {
    var plugins = options.minify ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },

            output: {
                comments: false,
                semicolons: true,
            },
        }),
        new BowerWebpackPlugin({
          excludes: /.*\.less/
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        })
    ] : [];

    webpack({
        entry: path.join(__dirname, "main.js"),
        bail: !options.watch,
        watch: options.watch,
        devtool: "source-map",
        plugins: plugins,
        output: {
            path: path.join(__dirname, "dist"),
            filename: "index.js",
        },
        module: {
            loaders: [
                { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
                { test: /\.scss$/, loader: 'style!css?sourcemap&-minimize!sass'}
            ]
        },
    }, function (error, stats) {
        if ( error ) {
            var pluginError = new gutil.PluginError("webpack", error);

            if ( callback ) {
                callback(pluginError);
            } else {
                gutil.log("[webpack]", pluginError);
            }

            return;
        }

        gutil.log("[webpack]", stats.toString());
        if (callback) { callback(); }
    });
}

gulp.task("js:es6", function (callback) {
    buildJs({ watch: false, minify: false }, callback);
});

gulp.task("js:es6:minify", function (callback) {
    buildJs({ watch: false, minify: true }, callback);
});

gulp.task("watch", function () {
    buildJs({ watch: true, minify: false });
});
