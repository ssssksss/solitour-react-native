import Carousel from '@components/common/carousel/Carousel';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const buttonList = ['여행1', '여행2', '여행3'];

const ThemeScreen = () => {
  const [activeButton, setActiveButton] = useState(buttonList[0]);
  const handleButton = (i: string) => {
    setActiveButton(i);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
      }}
      className="py-[20px] bg-white">
      <View className="h-[477px] flex gap-y-[23px]">
        <Text className="h-[44px] title-heading-1 px-[16px]"> 테마여행 </Text>
        <View className="h-[410px]">
          <Carousel />
        </View>
      </View>
      {/*  */}
      <View className="h-[364px] w-full flex gap-y-[18px] mt-[76px] px-[20px]">
        <View className="h-[300px] flex-1 gap-y-[14px]">
          <View className="flex flex-row gap-x-[6px] h-[37px]">
            {buttonList.map((i, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleButton(i)}
                className={`w-[99px] h-[37px] rounded-[18px] flex justify-center items-center ${
                  i === activeButton ? 'bg-primary ' : 'bg-bg-gray'
                } `}>
                <Text
                  className={`text-center ${
                    i === activeButton ? 'text-white' : ''
                  }`}>
                  {i}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="w-full h-[249px] bg-bg-gray rounded-[12px]" />
        </View>
      </View>
      {/*  */}
      <View className="py-[17px] flex gap-y-[10px] px-[16px] rounded-[20px]">
        <TouchableOpacity onPress={() => ''} className="h-[37px]">
          <Text> 어디로 떠나시나요? </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ''}
          className="h-[37px] rounded-[20px]">
          <Text> 날짜를 지정해주세요! </Text>
        </TouchableOpacity>
      </View>
      <View className="text-[18px] px-[16px] pb-[20px] ">
        <Text className="title-heading-1"> # 이런 여행 테마는 어때요? </Text>
        <View className="flex flex-row gap-[8px] max-w-[100%] flex-wrap pt-[24px]">
          {Array.from({length: 10}, (_, index) => (
            <TouchableOpacity
              key={index}
              className={`
                h-[29px] 
                px-[12px] 
                rounded-[20px] 
                default-flex
                self-start
                border-[1px]
                border-solid
                border-[#D9D9D9]
                bg-white
              `}>
              <Text>#{index}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className={`
                h-[29px]
                mt-[30px]
                rounded-[20px] 
                default-flex
                bg-white
                w-full
              `}>
            <Text className="">더보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ThemeScreen;
