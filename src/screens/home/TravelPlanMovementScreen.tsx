import CarIcon from '@assets/img/icon/car.svg';
import TrainIcon from '@assets/img/icon/train.svg';
import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const movementData = [
  {
    name: '대중교통',
    Icon: <TrainIcon width={32} height={32} />,
  },
  {
    name: '자가용',
    Icon: <CarIcon width={32} height={32} />,
  },
];

const TravelPlanMovementScreen: React.FC = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>(); // 타입 설정 (필요 시 네이티브 스택 타입 사용 가능)

  const handleGenderSelect = (movementType: string) => {
    travelPlanStore.setTravelPlan({movementType});
    navigation.navigate('Relationship');
  };

  return (
    <View className="w-full px-4 py-[14px]">
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="flex-[4] bg-primary h-full rounded-r-2xl" />
        <View className="flex-[3] bg-gray-200 h-full" />
      </View>
      <View className="h-[68px] mt-[28px]">
        <Text className="title-heading-2"> 어떻게 이동하나요? </Text>
      </View>
      <View className="flex mt-[38px] gap-y-[16px]">
        {movementData.map(i => (
          <TouchableOpacity
            key={i.name}
            onPress={() => handleGenderSelect(i.name)}
            className={`flex justify-center items-center border border-1 py-[10px] border-gray-10 rounded-[8px] ${
              travelPlanStore.movementType == i.name && 'bg-primary'
            }`}>
            {i.Icon}
            <Text
              className={`mt-2 body-2 font-semibold ${
                travelPlanStore.movementType == i.name && 'text-white'
              }`}>
              {i.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TravelPlanMovementScreen;
