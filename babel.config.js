module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    'transform-decorators-legacy',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
  ],
};
