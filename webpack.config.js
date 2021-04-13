const path = require(`path`);
const {CleanWebpackPlugin} =require(`clean-webpack-plugin`);
const MiniCSSExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
    mode: `development`,
    entry:{
        main: `./js/script.js`
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `./dist`)
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: `[name].css`
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {}
                    },
                    `css-loader`
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:[`file-loader`]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {}
                    },
                    `css-loader`,
                    `sass-loader`
                ]
            }
        ]
    }
}