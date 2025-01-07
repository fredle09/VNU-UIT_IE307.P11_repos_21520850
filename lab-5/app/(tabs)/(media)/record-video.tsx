import { ResizeMode, Video } from 'expo-av';
import { CameraView, Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from 'expo-router';
import { useState, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Square } from '~/lib/icons/Square';
import { Video as VideoIcon } from '~/lib/icons/Video';
import { cn } from '~/lib/utils';
import { useNotification } from '~/providers/notification-provider';

export default function RecordVideo() {
  const { showNotification } = useNotification();
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      (async () => {
        try {
          const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
          const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
          if (isActive) {
            setHasPermission(cameraStatus === 'granted' && audioStatus === 'granted');
          }
        } catch (error) {
          console.error('Permission error:', error);
        }
      })();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const startRecording = async () => {
    if (isRecording || !cameraRef.current) return;
    setIsRecording(true);
    try {
      const video = await cameraRef.current.recordAsync({ maxDuration: 60 });
      setVideo(video!.uri);
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current || !isRecording) return;
    try {
      cameraRef.current.stopRecording();
    } finally {
      setIsRecording(false);
    }
  };

  const resetRecording = async () => {
    if (!video) return;
    await FileSystem.deleteAsync(video);
    setVideo(null);
  };

  const saveRecording = async () => {
    if (!video) return;
    setIsSaving(true);
    try {
      await MediaLibrary.saveToLibraryAsync(video);
      setVideo(null);
      showNotification('Video Saved!', 'Your video has been successfully saved');
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>No access to camera</Text>
      </View>
    );
  }

  const CameraIcon = isRecording ? Square : VideoIcon;

  return (
    <View className='flex-1 items-center justify-center'>
      {video ? (
        <View className='w-full flex-1 justify-end'>
          <Video
            useNativeControls
            style={styles.video}
            source={{ uri: video }}
            resizeMode={ResizeMode.CONTAIN}
          />
          <View className='flex-row justify-center gap-4 py-4'>
            <Button onPress={resetRecording} variant='outline' disabled={isSaving}>
              <Text>Record Again</Text>
            </Button>

            <Button onPress={saveRecording} disabled={isSaving}>
              <Text>Save</Text>
            </Button>
          </View>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={{ width: '100%', height: '100%' }} mode='video'>
          <Button
            variant={isRecording ? 'destructive' : 'secondary'}
            onPress={isRecording ? stopRecording : startRecording}
            className={cn('absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-row gap-2 p-3')}>
            <CameraIcon className={cn('-ml-2 size-6', isRecording ? 'text-white' : 'text-black')} />
            <Text>{isRecording ? 'Stop' : 'Start Recording'}</Text>
          </Button>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    width: '100%',
  },
});
