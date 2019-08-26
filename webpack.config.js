const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

/*
module.exports = {
  entry: ['./assets/scss/devresume.scss'],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'sass-loader'
          }
          // // Compiles Sass to CSS
          // 'sass-loader'
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'css/[name].blocks.css',
          //   }
          // }
        ],
      },
    ],
  },
};
*/

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const path = require('path');

// module.exports = {
//   mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
//   entry: ['./assets/scss/devresume.scss'],
//   output: {
//     path: path.resolve(__dirname, 'assets'),
//     filename: 'js/editor.blocks.js',
//   },
//   module: {
//     rules: [
// //      {
//       //   test: /\.s[ac]ss$/i,
//       //   use: [
//       //     // Creates `style` nodes from JS strings
//       //     'style-loader',
//       //     // Translates CSS into CommonJS
//       //     'css-loader',
//       //     // Compiles Sass to CSS
//       //     'sass-loader',
//       //     {
//       //       loader: 'file-loader',
//       //       options: {
//       //         name: 'css/[name].blocks.css',
//       //       }
//       //     }
//       //   ],
//       // },
//       {
//         test: /\.scss$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: 'file-loader',
//               options: {
//                 name: 'css/[name].blocks.css',
//               }
//             },
//             {
//               loader: 'extract-loader'
//             },
//             {
//               loader: 'css-loader?-url',
//               options: {
//                  minimize: true
//               }
//             },
//             {
//               loader: 'postcss-loader'
//             },
//           {
//             loader: 'sass-loader',
//             options: { minimize: true }
//           }]
//         }),
//       // 	// use: [
//       // 	// ,
//       // 	// 	{
//       //   //     loader: 'sass-loader',
//       //   //     options: {
//       //   //       minimize: true
//       //   //     }
//       // 	// 	}
//       // 	// ]
//       }
//     ]
//   }
// };
