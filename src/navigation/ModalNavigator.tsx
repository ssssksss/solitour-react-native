import CloseButton from '@components/common/button/CloseButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KakaoLoginScreen from '@screens/auth/KaKaoLoginScreen';
import TravelPlanGeneratorScreen from '@screens/home/TravelPlanGeneratorScreen';
import TravelPlanResultScreen from '@screens/home/TravelPlanResultScreen';
import useModalStore from '@store/modalStore';

const ModalNavigator = () => {

  const Stack = createNativeStackNavigator();
  const modalStore = useModalStore();

  return (
    <Stack.Navigator
      initialRouteName={modalStore.navigate}
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'}, // 각 화면의 배경을 흰색으로 설정
      }}>
      <Stack.Screen
        name="여행 정보 수집"
        options={{
          headerShown: false, // 헤더 숨기기
        }}
        component={TravelPlanGeneratorScreen}
      />
      <Stack.Screen
        name="AI 코스 추천"
        options={{
          headerShown: true,
          headerRight: () => (
            <CloseButton
              onPress={() => {
                modalStore.setModal({isOpen: false});
              }}
            />
          ),
        }}
        component={TravelPlanResultScreen}
      />
      <Stack.Screen
        name="카카오 로그인"
        options={{
          headerShown: true,
          headerRight: () => (
            <CloseButton
              onPress={() => {
                modalStore.setModal({isOpen: false});
              }}
            />
          ),
        }}
        component={KakaoLoginScreen}
      />
    </Stack.Navigator>
  );
};
export default ModalNavigator;
