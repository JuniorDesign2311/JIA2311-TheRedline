import React, { useCallback, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetView from 'reanimated-bottom-sheet';

const MapScreen = () => {

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = [ "40%", "10%", "90%" ];

  return (
    <SafeAreaView style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} />

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDowntoClose={true}
        enableDismissOnClose={false}
      >

        <BottomSheetView>
          <Text>Events</Text>
        </BottomSheetView>
        
      </BottomSheet>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;