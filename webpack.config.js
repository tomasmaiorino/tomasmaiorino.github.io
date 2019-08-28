const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: ['./assets/scss/devresume.scss'],
    output: {
      path: path.resolve(__dirname, 'assets'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    module: {
    rules: [
			{
				test: /\.scss$/,
				use: [
          process.env.NODE_ENV !== 'production'
            ?
            {
              loader: 'file-loader',
              options: {
                name: 'css/[name].css',
              }
            }
            : MiniCssExtractPlugin.loader
          /*
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].blocks.css',
						}
          },
          */
					,{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ]
      }
    ]
  }
};
