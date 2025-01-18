import { Video, ResizeMode } from 'expo-av';
import { View, Image, StyleSheet } from 'react-native';

interface MediaPreviewProps {
  uri: string;
  type: 'photo' | 'video';
  className?: string;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ uri, type, className }) => {
  return (
    <View className={className}>
      {type === 'photo' ? (
        <Image
          style={styles.media}
          source={{ uri }}
          resizeMode='cover'
          accessibilityLabel='Image preview'
        />
      ) : (
        <Video
          style={styles.media}
          source={{ uri }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    width: '100%',
    height: '100%',
  },
});
