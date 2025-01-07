import * as Location from 'expo-location';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { toast } from 'sonner-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

import { Locate } from '~/lib/icons/Locate';
import { MapPin } from '~/lib/icons/MapPin';
import { MapPinCheckInside } from '~/lib/icons/MapPinCheckInside';
import { Maximize } from '~/lib/icons/Maximize';
import { Minimize } from '~/lib/icons/Minimize';

type TCoordinates = [number, number];
type TAddress = string;
type TLocateValueProps = {
  coordinates: TCoordinates;
  address: TAddress;
};

interface LocateInputProps {
  value: TLocateValueProps | null;
  onChange: Dispatch<SetStateAction<TLocateValueProps | null>>;
  disabled?: boolean;
  scrollViewRef?: RefObject<ScrollView>;
}

const MAP_REGION_DEFAULT: Region = {
  latitude: 10.851985339727143,
  longitude: 106.69508635065,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};

const LocateInput = forwardRef(
  ({ value, onChange, disabled = false, scrollViewRef }: LocateInputProps, ref) => {
    const mapRef = useRef<MapView>(null);
    const mapContainerRef = useRef<View>(null);
    const [isPicking, setIsPicking] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mapCenter, setMapCenter] = useState<TCoordinates>([
      MAP_REGION_DEFAULT.latitude,
      MAP_REGION_DEFAULT.longitude,
    ]);

    const onChangeCoords = useCallback(async (coords: { latitude: number; longitude: number }) => {
      const newCoordinates: TCoordinates = [coords.latitude, coords.longitude];
      setMapCenter(newCoordinates);
      onChange({ coordinates: newCoordinates, address: 'Unknown address' });
      const [result] = await Location.reverseGeocodeAsync(coords);
      if (!result) return;
      onChange({ coordinates: newCoordinates, address: result.formattedAddress ?? '' });
    }, []);

    const handleUseCurrentLocation = useCallback(async () => {
      toast.promise(
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') throw new Error('Permission to access location was denied');
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          await onChangeCoords(location.coords);
          mapRef.current?.animateToRegion(
            {
              ...location.coords,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000
          );
        })(),
        {
          loading: 'Getting current location...',
          success: () => 'Location updated successfully',
          error: (err) => (err instanceof Error ? err.message : 'Unknown error'),
        }
      );
    }, [onChangeCoords, mapRef]);

    const handlePickOnMapToggle = useCallback(() => {
      setIsPicking((prev) => !prev);
      if (!isPicking || !mapCenter) return;
      onChangeCoords({ latitude: mapCenter[0], longitude: mapCenter[1] });
    }, [setIsPicking, isPicking, mapCenter, onChangeCoords]);

    const handleRegionChange = useCallback(
      (region: Region) => {
        if (isPicking) setMapCenter([region.latitude, region.longitude]);
      },
      [isPicking, setMapCenter]
    );

    useImperativeHandle(ref, () => ({
      useCurrentLocation: handleUseCurrentLocation,
      pickOnMap: handlePickOnMapToggle,
    }));

    const MapIcon = isPicking ? MapPinCheckInside : MapPin;
    const ScreenIcon = isFullscreen ? Minimize : Maximize;

    return (
      <View className='relative' ref={mapContainerRef}>
        {(isPicking && mapCenter?.length === 2) || value?.coordinates?.length === 2 ? (
          <MapView
            ref={mapRef}
            style={[styles.map, isFullscreen && styles.fullscreen]}
            initialRegion={MAP_REGION_DEFAULT}
            onRegionChange={handleRegionChange}>
            {value?.coordinates?.length === 2 && (
              <Marker
                coordinate={{ latitude: value.coordinates[0], longitude: value.coordinates[1] }}
                title={value.address ?? 'Selected Location'}
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

        <Button
          className='absolute right-2 top-2'
          onPress={() =>
            setIsFullscreen((prev) => {
              const newValue = !prev;
              if (newValue) {
                // TODO: change to dynamic value
                scrollViewRef?.current?.scrollTo({ y: 450 });
              }
              return newValue;
            })
          }
          size='icon'
          variant='secondary'>
          <ScreenIcon className='size-6 text-black dark:text-white' />
        </Button>

        <View className='mt-4 flex flex-row items-center justify-center gap-4'>
          <Button
            onPress={handlePickOnMapToggle}
            variant='outline'
            className='flex flex-row items-center gap-2'
            disabled={disabled}>
            <MapIcon className='-ml-1.5 size-6 text-black dark:text-white' />
            <Text className='text-black dark:text-white'>
              {isPicking ? 'Finish Picking' : 'Pick on Map'}
            </Text>
          </Button>
          <Button
            onPressIn={handleUseCurrentLocation}
            className='flex flex-row items-center gap-2'
            disabled={disabled}>
            <Locate className='-ml-1.5 size-6 text-white dark:text-black' />
            <Text className='text-white dark:text-black'>Current Location</Text>
          </Button>
        </View>
      </View>
    );
  }
);
LocateInput.displayName = 'CoordinatesInput';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    aspectRatio: '4/3',
  },
  fullscreen: {
    aspectRatio: '2/3',
  },
});

export { LocateInput as CoordinatesInput };
