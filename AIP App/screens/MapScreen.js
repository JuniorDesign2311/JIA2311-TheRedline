import React, { useMemo, useRef, useCallback } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const MapScreen = () => {

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => [ '10%', '80%']);


  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} />
    
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
      >

        <View style={styles.container}>
          <Text style={styles.headline}>Events</Text>
        </View>
        
      </BottomSheet>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default MapScreen;