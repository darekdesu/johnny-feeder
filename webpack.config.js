const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
const pathToSocket = path.resolve(node_modules, 'react/dist/react.min.js');

const config = {
    entry: path.resolve(__dirname + '/src/main.js'),
    output: {
        path: path.resolve(__dirname + '/public/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            exclude: /node_modules/,
            loader: 'babel' // The module to load. "babel" is short for "babel-loader"
        }]
    }
};

module.exports = config;