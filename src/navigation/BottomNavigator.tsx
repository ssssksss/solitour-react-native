import HomeIconActive from '@assets/img/nav/home-active.svg';
import HomeIcon from '@assets/img/nav/home.svg';
import MyInfoIconActive from '@assets/img/nav/my-info-active.svg';
import MyInfoIcon from '@assets/img/nav/my-info.svg';
import MyTravelIconActive from '@assets/img/nav/my-travel-active.svg';
import MyTravelIcon from '@assets/img/nav/my-travel.svg';
import ThemeTravelIconActive from '@assets/img/nav/theme-travel-active.svg';
import ThemeTravelIcon from '@assets/img/nav/theme-travel.svg';
import TravelDiaryIconActive from '@assets/img/nav/travel-diary-active.svg';
import TravelDiaryIcon from '@assets/img/nav/travel-diary.svg';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import DiaryScreen from '@screens/DiaryScreen';
import GatheringScreen from '@screens/GatheringScreen';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import ThemeScreen from '@screens/ThemeScreen';
import React from 'react';
import { SvgProps } from 'react-native-svg';

const Tab = createBottomTabNavigator();

type IconName =
  | 'home'
  | 'my-travel'
  | 'my-info'
  | 'theme-travel'
  | 'travel-diary';

const iconMap: Record<
  IconName,
  {active: React.FC<SvgProps>; inactive: React.FC<SvgProps>}
> = {
  home: {active: HomeIconActive, inactive: HomeIcon},
  'my-travel': {active: MyTravelIconActive, inactive: MyTravelIcon},
  'my-info': {active: MyInfoIconActive, inactive: MyInfoIcon},
  'theme-travel': {active: ThemeTravelIconActive, inactive: ThemeTravelIcon},
  'travel-diary': {active: TravelDiaryIconActive, inactive: TravelDiaryIcon},
};

type Screen = {
  name: string;
  component: React.ComponentType<any>;
  icon: IconName;
};

const getTabBarIcon = (icon: IconName, focused: boolean) => {
  const Icon = iconMap[icon];
  return (
    focused ? (
      <Icon.active width={24} height={24} />
    ) : (
      <Icon.inactive width={24} height={24} />)
  );
};

const screenOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: '#26B888', // 활성화된 탭의 색상
  tabBarInactiveTintColor: '#000', // 비활성화된 탭의 색상
  tabBarStyle: {
    backgroundColor: 'white', // 탭 바 배경색
    height: 62, // 탭 바 높이
  },
  tabBarItemStyle: {
    height: 62, // 각 아이템의 높이
    marginTop: 4,
  },
  tabBarLabelStyle: {
    fontSize: 12, // 라벨 텍스트 크기
    marginBottom: 5, // 아이콘과 라벨 사이 여백
  },
};


const screens: Screen[] = [
  {name: '내 여행', component: GatheringScreen, icon: 'my-travel'},
  {name: '테마여행', component: ThemeScreen, icon: 'theme-travel'},
  {name: '홈', component: HomeScreen, icon: 'home'},
  {name: '여행일기', component: DiaryScreen, icon: 'travel-diary'},
  {name: '내 정보', component: ProfileScreen, icon: 'my-info'},
];

const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="홈">
      {screens.map(({name, component, icon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}: {focused: boolean}) =>
              getTabBarIcon(icon, focused),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
