import BusanSvg from '@assets/img/image/region/Busan.svg';
import ChungcheongSvg from '@assets/img/image/region/Chungcheong.svg';
import DaeguSvg from '@assets/img/image/region/Daegu.svg';
import DaejeonSvg from '@assets/img/image/region/Daejeon.svg';
import GangwonSvg from '@assets/img/image/region/Gangwon.svg';
import GwangjuSvg from '@assets/img/image/region/Gwangju.svg';
import GyeongbukSvg from '@assets/img/image/region/Gyeongbuk.svg';
import GyeonggiSvg from '@assets/img/image/region/Gyeonggi.svg';
import GyeongnamSvg from '@assets/img/image/region/Gyeongnam.svg';
import IncheonSvg from '@assets/img/image/region/Incheon.svg';
import JejuSvg from '@assets/img/image/region/Jeju.svg';
import JeollaSvg from '@assets/img/image/region/Jeolla.svg';
import SejongSvg from '@assets/img/image/region/Sejong.svg';
import SeoulSvg from '@assets/img/image/region/Seoul.svg';
import UlsanSvg from '@assets/img/image/region/Ulsan.svg';
import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';



const regions = [
  {id: 13, name: '강원', imageSvg: GangwonSvg},
  {id: 12, name: '경기', imageSvg: GyeonggiSvg},
  {id: 8, name: '경남', imageSvg: GyeongnamSvg},
  {id: 7, name: '경북', imageSvg: GyeongbukSvg},
  {id: 2, name: '광주', imageSvg: GwangjuSvg},
  {id: 5, name: '대구', imageSvg: DaeguSvg},
  {id: 4, name: '대전', imageSvg: DaejeonSvg},
  {id: 9, name: '부산', imageSvg: BusanSvg},
  {id: 1, name: '서울', imageSvg: SeoulSvg},
  {id: 245, name: '세종', imageSvg: SejongSvg},
  {id: 10, name: '울산', imageSvg: UlsanSvg},
  {id: 3, name: '인천', imageSvg: IncheonSvg},
  {id: 6, name: '전남', imageSvg: JeollaSvg},
  {id: 16, name: '전북', imageSvg: JeollaSvg},
  {id: 11, name: '제주', imageSvg: JejuSvg},
  {id: 15, name: '충남', imageSvg: ChungcheongSvg},
  {id: 14, name: '충북', imageSvg: ChungcheongSvg},
];


interface ITravelPlanRegionScreen {
}

const TravelPlanRegionScreen: React.FC<ITravelPlanRegionScreen> = ({
}) => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>(); // 타입 설정 (필요 시 네이티브 스택 타입 사용 가능)

  const handleGenderSelect = (region: string) => {
    travelPlanStore.setTravelPlan({region});
    navigation.navigate('Date');
  };

  return (
    <View className="w-full h-full px-4 py-[14px]">
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="flex-[2] bg-primary h-full rounded-r-2xl" />
        <View className="flex-[5] bg-gray-200 h-full" />
      </View>
      <View className="h-[68px] mt-[28px]">
        <Text className="title-heading-2"> 어디로 떠나고 싶나요? </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: 16,
          columnGap: 10,
        }}
        className="w-full h-full">
        {regions.map(i => (
          <TouchableOpacity
            key={i.id}
            onPress={() => handleGenderSelect(i.name)}
            className="flex w-[31%] grow-1 rounded-[8px] aspect-square">
            <View className="w-full h-full rounded-2xl overflow-hidden">
              <i.imageSvg width="100%" height="100%" />
            </View>
            <Text
              className={`body-2 text-center mt-1 font-bold ${
                travelPlanStore.region == i.name ? 'text-primary' : ''
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

export default TravelPlanRegionScreen;
