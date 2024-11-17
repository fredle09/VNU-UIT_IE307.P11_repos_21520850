import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Aperture } from "@/lib/icons";
import { Button } from '@/components/ui/button';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useFocusEffect(
    useCallback(() => {
      setIsCameraVisible(true);
      return () => {
        setIsCameraVisible(false);
      };
    }, [])
  );

  const handleBarCodeScanned = useCallback(({ type, data }: any) => {
    if (isScanning) {
      setScannedData(data);
      setIsScanning(false);
      // Handle the scanned QR code data here
      console.log(`Scanned QR code with data: ${data}`);
    }
  }, [isScanning]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className='flex flex-1'>
        <View className='flex flex-1 justify-center'>
          <Text className='text-center pb-10'>We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>
            <Text>Grant permission</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const resetScanner = () => {
    setIsScanning(true);
    setScannedData(null);
  };

  return (
    <SafeAreaView className='flex flex-1'>
      {isCameraVisible && (
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
          barcodeScannerSettings={{
            // Enable QR code scanning
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        >
          {/* QR Scanner Overlay */}
          <View className="absolute inset-0 flex items-center justify-center">
            <View className="w-64 h-64 border-2 border-white rounded-lg">
              <View className="absolute inset-0 flex items-center justify-center">
                <Aperture className="size-8 text-white opacity-50" />
              </View>
            </View>
            <Text className="text-white text-center mt-4">
              {!scannedData ? "Position QR code within the frame" : ""}
            </Text>
          </View>
        </CameraView>
      )}

      {/* Bottom Controls */}
      <View className="absolute bottom-32 inset-x-0">
        {scannedData && (
          <Button
            variant="ghost"
            onPress={resetScanner}
            className="mx-auto bg-white/20 backdrop-blur-sm"
          >
            <Text className="text-white">Tap to scan again</Text>
          </Button>
        )}
      </View>

      {/* Scanned Data Display */}
      {scannedData && (
        <View className="absolute bottom-64 inset-x-0 px-4">
          <View className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <Text className="text-white text-center">
              Scanned QR Code: {scannedData}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}