// const {
//     override,
//     fixBabelImports,
//     addLessLoader 
//   } = require("customize-cra");


  module.exports = function override(config, env) {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules[/\\](?!react-native-vector-icons)/,
      use: {
        loader: "babel-loader",
        options: {
          // Disable reading babel configuration
          babelrc: false,
          configFile: false,
  
          // The configuration for compilation
          presets: [
            ["@babel/preset-env"],
            "@babel/preset-react",
            "@babel/preset-flow",
            "@babel/preset-typescript"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-react-jsx"
          ]
        }
      }
    });
  
    return config;
  };
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true,
//   })
// );