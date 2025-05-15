const path = require('path');

module.exports = {
    mode: 'development', // development or 'production'
    entry: './ts/bootstrap.ts', // エントリーポイントを指定
    output: {
        filename: 'bundle.js', // 出力ファイル名
        path: path.resolve(__dirname, 'js'), // 出力ディレクトリ
        library: 'Roratorio', // グローバル変数名
        libraryTarget: 'var'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
            path: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map', // ソースマップ（デバッグ用）
};
