module.exports = {
    entry: './index.ts',
    output: {
        filename: '[name].js',
        path: __dirname
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            options: {
                transpileOnly: true
            }
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};