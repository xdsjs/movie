var webpack=require('webpack');
var commonsPlugin=new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports={
  entry:[
    'webpack/hot/only-dev-server',
    './public/javascripts/admin.js'
    // {
    //   index:'./public/javascripts/admin.js'
    // }
  ],
  output:{
      path:'dist',
      filename:'bundle.js'
  },
  module:{
      loaders:[
          {
              test:/\.css$/,
              loader:'style-loader!css-loader'
          },
          {
              test:/\.jsx?$/,
              loader:'babel',
              exclude: /node_modules/,
              query:{
                  presets:['es2015','react']
              }
          },
          {
              test:/\.(png|jpg)$/,
              // 参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式
              loader:'url-loader?limit=8192'
          },
          {
              test:/\.less$/,
              loader:'style-loader!css-loader!less-loader'
          },
          {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "url-loader?limit=10000&mimetype=application/font-woff"
          },
          {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader"
          }
      ],
      plugins:[
          commonsPlugin
      ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  resolve:{
      root:'',
      extensions:['','.js','.json','.less'],
      alias:{
          AppStore:'js/stores/AppStores.js'
      }
  }
}
