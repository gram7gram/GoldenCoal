module.exports = {
    entry: {
        RegisterGoldenCoal: ['babel-polyfill', './src/GoldenCoal/modules/Register'],
        RegisterWhiteCoal: ['babel-polyfill', './src/WhiteCoal'],
        Participant: ['babel-polyfill', './src/GoldenCoal/modules/Participant'],
        PharmacyParticipant: ['babel-polyfill', './src/GoldenCoal/modules/Pharmacy'],
        Contact: ['babel-polyfill', './src/GoldenCoal/modules/Contact'],
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
        ]
    },
    plugins: [],
    devtool: 'source-map'
};