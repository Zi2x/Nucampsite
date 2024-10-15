// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;
// metro.config.js
module.exports = {
    resolver: {
      blacklistRE: /node_modules\/.*\/node_modules/,
    },
  };