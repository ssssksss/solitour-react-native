import GangwonSvg from '@assets/img/image/region/Gangwon.svg';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CurrentTrendTravel = () => {
  return (
    <View className="h-[205px] flex gap-y-[14px]">
      <Text className="text-[18px] font-semibold">요즘 많이 찾는 여행지</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Array.from({length: 10}, (_, i) => (
          <TouchableOpacity
            key={i}
            className="relative w-[166px] h-[166px] bg-bg-gray mr-[10px] rounded-[88px] overflow-hidden">
            <GangwonSvg width="100%" height="100%" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default CurrentTrendTravel;
