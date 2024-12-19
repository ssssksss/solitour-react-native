import MaleIcon from '@assets/img/icon/male.svg';
import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


const activityData = [
  {
    name: '이색체험',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '레저 스포츠',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '전통체험',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '공원',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '미술관/박물관',
    Icon: <MaleIcon width={32} height={32} />,
  },
  {
    name: '사진 명소',
    Icon: <MaleIcon width={32} height={32} />,
  },
];

const TravelPlanActivityScreen: React.FC = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>(); // 타입 설정 (필요 시 네이티브 스택 타입 사용 가능)

  const handleGenderSelect = (activityType: string) => {
    travelPlanStore.setTravelPlan({activityType});
    navigation.reset({
      index: 0, // 스택을 초기화하고 첫 번째 화면으로 이동
      routes: [{name: 'AI 코스 추천'}],
    });
  };

  return (
    <View className="w-full px-4 py-[14px]">
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="w-full bg-primary h-full rounded-r-2xl" />
      </View>
      <View className="h-[68px] mt-[28px] flex flex-col">
        <Text className="title-heading-2">여행에서</Text>
        <Text className="title-heading-2">무엇을 하고 싶나요?</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 16,
          columnGap: 10,
        }}
        className="w-full h-full mt-[38px]">
        {activityData.map(i => (
          <TouchableOpacity
            key={i.name}
            onPress={() => handleGenderSelect(i.name)}
            className={`${
              travelPlanStore.activityType == i.name && 'bg-primary'
            } flex w-[48%] h-[66px] gap-x-2 justify-center items-center flex-row grow-1 rounded-[8px] border border-1 border-gray-10`}>
            {i.Icon}
            <Text
              className={`body-2 text-center mt-1 font-bold ${
                travelPlanStore.activityType == i.name && 'text-white'
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

export default TravelPlanActivityScreen;
