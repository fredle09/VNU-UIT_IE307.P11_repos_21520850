import { Camera } from 'expo-camera';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Dispatch,
  SetStateAction,
} from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

import { Camera as CameraIcon } from '~/lib/icons/Camera';
import { LibraryBig } from '~/lib/icons/LibraryBig';

interface ImageInputProps {
  value: any;
  onChangeText: Dispatch<SetStateAction<any>>;
}

const ImageInput = forwardRef(({ value, onChangeText }: ImageInputProps, ref) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    onChangeText(result.assets[0].uri);
  };

  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    onChangeText(result.assets[0].uri);
  };

  useImperativeHandle(ref, () => ({
    pickImage,
    takePicture,
  }));

  if (hasPermission === null)
    return (
      <View>
        <Text>Requesting for camera permission</Text>
        <Button
          onPress={() => {
            ImagePicker.requestMediaLibraryPermissionsAsync();
            Camera.requestCameraPermissionsAsync();
          }}>
          <Text>Request</Text>
        </Button>
      </View>
    );

  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View className='flex flex-1 items-center justify-center gap-4'>
      {!value ? (
        <View className='aspect-[4/3] w-full flex-1 items-center justify-center bg-zinc-100 dark:bg-zinc-800'>
          <Text className='text-center'>No Image selected</Text>
        </View>
      ) : (
        <View className='relative'>
          <Image source={{ uri: value }} style={styles.image} />
          <Button
            onPress={() => onChangeText('')}
            size='icon'
            variant='destructive'
            className='absolute right-2 top-2'>
            <Text>✕</Text>
          </Button>
        </View>
      )}
      <View className='flex flex-row items-center justify-center gap-4'>
        <Button onPress={pickImage} variant='outline' className='flex flex-row items-center gap-2'>
          <LibraryBig className='-ml-1.5 size-6 text-black dark:text-white' />
          <Text>Pick an image</Text>
        </Button>
        <Button onPress={takePicture} className='flex flex-row items-center gap-2'>
          <CameraIcon className='-ml-1.5 size-6 text-white dark:text-black' />
          <Text>Take a picture</Text>
        </Button>
      </View>
    </View>
  );
});
ImageInput.displayName = 'ImageInput';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
});

export { ImageInput };
