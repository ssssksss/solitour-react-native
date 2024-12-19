import MaleIcon from '@assets/img/icon/male.svg';
import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


const themeData = [
  {
    name: '힐링',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '체험/액티비티',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '관광',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '쇼핑',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '자연',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '알뜰한',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '먹거리',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '교통이 편한',
    Icon: <MaleIcon width={32} height={32} />,
  },
];

const TravelPlanThemeScreen: React.FC = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>(); // 타입 설정 (필요 시 네이티브 스택 타입 사용 가능)

  const handleGenderSelect = (themeType: string) => {
    travelPlanStore.setTravelPlan({themeType});
    navigation.navigate('ActivityType');
  };

  return (
    <View className="w-full px-4 py-[14px]">
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="flex-[6] bg-primary h-full rounded-r-2xl" />
        <View className="flex-[1] bg-gray-200 h-full" />
      </View>
      <View className="h-[68px] mt-[28px] flex flex-col">
        <Text className="title-heading-2">어떤 테마의</Text>
        <Text className="title-heading-2">여행을 떠나고 싶나요?</Text>
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
              travelPlanStore.themeType == i.name && 'bg-primary'
            } flex w-[48%] h-[66px] gap-x-2 justify-center items-center flex-row grow-1 rounded-[8px] border border-1 border-gray-10`}>
            {i.Icon}
            <Text
              className={`body-2 text-center mt-1 font-bold ${
                travelPlanStore.themeType == i.name && 'text-white'
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

export default TravelPlanThemeScreen;
