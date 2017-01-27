var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015'] // 'babel-loader' is also a legal name to reference
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        //Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false,
            },
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
