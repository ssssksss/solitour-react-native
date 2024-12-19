import Carousel from '@components/common/carousel/Carousel';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DiaryScreen = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState('year'); // 'year' or 'month'

  // 연도 목록 생성 (현재 연도 기준 ±5년)
  const years = Array.from(
    {length: 11},
    (_, i) => new Date().getFullYear() - 5 + i,
  );

  // 월 목록 생성
  const months = Array.from({length: 12}, (_, i) => i + 1);

  const handleYearSelect = year => {
    setSelectedYear(year);
    setModalStep('month');
  };

  const handleMonthSelect = month => {
    setSelectedMonth(month);
    setDateModalVisible(false);
    setModalStep('year'); // 다음 오픈을 위해 초기화
  };

  // 특정 월의 날짜 생성 함수 (기존과 동일)
  const generateDatesForMonth = (year, month) => {
    const lastDay = new Date(year, month, 0).getDate();

    return Array.from({length: lastDay}, (_, index) => {
      const date = new Date(year, month - 1, index + 1);
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

      return {
        day: dayNames[date.getDay()],
        date: index + 1,
      };
    });
  };

  const currentMonthDates = generateDatesForMonth(selectedYear, selectedMonth);

  return (
    <ScrollView
      contentContainerStyle={{paddingVertical: 20}}
      className="py-[20px] bg-white">
      {/* 기존 코드와 동일한 부분 */}
      <View className="h-[224px] flex px-[16px]">
        <View className="w-full h-[44px] flex flex-row justify-between items-center">
          <Text className="h-full title-heading-1 text-center leading-[44px]">
            여행일기
          </Text>
          <TouchableOpacity>
            <Icon
              name={'pencil'}
              size={24}
              className="h-[24px] w-[24px] default-flex"
            />
          </TouchableOpacity>
        </View>

        <View className="flex h-[180px] mt-[8px]">
          <View>
            {/* 연도, 월 선택 버튼 */}
            <TouchableOpacity
              className="flex-row justify-start items-center h-[34px]"
              onPress={() => {
                setDateModalVisible(true);
                setModalStep('year');
              }}>
              <Text className="text-[#111] text-[24px] font-bold leading-[32.4px] tracking-[-0.45px]">
                {selectedYear}. {selectedMonth}월
              </Text>
            </TouchableOpacity>

            {/* 날짜 선택 모달 */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={dateModalVisible}
              onRequestClose={() => {
                setDateModalVisible(false);
                setModalStep('year');
              }}>
              <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white rounded-xl p-5 max-h-[50%] w-[80%]">
                  {/* 연도 선택 단계 */}
                  {modalStep === 'year' && (
                    <View className="pb-8">
                      <Text className="text-center text-lg font-bold mb-4">
                        연도를 선택하세요
                      </Text>
                      <ScrollView className="h-full w-full border border-1 p-2 rounded-2xl">
                        {years.map(year => (
                          <TouchableOpacity
                            key={year}
                            className={`items-center h-[44px] default-flex ${
                              selectedYear === year
                                ? 'bg-blue-500 rounded-lg'
                                : ''
                            }`}
                            onPress={() => handleYearSelect(year)}>
                            <Text
                              className={`
                                h-[32px]
                                ${
                          selectedYear === year
                            ? 'text-white'
                            : 'text-black'
                          }
                              `}>
                              {year}년
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {/* 월 선택 단계 */}
                  {modalStep === 'month' && (
                    <View className="pb-8">
                      <Text className="text-center text-lg font-bold mb-4">
                        월을 선택하세요
                      </Text>
                      <ScrollView className="h-full w-full border border-1 p-2 rounded-2xl">
                        {months.map(month => (
                          <TouchableOpacity
                            key={month}
                            className={`items-center h-[44px] default-flex ${
                              selectedMonth === month
                                ? 'bg-blue-500 rounded-lg'
                                : ''
                            }`}
                            onPress={() => handleMonthSelect(month)}>
                            <Text
                              className={`
                                h-[32px]
                                ${
                          selectedMonth === month
                            ? 'text-white'
                            : 'text-black'
                          }
                              `}>
                              {month}월
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>

          {/* 날짜 스크롤 뷰 (기존과 동일) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pt-[24px] px-[8px]">
            {currentMonthDates.map((dateItem, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-col h-[67px] mr-[30px] justify-between items-center">
                <Text className={`${dateItem.day == '일' ? 'text-red-500' : dateItem.day == '토' ? 'text-blue-500' : 'text-black '} font-bold` }>{dateItem.day}</Text>
                <Text className="font-bold text-black">{dateItem.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View className="h-[388px] mb-[10px]">
        <Carousel />
      </View>
    </ScrollView>
  );
};

export default DiaryScreen;
