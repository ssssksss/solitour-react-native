import MaleIcon from '@assets/img/icon/male.svg';
import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


const themeData = [
  {
    name: '혼자',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '친구',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '애인',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '부모님',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '가족',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '단체',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '3인',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '4인',
    Icon: <MaleIcon width={32} height={32} />,
  },
];

const TravelPlanRelationshipScreen: React.FC = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>();
  const handleGenderSelect = (relationship: string) => {
    travelPlanStore.setTravelPlan({ relationship });
    navigation.navigate('ThemeType');
  };

  return (
    <View className="w-full px-4 py-[14px]">
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="flex-[5] bg-primary h-full rounded-r-2xl" />
        <View className="flex-[2] bg-gray-200 h-full" />
      </View>
      <View className="h-[68px] mt-[28px] flex flex-col">
        <Text className="title-heading-2">누구와 같이 가나요?</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 16,
          columnGap: 10,
        }}
        className="w-full h-full mt-[38px]">
        {themeData.map(i => (
          <TouchableOpacity
            key={i.name}
            onPress={() => handleGenderSelect(i.name)}
            className={`${
              travelPlanStore.relationship == i.name && 'bg-primary'
            } flex w-[48%] h-[66px] gap-x-2 justify-center items-center flex-row grow-1 rounded-[8px] border border-1 border-gray-10`}>
            {i.Icon}
            <Text
              className={`body-2 text-center mt-1 font-bold ${
                travelPlanStore.relationship == i.name && 'text-white'
              }`}>
              {i.name}
            </Text>
          </TouchableOpacity>
        ))}
        <View className="h-[160px] w-full" />
      </ScrollView>
    </View>
  );
};

export default TravelPlanRelationshipScreen;
