import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const buttonList = [
  '#맛집 순례', '#팝업 투어', '#촌캉스',
];

const CurrentTrendTheme = () => {
  const [activeButton, setActiveButton] = useState(buttonList[0]);
  const handleButton = (i: string) => {
    setActiveButton(i);
  };
  return (
    <View className="h-[345px] w-full flex gap-y-[18px] ">
      <Text className="text-[18px] font-semibold">요즘 유행하는 테마여행</Text>
      <View className="h-[300px] flex-1 gap-y-[14px]">
        <View className="flex flex-row gap-x-[6px] h-[37px]">
          {buttonList.map((i, index) => (
            <TouchableOpacity
              key={index}
              onPress={()=>handleButton(i)}
              className={`w-[99px] h-[37px] rounded-[18px] flex justify-center items-center ${i === activeButton ? 'bg-primary ' : 'border-[1px] border-gray-10'} `}>
              <Text className={`text-center font-semibold ${i === activeButton ? 'text-white' : ''}`}> {i} </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="w-full h-[249px] bg-bg-gray rounded-[12px]" />
      </View>
    </View>
  );
};
export default CurrentTrendTheme;
