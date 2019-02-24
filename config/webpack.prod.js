const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './js/main.js',
        path: path.resolve(__dirname, '../dist')
    },
    mode: "production",
    //devtool: 'inline-source-map',
    devServer: {
        contentBase: "../dist",
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '.'
                        }
                    },
                    'css-loader',
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '.'
                        }
                    },
                    'css-loader',
                    "postcss-loader",
                ]
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "./assets/images/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            //limit: 10,
                            name: "./assets/SVG/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|mov)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            //limit: 10,
                            name: "./assets/videos/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                  loader: 'html-loader',
                  options: {
                      minimize: true,
                      attrs: ['img:src', 'source:src', 'use:href']
                  }
                }
            },
            {
                test: /\.(pdf|doc|docx)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            //limit: 10,
                            name: "./assets/documents/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            //limit: 10,
                            name: "./assets/fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "./css/[name].css",
        chunkFilename: "[id].css"
        })
    ]
};