const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');

const config = {
    entry: path.resolve(__dirname + '/src/app.js'),
    output: {
        path: path.resolve(__dirname + '/public/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
};

module.exports = config;