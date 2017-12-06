const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "videoTrimModal": "./src/js/videoTrimModal.js",
        "videoTrimModal.min": "./src/js/videoTrimModal.js"
    },
    output: {
        path: path.resolve(__dirname, './distribution'),
        filename: "[name].js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};