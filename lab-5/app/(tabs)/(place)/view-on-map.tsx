import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

const MAP_REGION_DEFAULT: Region = {
  latitude: 10.851985339727143,
  longitude: 106.69508635065,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export default function ViewOnMap() {
  const mapRef = useRef<MapView>(null);
  const { lat, long, address } = useLocalSearchParams();
  const [rerender, setRerender] = useState(0);

  const coordinate = {
    latitude: lat ? Number(lat) : MAP_REGION_DEFAULT.latitude,
    longitude: long ? Number(long) : MAP_REGION_DEFAULT.longitude,
  };

  useEffect(() => {
    setRerender((prev) => prev + 1);
  }, []);

  return (
    <View className='flex-1'>
      <MapView
        key={rerender} // Use rerender state to force remount
        ref={mapRef}
        initialRegion={{ ...MAP_REGION_DEFAULT, ...coordinate }}
        style={{ flex: 1 }}>
        <Marker coordinate={coordinate} title={address as string} />
      </MapView>
    </View>
  );
}
