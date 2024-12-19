import HomeMainSvg from '@assets/img/image/home/home-main.svg';
import CurrentReview from '@components/home/CurrentReview';
import CurrentTrendCourse from '@components/home/CurrentTrendCourse';
import CurrentTrendTheme from '@components/home/CurrentTrendTheme';
import CurrentTrendTravel from '@components/home/CurrentTrendTravel';
import ModalNavigator from '@navigation/ModalNavigator';
import useModalStore from '@store/modalStore';
import useUserStore from '@store/userStore';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = (props) => {
  const modalStore = useModalStore();
  const userStore = useUserStore();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative w-full h-[375px] bg-bg-light-gray flex justify-between">
        <View className="absolute w-full h-[375px]">
          <HomeMainSvg className="w-full" />
        </View>
        <View className="flex mt-[32px] px-[1rem] ">
          <Text className="title-heading-2 text-center text-black"> {userStore.nickname}님, </Text>
          <Text className="title-heading-2 text-center text-black"> 오늘은 어디로 떠날까요? </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            modalStore.setModal({
              isOpen: true,
              navigate: '여행 정보 수집',
            });
          }}
          className="default-flex h-[48px] bg-primary w-[calc(100%-2rem)] mx-[1rem] mb-[24px] rounded-[24px] z-10">
          <Text className="text-white text-bold text-[18px]">AI 여행 코스 추천</Text>
        </TouchableOpacity>
      </View>
      <View className="px-4 py-[52px] flex gap-y-[52px]">
        <CurrentTrendCourse />
        <CurrentTrendTravel />
        <CurrentTrendTheme />
        <CurrentReview />
      </View>
      {modalStore.isOpen && (
        <Modal
          visible={modalStore.isOpen}
          onRequestClose={() => modalStore.setModal({isOpen: false})}>
          <ModalNavigator />
        </Modal>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
