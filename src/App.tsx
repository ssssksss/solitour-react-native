import BottomNavigator from '@navigation/BottomNavigator';
import ModalNavigator from '@navigation/ModalNavigator';
import { NavigationContainer } from '@react-navigation/native';
import useModalStore from '@store/modalStore';
import useUserStore from '@store/userStore';
import React, { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setCustomText } from 'react-native-global-props';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function App() {

  const modalStore = useModalStore();
  const userStore = useUserStore();

  setCustomText({
    style: {
      fontFamily: 'PretendardVariable',
    },
  });

  useEffect(() => {
    const temp = async () => {
      let accessToken = await EncryptedStorage.getItem('accessToken');
      let refreshToken = await EncryptedStorage.getItem('refreshToken');
      // const refreshToken = await EncryptedStorage.getItem('refreshToken');
      if (accessToken) {
        accessToken = JSON.parse(accessToken).token;
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
        }
        if (response.status == 401) {
          // 추가로직 작성 필요
        }
      }
    };
    temp();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <NavigationContainer>
        {modalStore.isOpen ? <ModalNavigator /> : <BottomNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
