import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CurrentReview = () => {
  return (
    <View className="h-[205px] flex gap-y-[14px]">
      <Text className="text-[18px] font-semibold">지금 뜨는 사용자 후기</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Array.from({length: 10}, (_, i) => (
          <TouchableOpacity
            key={i}
            className="w-[212px] h-[152px] mr-[10px] rounded-[12px] pl-[18px] pt-[20px] border-1 border border-[#E9EBED]">
            <View className="w-[96px] h-[14px]">
              <Text className="font-semibold text-xs translate-x-[-4px]"> ⭐⭐⭐⭐⭐ 별점 </Text>
            </View>
            <View className="mt-[9px]">
              <Text className="font-semibold">00님 2박 3일 부산</Text>
            </View>
            <View className=" mt-[3px]">
              <Text>
                리뷰 내용입니다.리뷰 내 리뷰 내용입니다.리뷰 내용입니다. 리뷰
                내용입니다.리뷰 내용입니다.
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default CurrentReview;
