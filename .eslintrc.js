module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 'error',
    quotes: 'error',
    'jsx-quotes': 'error',
    'react-hooks/exhaustive-deps': 'off', // exhaustive-deps 경고 비활성화
    indent: [
      'error',
      2,
      {
        SwitchCase: 1, // Switch 문을 사용할 때 case가 switch보다 한 단계 들여쓰기되도록 합니다.
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-tabs': 'error',
    'max-len': 'off',
  },
};
