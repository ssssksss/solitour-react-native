import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const travelList = [
  [
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
  ],
  [
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
    {
      title: '어디어디 맛집',
      category: '음식점',
    },
  ],
];

const TravelPlanResultScreen: React.FC = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>();
  const [days, setDays] = useState(0);

  useEffect(() => {
    // 요청보내고
  }, []);

  {/* <ScrollView className="flex h-full gap-x-[10px]">
    <View className="w-full flex-1 flex-col items-center gap-y-[90px]">
      <Text className="title-heading-2"> 맞춤 여행 만드는 중... </Text>
      <View className="aspect-square w-[282px] bg-gray-10" />
    </View>
  </ScrollView> */}
  return (
    <ScrollView className="flex-1">
      <View className="px-4 py-3 gap-y-[2px]">
        <Text className="text-[24px] font-bold -left-1">강릉 2박 3일 여행</Text>
        <Text className="text-gray-60"> 2024.11.22 ~ 11.24 </Text>
      </View>
      <View className="w-full h-[275px] bg-bg-gray" />
      <View className="px-[1rem] mt-[1rem] gap-x-[6px] flex flex-row self-start items-start justify-start">
        {travelList.map((i, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setDays(index)}
            className={`${
              index == days && 'bg-primary'
            } default-flex px-4 py-2 h-[38px] min-w-[78px] border border-1 border-gray-30 rounded-[19px]`}>
            <Text className={`${index == days && 'font-semibold text-white'} `}>
              day {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-[24px] px-[16px]">
        <Text className="text-gray-60"> 2024.11.22 </Text>
      </View>
      <View className="flex flex-row mt-[24px] px-[16px]">
        <View className="w-[26px] h-full " />
        <View className="flex flex-1 gap-y-[32px]">
          {Array.from({length: 10}, (i, index) => (
            <View key={index} className="relative flex justify-between p-4 w-full h-[80px] bg-bg-light-gray rounded-[8px]">
              <View className="absolute -left-[18px] w-[1px] h-[120px] border-l-[1px] border-l-gray-10" />
              <TouchableOpacity className="absolute -left-[26px] items-center justify-center aspect-square w-[18px] rounded-[50%] bg-black">
                <Text className="text-white text-center text-xs">
                  {index + 1}
                </Text>
              </TouchableOpacity>
              <Text className="font-semibold text-black"> 어디어디 맛집 </Text>
              <Text className="text-text-3"> 음식점 | 1인 9000원 </Text>
            </View>
          ))}
        </View>
      </View>
      <View className="mt-[60px] px-[16px] w-full h-[60px]">
        <TouchableOpacity className="w-full h-[48px] bg-primary items-center justify-center rounded-[24px]">
          <Text className="text-white text-center text-lg"> 코스 저장하기 </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TravelPlanResultScreen;
