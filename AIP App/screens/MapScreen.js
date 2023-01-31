import React, { useMemo, useRef, useCallback } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import PlusButton from '../components/PlusButton';
import { useNavigation } from '@react-navigation/native';

const MapScreen = ({navigation}) => {

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => [ '20%', '80%' ]);

  const addEvent = () => {
    navigation.navigate("EventCreation");
  }

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} />

      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
      >

        <View style={styles.container}>
          <PlusButton onPress={addEvent} buttonName="+" type="PRIMARY"/>
        </View>
        
      </BottomSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  roundButton1: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'orange',
    }
});

export default MapScreen;