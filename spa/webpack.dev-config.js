var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        Register: ['babel-polyfill', './src/modules/Register'],
        Participant: ['babel-polyfill', './src/modules/Participant'],
        Contact: ['babel-polyfill', './src/modules/Contact'],
    },
    output: {
        path: __dirname + '/../web/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['babel-preset-react-app'],
                }
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 importLoaders: 1,
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 // Necessary for external CSS imports to work
            //                 // https://github.com/facebookincubator/create-react-app/issues/2677
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //     ],
            // },
            // {
            //     test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            //     loader: 'url-loader'
            // }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    devtool: 'source-map'
};