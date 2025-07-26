const path = require('path');

module.exports = {
  entry: {
    popup: './src/popup.tsx',
    background: './src/background.ts',
    content: './src/content.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, //admite .ts y .tsx
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  devtool: 'cheap-module-source-map'
};
