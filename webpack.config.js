const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: "dist",
        open: true
    },
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader?url=false',
                    'sass-loader',
                ],
            },
            { 
                test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img/',
                    name: '[name].[ext]',
                    publicPath: '/'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
