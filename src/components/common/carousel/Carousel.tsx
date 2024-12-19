import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');
const PADDING_HORIZONTAL = 16; // 부모 요소의 좌우 패딩 값
const IMAGE_WIDTH = width - PADDING_HORIZONTAL * 2 - 40; // 전체 - 부모16px * 2 - 양옆 공간(20씩)

const Carousel = () => {
  const [currentIndex1, setCurrentIndex1] = useState(1);
  const [currentIndex2, setCurrentIndex2] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollRef1 = useRef<ScrollView>(null);
  const scrollRef2 = useRef<ScrollView>(null);
  const [layer, setLayer] = useState(1);

  // 샘플 이미지 데이터
  const slides = [
    {
      url: 'https://cdn.pixabay.com/photo/2022/11/27/13/27/couple-7619797_640.jpg',
      title: '이미지 1',
      index: 1,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2024/11/11/14/05/flamingo-9190160_640.jpg',
      title: '이미지 2',
      index: 2,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2023/05/30/15/34/silver-gull-8028945_640.jpg',
      title: '이미지 3',
      index: 3,
    },
    {
      url: 'https://cdn.pixabay.com/photo/2024/10/24/21/35/hippopotamus-9147023_640.jpg',
      title: '이미지 4',
      index: 4,
    },
  ];

  const slideList = [slides[slides.length - 1], ...slides, slides[0]];

  // 자동 슬라이드 기능
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined; // NodeJS.Timeout 타입 지정
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000); // 3초마다 다음 슬라이드로 이동
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex1, currentIndex2]);

  const prevSlide = () => {
    const newIndex = layer == 1 ? currentIndex1 - 1 : currentIndex2 - 1;
    scrollToIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = layer == 1 ? currentIndex1 + 1 : currentIndex2 + 1;
    scrollToIndex(newIndex);
  };

  const scrollToIndex = async (index: number) => {
    if (layer == 1) {
      await scrollRef1.current?.scrollTo({
        x: index * IMAGE_WIDTH,
        animated: true,
      });
      setCurrentIndex1(index);
      if (index === slideList.length - 2) {
        scrollRef2.current?.scrollTo({
          x: 1 * IMAGE_WIDTH,
          animated: true,
        });
      } else if (index === 1) {
        scrollRef2.current?.scrollTo({
          x: (slideList.length - 2) * IMAGE_WIDTH,
          animated: true,
        });
      }
      if (index === slideList.length - 1) {
        setTimeout(() => {
          setLayer(2);
          setCurrentIndex2(1);
        }, 200);
      }
      if (index === 0) {
        setTimeout(() => {
          setLayer(2);
          setCurrentIndex2(slideList.length - 2);
        }, 200);
      }
    }

    if (layer === 2) {
      await scrollRef2.current?.scrollTo({
        x: index * IMAGE_WIDTH,
        animated: true,
      });
      setCurrentIndex2(index);
      if (index === slideList.length - 2) {
        scrollRef1.current?.scrollTo({
          x: 1 * IMAGE_WIDTH,
          animated: true,
        });
      } else if (index === 1) {
        scrollRef1.current?.scrollTo({
          x: (slideList.length - 2) * IMAGE_WIDTH,
          animated: true,
        });
      }
      if (index === slideList.length - 1) {
        setTimeout(() => {
          setLayer(1);
          setCurrentIndex1(1);
        }, 200);
      } else if (index === 0) {
        setTimeout(() => {
          setLayer(1);
          setCurrentIndex1(slideList.length - 2);
        }, 200);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className={'relative w-full h-[410px]'}>
        {/* 슬라이드 영역 */}
        <ScrollView
          ref={scrollRef1}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={IMAGE_WIDTH}
          decelerationRate="normal"
          scrollEventThrottle={0}
          scrollEnabled={false}
          contentOffset={{x: currentIndex1 * IMAGE_WIDTH, y: 0}} // 초기 위치
          contentContainerStyle={{
            paddingHorizontal: 36, // 좌우 패딩 추가로 가운데 정렬, 좌우 패딩값은 다른 요소들이 보이게 한다.
          }}
          className={`${
            layer == 1 ? 'z-20' : 'opacity-0'
          } top-0 left-0 absolute w-full h-full`}>
          {slideList.map((slide, index) => (
            <View
              key={index}
              style={{
                width: IMAGE_WIDTH,
                // marginHorizontal: 5, // 여기를 건드리면 양옆 사이의 간격이 벌어진다.
                paddingHorizontal: 0,
              }}>
              <Image
                source={{uri: slide.url}}
                className={'w-full h-full rounded-lg px-5'}
                style={{
                  opacity: currentIndex1 === index ? 1 : 0.6,
                  transform: [
                    {scaleX: currentIndex1 === index ? 1 : 0.9},
                    {scaleY: currentIndex1 === index ? 1 : 0.85},
                  ],
                }}
              />
            </View>
          ))}
        </ScrollView>
        <ScrollView
          ref={scrollRef2}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={IMAGE_WIDTH}
          decelerationRate="fast"
          scrollEventThrottle={0}
          scrollEnabled={false}
          contentOffset={{x: currentIndex2 * IMAGE_WIDTH, y: 0}} // 초기 위치
          contentContainerStyle={{
            paddingHorizontal: 36, // 좌우 패딩 추가로 가운데 정렬, 좌우 패딩값은 다른 요소들이 보이게 한다.
          }}
          className={`${
            layer == 2 ? 'z-20' : 'opacity-0'
          } top-0 left-0 absolute w-full h-full`}>
          {slideList.map((slide, index) => (
            <View
              key={index}
              style={{
                width: IMAGE_WIDTH,
                // marginHorizontal: 5, // 여기를 건드리면 양옆 사이의 간격이 벌어진다.
                // paddingHorizontal: 36,
              }}>
              <Image
                source={{uri: slide.url}}
                className={'w-full h-full rounded-lg px-5'}
                style={{
                  opacity: currentIndex2 === index ? 1 : 0.6,
                  transform: [
                    {scaleX: currentIndex2 === index ? 1 : 0.9},
                    {scaleY: currentIndex2 === index ? 1 : 0.85},
                  ],
                }}
              />
            </View>
          ))}
        </ScrollView>
        {/* 이전/다음 버튼 */}
        <TouchableOpacity
          onPress={prevSlide}
          className="absolute top-1/2 -translate-y-2 bg-black/50 rounded-full p-2 left-2 z-50">
          <Text className="text-white text-lg">{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextSlide}
          className="absolute top-1/2 -translate-y-2 bg-black/50 rounded-full p-2 right-2 z-50">
          <Text className="text-white text-lg">{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* 컨트롤 패널 */}
      <View className="absolute bottom-2 flex-row justify-end w-full mt-4 z-50">
        <View className="mr-2 flex justify-end flex-row gap-x-4 bg-white px-4 rounded-2xl">
          <TouchableOpacity
            onPress={() => setIsPlaying(!isPlaying)}
            className="px-2 rounded-2xl">
            <Text className="text-black font-bold text-lg">
              {isPlaying ? '||' : '▶'}
            </Text>
          </TouchableOpacity>

          <Text className="text-black font-bold text-lg">
            {((layer == 1 ? currentIndex1 - 1 : currentIndex2 - 1) %
              slides.length) +
              1 || slideList.length - 2}
            / {slides.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Carousel;
