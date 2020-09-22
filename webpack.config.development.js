const FavIconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpackDevServerPort = 3000;

const config = {
    entry: [
        `webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
        "webpack/hot/only-dev-server",
        "./src/index.ts"
    ],
    output: {
        path: path.resolve("dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "babel-loader"},
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    {loader: "css-loader", options: {importLoaders: 1}},
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new FavIconsWebpackPlugin({
            logo: "./src/assets/yetric-icon.png"
        })
    ],
    devServer: {
        port: webpackDevServerPort,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true
    }
};

module.exports = config;
