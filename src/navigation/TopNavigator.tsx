import { useNavigation } from '@react-navigation/native'; // useNavigation 훅 사용
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '@screens/MainScreen';
import ProfileScreen from '@screens/ProfileScreen';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export type RootStackParamList = {
  Main: undefined; // 'Main' 화면은 파라미터가 없음을 나타냄
  Profile: {id: number}; // 'Profile' 화면은 'id' 파라미터를 받음
};

// Stack.Navigator에 타입을 지정
const Stack = createStackNavigator();

const TopNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitle: '',
        headerRight: () => <TopNavigatorHeaderRight />,
        headerLeft: () => <TopNavigatorHeaderLeft />,
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({navigation, route}) => {
          // BottomNavigator에서 현재 활성 화면 가져오기
          const currentRouteName =
            navigation.getState().routes?.[0]?.state?.routes?.[
              navigation.getState().routes[0].state.index
            ]?.name;

          return {
            headerTitle: '',
            headerLeft:
              currentRouteName == '홈' || currentRouteName == undefined
                ? undefined
                : () => (
                  <View className="p-2 ml-2 rounded-2xl">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.reset({
                          index: 0,
                          routes: [{name: 'Main'}],
                        })
                      }>
                      <Icon name={'home'} size={24} />
                    </TouchableOpacity>
                  </View>
                ),
          };
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen} // 모달 화면
        options={{
          presentation: 'modal',
          headerLeft: undefined,
          headerRight: undefined,
          headerTitle: '프로필 설정',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
export default TopNavigator;

const TopNavigatorHeaderRight = () => {
  const navigation = useNavigation(); // navigation 타입 지정
  return (
    <View className="p-2 mr-2 rounded-2xl">
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Icon name={'user'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const TopNavigatorHeaderLeft = () => {
  const navigation = useNavigation(); // navigation 타입 지정
  return (
    <View className="p-2 ml-2 rounded-2xl">
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          })
        }>
        <Icon name={'home'} size={24} />
      </TouchableOpacity>
    </View>
  );
};
