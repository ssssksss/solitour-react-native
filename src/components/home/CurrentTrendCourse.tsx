import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CurrentTrendCourse = () => {
  return (
    <View className="h-[205px] flex gap-y-[14px]">
      <Text className="text-[18px] font-semibold">00님을 위한 추천 코스</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Array.from({length: 10}, (_, i) => (
          <TouchableOpacity
            key={i}
            className="w-[166px] h-[166px] bg-bg-gray mr-[10px] rounded-[8px]">
            <Text> 123 </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default CurrentTrendCourse;
