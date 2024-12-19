import CloseButton from '@components/common/button/CloseButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useModalStore from '@store/modalStore';
import React from 'react';
import TravelPlanActivityScreen from './TravelPlanActivityScreen';
import TravelPlanDateScreen from './TravelPlanDateScreen';
import TravelPlanGenderScreen from './TravelPlanGenderScreen';
import TravelPlanMovementScreen from './TravelPlanMovementScreen';
import TravelPlanRegionScreen from './TravelPlanRegionScreen';
import TravelPlanRelationshipScreen from './TravelPlanRelationshipScreen';
import TravelPlanThemeScreen from './TravelPlanThemeScreen';

interface ITravelPlanGeneratorScreen {
}

const Stack = createNativeStackNavigator();

const TravelPlanGeneratorScreen: React.FC<ITravelPlanGeneratorScreen> = ({
}) => {
  const modalStore = useModalStore();

  return (
    <Stack.Navigator
      initialRouteName="Gender"
      screenOptions={{
        title: '여행 정보 수집',
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowColor: 'transparent',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0,
          shadowRadius: 0,
        },
        contentStyle: {backgroundColor: 'white'}, // 각 화면의 배경을 흰색으로 설정
        headerRight: () => (
          <CloseButton
            onPress={() => {
              modalStore.setModal({isOpen: false});
            }}
          />
        ),
      }}>
      <Stack.Screen
        name="Gender"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanGenderScreen}
      />
      <Stack.Screen
        name="Region"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanRegionScreen}
      />
      <Stack.Screen
        name="Date"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanDateScreen}
      />
      <Stack.Screen
        name="MovementType"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanMovementScreen}
      />
      <Stack.Screen
        name="Relationship"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanRelationshipScreen}
      />
      <Stack.Screen
        name="ThemeType"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanThemeScreen}
      />
      <Stack.Screen
        name="ActivityType"
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }}
        component={TravelPlanActivityScreen}
      />
    </Stack.Navigator>
  );
};

export default TravelPlanGeneratorScreen;
