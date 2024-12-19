import { useNavigation } from '@react-navigation/native';
import useTravelPlanStore from '@store/travelPlanStore';
import { format } from 'date-fns-tz';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

interface ITravelPlanDateScreen {}

const TravelPlanDateScreen: React.FC<ITravelPlanDateScreen> = () => {
  const travelPlanStore = useTravelPlanStore();
  const navigation = useNavigation<any>(); // 네이티브 스택 타입 설정 가능
  const [selectedRange, setSelectedRange] = React.useState({
    start: travelPlanStore.startDate || format(new Date(), 'yyyy-MM-dd'),
    end: travelPlanStore.endDate || format(new Date(), 'yyyy-MM-dd'),
  });

  const handleGenderSelect = () => {
    travelPlanStore.setTravelPlan({
      startDate: selectedRange.start,
      endDate: selectedRange.end,
    });
    navigation.navigate('MovementType');
  };

  const getMarkedDates = (start: string, end: string) => {
    if (!start || !end) {
      return {};
    }
    // 날짜 비교를 위해 Date 객체 생성
    let _start = new Date(start);
    let _end = new Date(end);

    // 날짜 순서 보장 (start가 더 큰 경우 교환)
    if (_start > _end) {
      [_start, _end] = [_end, _start];
    }
    const range: Record<string, any> = {};
    let current = new Date(_start);
    while (current <= new Date(_end)) {
      const date = current.toISOString().split('T')[0];
      range[date] = {color: '#26B888', textColor: 'black'};
      current.setDate(current.getDate() + 1);
    }
    return range;
  };

  const renderCustomHeader = (date: any) => {
    const year = date.getFullYear(); // 연도 추출
    const month = date.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1 필요)

    return (
      <View
        style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>{`${year}년 ${month}월`}</Text>
      </View>
    );
  };

  return (
    <View className="w-full h-full px-4 py-4">
      {/* 상단 진행 바 */}
      <View className="w-full h-[14px] rounded-2xl overflow-hidden flex-row">
        <View className="flex-[3] bg-primary h-full rounded-r-2xl" />
        <View className="flex-[4] bg-gray-200 h-full" />
      </View>

      <View className="h-[68px] mt-[28px]">
        <Text className="title-heading-2"> 언제 떠나나요? </Text>
      </View>

      {/* 캘린더 */}
      <View style={{flex: 1}}>
        <Calendar
          onDayPress={day => {
            if (
              !selectedRange.start ||
              (selectedRange.start && selectedRange.end)
            ) {
              setSelectedRange({start: day.dateString, end: ''});
            } else {
              // 날짜 비교를 위해 Date 객체 생성
              let _start = selectedRange.start;
              let _end = day.dateString;
              if (_start > _end) {
                [_start, _end] = [_end, _start];
              }
              setSelectedRange({start: _start, end: _end});
            }
          }}
          renderHeader={date => renderCustomHeader(new Date(date))}
          SixWeeks={true}
          markingType="period"
          markedDates={{
            [selectedRange.start]: {startingDay: true, color: '#26B888'},
            [selectedRange.end]: {endingDay: true, color: '#26B888'},
            ...getMarkedDates(selectedRange.start, selectedRange.end),
          }}
        />
        <TouchableOpacity
          onPress={() => handleGenderSelect()}
          className="flex flex-row items-center justify-center gap-x-2 px-2 py-4 mt-4 bg-primary rounded-2xl">
          <Text className="text-lg">{selectedRange.start}</Text>
          <Text className="text-lg"> ~ </Text>
          <Text className="text-lg">{selectedRange.end}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TravelPlanDateScreen;
