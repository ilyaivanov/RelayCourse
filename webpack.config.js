module.exports = {
    devtool: 'eval',
    entry: './public/js/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader'}
        ]
    }
};