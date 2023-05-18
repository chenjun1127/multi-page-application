const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');

const setSPA = () => {
  const globPath = glob.sync(path.join(__dirname, 'src/entry/*.js'));
  const entries = {};
  const plugins = [];
  globPath.forEach(entry => {
    const entryName = path.basename(entry, '.js');
    entries[entryName] = entry;
    plugins.push(
      new HtmlWebpackPlugin({
        title: entryName,
        filename: `${entryName}.html`,
        template: path.resolve(__dirname, 'src/index.html'),
        chunks: [entryName]
      })
    );
  });
  return { entries, plugins };
};
const { entries, plugins } = setSPA();
module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    clean: true //每次构建之前，先清除，不需要用CleanWebpackPlugin；
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true
  },
  module:{
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },  
  plugins: [
    ...[
      {
        apply: compiler => {
          // 在Webpack构建完成后触发done事件
          compiler.hooks.done.tap('FileCountPlugin', () => {
            // 查找文件
            const files = glob.sync(path.join(__dirname, 'src/entry/*.js'));
            console.log(`Found ${files.length} entry files.`);
          });
        }
      }
    ],
    ...plugins
    // new webpack.HotModuleReplacementPlugin(),// 上面hot已经开启，这里就不用再配置了
  ]
};
