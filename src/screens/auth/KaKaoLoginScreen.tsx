import { KAKAO_REST_API_KEY, NEXT_PUBLIC_KAKAO_REDIRECT_URL } from '@env';
import useModalStore from '@store/modalStore';
import useUserStore from '@store/userStore';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import WebView from 'react-native-webview';

const KakaoLoginScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCodeProcessed, setIsCodeProcessed] = useState(false); // 인증 코드 처리 여부 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [initLogin, setInitLogin] = useState(false);
  const userStore = useUserStore();
  const modalStore = useModalStore();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${NEXT_PUBLIC_KAKAO_REDIRECT_URL}`;

  const handleNavigationStateChange = async (event: any) => {
    const {url} = event;
    let accessToken;
    let refreshToken;
    // 인증 코드가 이미 처리된 경우 중복 요청을 방지
    if (isCodeProcessed) {
      return;
    }

    // Redirect URL 감지
    if (url.startsWith(`${NEXT_PUBLIC_KAKAO_REDIRECT_URL}`)) {
      const code = url.split('code=')[1];
      if (code) {
        try {
          // 인증 코드 처리 완료 상태로 변경
          setIsCodeProcessed(true);

          // 백엔드로 인증 코드 전달
          const response = await fetch(
            `http://192.168.35.221:8080/api/auth/oauth2/login?type=kakao&code=${code}&redirectUrl=${NEXT_PUBLIC_KAKAO_REDIRECT_URL}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          const setCookieHeader = response.headers.get('set-cookie');
          // access_token과 refresh_token 추출
          if (setCookieHeader != null) {
            const cookies = setCookieHeader
              .split(',')
              .map(cookie => cookie.trim());
            accessToken = cookies
              .find(cookie => cookie.startsWith('access_token='))
              ?.split(';')[0] // "access_token=..." 부분만 추출
              ?.split('=')[1]; // "=" 뒤의 값 추출

            refreshToken = cookies
              .find(cookie => cookie.startsWith('refresh_token='))
              ?.split(';')[0]
              ?.split('=')[1];

            await EncryptedStorage.setItem(
              'accessToken',
              JSON.stringify({token: accessToken}),
            );
            await EncryptedStorage.setItem(
              'refreshToken',
              JSON.stringify({token: refreshToken}),
            );
          }
          const data = await response.json();
          if (data == 'PENDING') {
            setInitLogin(true);
          } else {
            const response = await fetch(
              'http://192.168.35.221:8080/api/users/info',
              {
                method: 'GET',
                headers: {
                  Cookie: `access_token=${accessToken}`,
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              },
            );

            if (response.ok) {
              const data: IUser = await response.json();
              userStore.setUser({
                email: data.email,
                nickname: data.nickname,
                age: data.age,
                id: data.id,
                isAdmin: data.isAdmin,
                provider: data.provider,
                userImage: data.userImage.address,
              });
              modalStore.setModal({
                isOpen: false,
              });
            }

            if (response.status == 401) {
              console.log('KaKaoLoginScreen.tsx 파일 : ','토큰 만료');
            }
          }
          setIsLoggedIn(true); // 로그인 성공 후 상태 업데이트
        } catch (error) {
          Alert.alert('로그인 실패', '서버와 통신 중 오류가 발생했습니다.');
        }
      } else {
        Alert.alert('로그인 실패', '인증 코드가 없습니다.');
      }
    }
  };

  // WebView 오류 처리
  const handleWebViewError = () => {
    setLoading(false); // 에러가 발생하면 로딩 상태를 false로 설정하여 로딩 화면을 숨김
  };


  return (
    <View className="flex-1 justify-center">
      {!isLoggedIn && loading ? (
        <WebView
          source={{uri: KAKAO_AUTH_URL}}
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleWebViewError} // 오류 처리 추가
          onHttpError={handleWebViewError} // HTTP 오류 처리 추가
        />
      ) : (
        initLogin ?
          <View className="flex-1">
            <Text> 추가 정보 입력 필요 </Text>
          </View>
          :
          <View className="relative w-full h-[269px] -translate-y-[40px]">
            <LottieView
              source={require('@assets/lottie/loading-airplane.json')}
              autoPlay
              loop
              style={{
                width: '100%',
                height: 274,
              }}
            />
            <Text className="text-center text-[20px]"> 로딩중... </Text>
          </View>
      )}
    </View>
  );
};

export default KakaoLoginScreen;
