import * as Location from 'expo-location';
import { Dispatch, SetStateAction, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { toast } from 'sonner-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

import { Locate } from '~/lib/icons/Locate';
import { MapPin } from '~/lib/icons/MapPin';

type Coordinates = [number, number] | null;

interface CoordinatesInputProps {
  value: Coordinates;
  onChange: Dispatch<SetStateAction<Coordinates>>;
}

const MAP_REGION_DEFAULT: Region = {
  latitude: 10.851985339727143,
  longitude: 106.69508635065,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};

const CoordinatesInput = forwardRef(({ value, onChange }: CoordinatesInputProps, ref) => {
  const mapRef = useRef<MapView>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [mapCenter, setMapCenter] = useState<Coordinates>([
    MAP_REGION_DEFAULT.latitude,
    MAP_REGION_DEFAULT.longitude,
  ]);
  const [address, setAddress] = useState<string | null>(null);

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (!result) throw new Error('Unable to fetch address');
      setAddress(result.formattedAddress);
    } catch {
      setAddress('Unable to fetch address');
    }
  };

  const handleUseCurrentLocation = async () => {
    toast.promise(
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const newCoordinates: Coordinates = [location.coords.latitude, location.coords.longitude];

        onChange(newCoordinates);

        // Reverse geocode the current location
        await reverseGeocode(newCoordinates[0], newCoordinates[1]);

        // Animate the map view to the new location
        mapRef.current?.animateToRegion(
          {
            latitude: newCoordinates[0],
            longitude: newCoordinates[1],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000
        );

        return newCoordinates;
      })(),
      {
        loading: 'Getting current location...',
        success: () => 'Location updated successfully',
        error: (err) => (err instanceof Error ? err.message : 'Unknown error'),
      }
    );
  };

  const handlePickOnMapToggle = () => {
    setIsPicking((prev) => !prev);
    if (isPicking && mapCenter) {
      onChange(mapCenter);
      reverseGeocode(mapCenter[0], mapCenter[1]);
    }
  };

  const handleRegionChange = (region: Region) => {
    if (isPicking) setMapCenter([region.latitude, region.longitude]);
  };

  useImperativeHandle(ref, () => ({
    useCurrentLocation: handleUseCurrentLocation,
    pickOnMap: handlePickOnMapToggle,
  }));

  return (
    <View>
      {(isPicking && mapCenter?.length === 2) || value?.length === 2 ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={MAP_REGION_DEFAULT}
          onRegionChange={handleRegionChange}>
          {value?.length === 2 && (
            <Marker
              coordinate={{ latitude: value[0], longitude: value[1] }}
              title={address ?? 'Selected Location'}
            />
          )}
          {isPicking && mapCenter?.length === 2 && (
            <Marker
              coordinate={{ latitude: mapCenter[0], longitude: mapCenter[1] }}
              pinColor='yellow'
            />
          )}
        </MapView>
      ) : (
        <View className='aspect-[4/3] w-full flex-1 items-center justify-center bg-zinc-100 dark:bg-zinc-800'>
          <Text className='text-center'>No coordinates selected</Text>
        </View>
      )}

      <View className='mt-4 flex flex-row items-center justify-center gap-4'>
        <Button
          onPress={handlePickOnMapToggle}
          variant='outline'
          className='flex flex-row items-center gap-2'>
          <MapPin className='-ml-1.5 size-6 text-black dark:text-white' />
          <Text className='text-black dark:text-white'>
            {isPicking ? 'Finish Picking' : 'Pick on Map'}
          </Text>
        </Button>
        <Button onPressIn={handleUseCurrentLocation} className='flex flex-row items-center gap-2'>
          <Locate className='-ml-1.5 size-6 text-white dark:text-black' />
          <Text className='text-white dark:text-black'>Current Location</Text>
        </Button>
      </View>
    </View>
  );
});
CoordinatesInput.displayName = 'CoordinatesInput';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    aspectRatio: '4/3',
  },
  fullscreenMap: {
    position: 'fixed',
    inset: 0,
  },
});

export { CoordinatesInput };
