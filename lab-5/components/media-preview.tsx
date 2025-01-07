import { Video, ResizeMode } from 'expo-av';
// import React, { useState } from 'react';
import {
  View,
  Image,
  //  Text,
  //  Dimensions
  StyleSheet,
} from 'react-native';

interface MediaPreviewProps {
  uri: string;
  type: 'photo' | 'video';
  className?: string;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ uri, type, className }) => {
  // const [error, setError] = useState<string | null>(null);

  // const handleError = (e: any) => {
  //   console.error('Error loading media:', e);
  //   setError('Failed to load media');
  // };

  return (
    <View className={className}>
      {type === 'photo' ? (
        <Image
          style={styles.media}
          source={{ uri }}
          resizeMode='cover'
          accessibilityLabel='Image preview'
          // onError={handleError}
        />
      ) : (
        <Video
          style={styles.media}
          source={{ uri }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          // onError={handleError}
        />
      )}
      {/* <View style={[styles.badge, type === 'video' ? styles.videoBadge : styles.imageBadge]}>
        <Text style={styles.badgeText}>{type.toUpperCase()}</Text>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   width,
  //   height: width,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f0f0f0',
  // },
  media: {
    width: '100%',
    height: '100%',
  },
  // badge: {
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  //   paddingHorizontal: 8,
  //   paddingVertical: 4,
  //   borderRadius: 4,
  // },
  // videoBadge: {
  //   backgroundColor: 'rgba(255, 0, 0, 0.7)',
  // },
  // imageBadge: {
  //   backgroundColor: 'rgba(0, 128, 0, 0.7)',
  // },
  // badgeText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  // errorContainer: {
  //   position: 'absolute',
  //   bottom: 10,
  //   left: 10,
  //   right: 10,
  //   backgroundColor: 'rgba(255, 0, 0, 0.7)',
  //   padding: 8,
  //   borderRadius: 4,
  // },
  // errorText: {
  //   color: 'white',
  //   textAlign: 'center',
  // },
});
