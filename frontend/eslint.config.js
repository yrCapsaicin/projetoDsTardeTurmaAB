// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // React Hooks
      'react-hooks/rules-of-hooks': 'error', // checa uso correto de hooks
      'react-hooks/exhaustive-deps': 'warn', // checa dependências de useEffect

      // React Native
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'off', // ou 'warn' se quiser incentivar estilos externos
      'react-native/no-color-literals': 'off',
      'react-native/no-single-element-style-arrays': 'warn',

      // React
      'react/prop-types': 'off', // se não usar prop-types
      'react/react-in-jsx-scope': 'off', // React 17+ não precisa importar React
    },
  },
]);
