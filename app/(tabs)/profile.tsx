import { icons } from '@/constants/icons';
import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Profile() {
  return (
    <View className='bg-primary flex-1 p-1'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image source={icons.person} className="size-10"  tintColor="#fff"/>
        <Text className='text-gray-500 text-base'>Profile</Text>
      </View>
     </View>
  );
}
