import KaKaoIconSvg from '@assets/img/icon/kakao-icon.svg';
import MaleSvg from '@assets/img/icon/male.svg';
import SolitourAuthSvg from '@assets/img/user/solitour-auth-intro-image.svg';
import useModalStore from '@store/modalStore';
import useUserStore from '@store/userStore';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: '100%',
    height: 274,
  },
});


const ProfileScreen = () => {

  const userStore = useUserStore();
  const modalStore = useModalStore();

  if (userStore.id == 0) {
    return (
      <View className="w-78 flex flex-col justify-center flex-1 px-[24px] pt-[16px] bg-white">
        <Text className="pb-4 text-4xl font-bold">로그인</Text>
        <View className="h-12">
          <Text className="absolute flex-nowrap max-w-84 font-medium text-gray-500">
            SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요!
          </Text>
        </View>
        <View className="relative w-full h-[269px]">
          <LottieView
            source={require('@assets/lottie/solitour-auth-intro-image.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          <View className="absolute left-1/2 top-[120px] h-[110px] w-[177px] -translate-x-1/2">
            <SolitourAuthSvg width={'100%'} height={'100%'} />
          </View>
        </View>
        <TouchableOpacity
          className="relative mb-3 h-12 w-full flex-row items-center justify-center rounded-3xl bg-[#FEE500]"
          onPress={() => {
            // 카카오 로그인 API 호출
            modalStore.setModal({
              navigate: '카카오 로그인',
              isOpen: true,
            });
          }}>
          <View className="absolute left-4 top-1/2 aspect-square w-4 -translate-y-1/2">
            <KaKaoIconSvg />
          </View>
          <Text className="font-semibold text-black font-pretendard">
            카카오로 로그인
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View className="flex-1 px-[16px] bg-white">
      <Text className="mt-[20px] text-[20px] -left-1 font-semibold">
        내 정보
      </Text>
      <View className="pt-[54px] default-flex">
        {userStore.userImage ? (
          <View className="relative w-[108px] h-[108px] ">
            <SvgUri
              width="108"
              height="108"
              uri={userStore.userImage}
            />
          </View>
        ) : (
          <MaleSvg width={108} height={108} />
        )}
        <View className="pt-[12px] default-flex gap-y-1">
          <Text className="text-black text-[24px] font-semibold">
            {userStore.nickname}님
          </Text>
          <Text className="text-text-3 text-[14px] font-semibold">
            {userStore.email}
          </Text>
        </View>
      </View>
      <View className="pt-[24px]">
        <View className="w-full h-[64px] border-b-[1px] flex flex-row justify-between items-center  border-gray-10">
          <Text className="text-text-1 font-bold font-pretendard">알림</Text>
          <Text className="">{'>'}</Text>
        </View>
        <View className="w-full h-[64px] border-b-[1px] flex flex-row justify-between items-center  border-gray-10">
          <Text className="text-text-1 font-bold font-pretendard">
            연동 계정
          </Text>
          <Text className="">{'>'}</Text>
        </View>
        <View className="w-full h-[64px] border-b-[1px] flex flex-row justify-between items-center  border-gray-10">
          <Text className="text-text-1 font-bold font-pretendard">
            로그아웃
          </Text>
          <Text className="">{'>'}</Text>
        </View>
        <View className="w-full h-[64px] border-b-[1px] flex flex-row justify-between items-center  border-gray-10">
          <Text className="text-text-1 font-bold font-pretendard">앱 버전</Text>
          <Text className="text-text-3"> 버전 5.82 </Text>
        </View>
        <View className="w-full h-[64px] flex items-start justify-center">
          <Text className="text-text-3 text-[14px]"> 회원 탈퇴 </Text>
        </View>
      </View>
    </View>
  );
};
export default ProfileScreen;
