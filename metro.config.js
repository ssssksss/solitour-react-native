const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    // assetExts에서 'svg'를 제외하지만, 다른 확장자는 유지
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    // sourceExts에 'svg' 추가
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
  transformer: {
    // SVG 파일 처리를 위한 설정
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
};

// NativeWind 및 기본 설정 병합
module.exports = mergeConfig(
  defaultConfig,
  withNativeWind(customConfig, {input: './global.css'}),
);
