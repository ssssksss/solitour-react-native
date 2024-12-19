import FemaleIcon from '@assets/img/icon/female.svg';
import MaleIcon from '@assets/img/icon/male.svg';
import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TravelPlanGenderScreen: React.FC = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>(); // 타입 설정 (필요 시 네이티브 스택 타입 사용 가능)

  const handleGenderSelect = (gender: string) => {
    travelPlanStore.setTravelPlan({gender});
    navigation.navigate('Region');
  };

  return (
    <View className="w-full px-4 py-[14px]">
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="flex-[1] bg-primary h-full rounded-r-2xl" />
        <View className="flex-[6] bg-gray-200 h-full" />
      </View>
      <View className="h-[68px] mt-[28px]">
        <Text className="title-heading-2">00 님의 </Text>
        <Text className="title-heading-2">성별을 알려주세요</Text>
      </View>
      <View className="flex flex-row justify-between mt-[38px] gap-x-[10px]">
        {['male', 'female'].map(i => (
          <TouchableOpacity
            key={i}
            onPress={() => handleGenderSelect(i)}
            className={`flex-1 justify-center items-center border border-1 border-gray-10 rounded-[8px] aspect-square ${
              travelPlanStore.gender == i && 'bg-primary'
            }`}>
            {i == 'male' ? (
              <MaleIcon width={64} height={64} />
            ) : (
              <FemaleIcon width={64} height={64} />
            )}
            <Text
              className={`mt-2 body-2 font-semibold ${
                travelPlanStore.gender == i && 'text-white'
              }`}>
              {i == 'male' ? '남자에요' : '여자에요'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TravelPlanGenderScreen;
