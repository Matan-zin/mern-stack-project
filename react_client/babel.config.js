module.exports = function (api) {
    const presets = [
      '@babel/preset-env',
      ['@babel/preset-react', {"runtime": "automatic"}],
      '@babel/preset-flow'
    ];
    const plugins = [
      '@babel/plugin-transform-runtime',
    ];
  
    api.cache(false);
  
    return {
      presets,
      plugins
    };
  };