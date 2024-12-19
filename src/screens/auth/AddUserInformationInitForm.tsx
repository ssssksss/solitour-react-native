'use client';

import Image from 'next/image'; // React Native에서 이미지는 `Image` 대신 `ImageBackground` 등을 사용
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Linking, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface IAddUserInformationInitForm {
  handleSubmit: (isAgree: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHomeButtonClick: () => void;
}

const AddUserInformationInitForm = ({
  handleSubmit,
  handleInputChange,
  handleHomeButtonClick,
}: IAddUserInformationInitForm) => {
  const formContext = useFormContext();

  return (
    <View className="flex-1 items-center justify-center bg-white p-8">
      <View className="max-w-[50rem] w-full bg-white p-8 rounded-xl shadow-lg">
        {/* Home Button */}
        <TouchableOpacity
          className="absolute top-4 left-4 p-2"
          onPress={handleHomeButtonClick}>
          <Image
            source={require('/home/home-icon.svg')} // React Native에서 사용 시 이미지는 이와 같이 로컬 파일로 로드
            style={{width: 24, height: 24}}
            alt="home-icon"
          />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-black">
          안녕하세요 솔리투어입니다
        </Text>
        <Text className="mt-2 text-center text-gray-600">
          신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요
        </Text>

        <View className="mt-6 bg-gray-100 p-6 rounded-xl">
          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-black">이름</Text>
            <Controller
              control={formContext.control}
              name="name"
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={{
                    height: 48,
                    borderRadius: 16,
                    borderWidth: 1,
                    paddingHorizontal: 12,
                    marginTop: 12,
                    borderColor: '#ccc',
                    textAlign: 'center',
                  }}
                  placeholder="이름을 입력해주세요"
                  maxLength={10}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          {/* Sex Buttons */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-black">성별</Text>
            <View className="flex-row mt-3 space-x-3">
              <TouchableOpacity
                className={`flex-1 p-4 rounded-xl border ${
                  formContext.getValues('sex') === 'male'
                    ? 'bg-green-200 text-main'
                    : 'bg-white text-gray-500'
                }`}
                onPress={() => {
                  formContext.setValue('sex', 'male');
                  formContext.trigger();
                }}>
                <Text className="text-center">남성</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 p-4 rounded-xl border ${
                  formContext.getValues('sex') === 'female'
                    ? 'bg-green-200 text-main'
                    : 'bg-white text-gray-500'
                }`}
                onPress={() => {
                  formContext.setValue('sex', 'female');
                  formContext.trigger();
                }}>
                <Text className="text-center">여성</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Year Input */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-black">
              연도(나이)
              <Text className="text-gray-400">
                {' '}
                {new Date().getFullYear() - 58} ~{' '}
                {new Date().getFullYear() - 19}
              </Text>
            </Text>
            <Text className="text-gray-400">
              현재는 {new Date().getFullYear() - 58} ~{' '}
              {new Date().getFullYear() - 19}년생만 모임 서비스를 이용할 수
              있습니다.
            </Text>

            <TextInput
              style={{
                height: 48,
                borderRadius: 16,
                borderWidth: 1,
                paddingHorizontal: 12,
                marginTop: 12,
                borderColor: '#ccc',
                textAlign: 'center',
              }}
              placeholder="YYYY"
              maxLength={4}
              value={formContext.getValues('year')}
              onChangeText={handleInputChange}
            />
          </View>
        </View>

        <Text className="mt-4 text-sm text-center text-gray-600">
          정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
          제한될 수 있습니다.
        </Text>

        {/* Checkbox for Terms */}
        <View className="flex-row items-center mt-4">
          <TouchableOpacity
            onPress={() => {
              formContext.setValue(
                'isCheckTerm',
                !formContext.getValues('isCheckTerm'),
              );
              formContext.trigger();
            }}>
            <View
              className={`w-6 h-6 border rounded-full ${
                formContext.getValues('isCheckTerm')
                  ? 'bg-blue-500'
                  : 'bg-white'
              }`}
            />
          </TouchableOpacity>
          <Text className="ml-2">[필수] 솔리투어 이용약관</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('/support?menu=terms#terms-of-service')
            }
            className="ml-auto">
            <Text className="text-blue-500">보기</Text>
          </TouchableOpacity>
        </View>

        {/* Checkbox for Privacy */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => {
              formContext.setValue(
                'isCheckPrivacy',
                !formContext.getValues('isCheckPrivacy'),
              );
              formContext.trigger();
            }}>
            <View
              className={`w-6 h-6 border rounded-full ${
                formContext.getValues('isCheckPrivacy')
                  ? 'bg-blue-500'
                  : 'bg-white'
              }`}
            />
          </TouchableOpacity>
          <Text className="ml-2">[필수] 솔리투어 개인정보 처리방침</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('/support?menu=terms#privacy-policy')
            }
            className="ml-auto">
            <Text className="text-blue-500">보기</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Buttons */}
        <TouchableOpacity
          onPress={() => handleSubmit(true)}
          disabled={
            !formContext.formState.isValid ||
            !formContext.getValues('isCheckTerm') ||
            !formContext.getValues('isCheckPrivacy')
          }
          style={{
            marginTop: 16,
            paddingVertical: 16,
            backgroundColor:
              formContext.formState.isValid &&
              formContext.getValues('isCheckTerm') &&
              formContext.getValues('isCheckPrivacy')
                ? '#4CAF50'
                : '#ccc',
            borderRadius: 16,
          }}>
          <Text className="text-white text-center">추가 정보 제출</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSubmit(false)}
          disabled={
            !formContext.getValues('isCheckTerm') ||
            !formContext.getValues('isCheckPrivacy')
          }
          style={{
            marginTop: 16,
            paddingVertical: 16,
            backgroundColor:
              formContext.getValues('isCheckTerm') &&
              formContext.getValues('isCheckPrivacy')
                ? '#4CAF50'
                : '#ccc',
            borderRadius: 16,
          }}>
          <Text className="text-white text-center">나중에 등록하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUserInformationInitForm;
