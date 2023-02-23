import React, { useMemo, useRef, useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import PlusButton from '../components/PlusButton';
import { db } from '../firebaseConfig';
import { Marker } from "react-native-maps";


const MapScreen = ({navigation, route}) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => [ '10%', '45%', '90%' ]);
  const [events, setEvents] = useState([]);

  //useEffect makes the function within it only be called only on the first render (the page re-renders if something on the screen changes
  //in other words, the state changes.)
  useEffect(() => {

    //.get() only takes from the database once (whenever useEffect() is called) and the data won't ever be taken again until
    // useEffect() is called again.
    //.onSnapshot() makes it so whenever the database changes, the function will be called and the data will be taken again
    db.collection('events').onSnapshot((querySnapshot) => {
      setEvents(querySnapshot.docs.map(snapshot => { //querySnapshot.docs gives us an array of a reference to all the documents in the snapshot (not the data)
          const data = snapshot.data();  //data object
          return data;
      }))
    })
  }, []);


  const addEvent = () => {
    navigation.navigate("EventCreation");
  }

    const atlantaMarker = {
      latitude: 33.7495,
      longitude: -84.3882,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const avalonMarker = {
      latitude: 34.0696,
      longitude: -84.2454,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const georgiaTechMarker = {
        latitude: 33.7758,
        longitude: -84.3962,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  longitude: route?.params?.long ?? -122.43,
                  latitude: route?.params?.lat ??  37.77,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.04,
                }}
                showsUserLocation={route.params.trackLocation}
                followsUserLocation={route.params.trackLocation}

                // initialRegion={tokyoRegion} //your region data goes here.
            >
                <Marker coordinate={atlantaMarker} />
                <Marker coordinate={avalonMarker} />
                <Marker coordinate={georgiaTechMarker} />
            </MapView>

      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        style={{paddingBottom: 20}}
      >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.allEvents}>
        <View style={{paddingHorizontal: 310}}>
      <PlusButton onPress={addEvent} buttonName="+" type="PRIMARY"/>
      </View>

          {events.map((data) => (
            <>
            <Text></Text>
            <TouchableOpacity style={styles.eachEvent}>
              <Text style={styles.eventTitle}>{data["title"]}</Text>
              <Text style={styles.events}>Host: {data["host"]}</Text>
              <Text style={styles.events}>Date: {data["date"]}</Text>
              <Text style={styles.events}>Time: {data["time"]}</Text>
              <Text style={styles.events}>Location: {data["location"]}</Text>
              <Text style={styles.events}>Description: {data["description"]}</Text>
            </TouchableOpacity>
            </>

          ))}
      </View>

      </View>
        </ScrollView>

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
  events: {

  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'right'
  },
  allEvents: {
    alignItems: 'left',
    width: '90%',
    marginBottom: 20

  },
  eachEvent: {
    alignItems: 'left',
    borderWidth: 1,
    width: '100%',
    paddingBottom: '2%',
    borderRadius: '20%',
    paddingLeft: '3%',
    paddingTop: '2%',
    backgroundColor: '#E5E4E2'
  }
});

export default MapScreen;
