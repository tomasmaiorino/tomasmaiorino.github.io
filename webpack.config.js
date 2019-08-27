const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: ['./assets/scss/devresume.scss'],
    output: {
      path: path.resolve(__dirname, 'assets'),
    },
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
			}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};
