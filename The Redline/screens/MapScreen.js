import React, { useMemo, useRef, useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Pressable, Dimensions, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { db } from '../firebaseConfig';
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/app";
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Slider} from '@miblanchard/react-native-slider';

const LikeButton = ({ event, likes, setLikes }) => {
  return (
    <Pressable onPress={() => likes.includes(event) ? setLikes([...likes.slice(0, likes.indexOf(event)), ...likes.slice(likes.indexOf(event) + 1, likes.length)]) : setLikes(likes => [...likes, event])}>
      <MaterialCommunityIcons
        name={likes.includes(event) ? "heart" : "heart-outline"}
        size={26}
        color={likes.includes(event) ? "red" : "black"}
      />
    </Pressable>
  );
};

const MapScreen = ({ navigation, route }) => {
  const sheetRef = useRef(null);
  const locationSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['10%', '45%', '83%']);
  const [events, setEvents] = useState([]);
  const [likes, setLikes] = useState([]);
  const [databaseEvents, setDatabaseEvents] = useState([]);
  const [activeMarkerRef, setActiveMarkerRef] = useState([null]);

  //screen dimensions
  const windowW = Dimensions.get('window').width;
  const windowH = Dimensions.get('window').height;

  const mapView = React.createRef();
  const markerRef = useRef();

  //filtering variables
  const filters = ["Clear Filter", "Location", "Date"]
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState(0);
  const [locBottomSnap, setLocBottomSnap] = useState(['50%']);
  const [locationFilterDistance, setLocationFilterDistance] = useState(0);

  //visibility variables
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const geolib = require('geolib');
  
  //useEffect makes the function within it only be called only on the first render (the page re-renders if something on the screen changes
  //in other words, the state changes.)
  useEffect(() => {
    const user = firebase.auth().currentUser;

    firebase.firestore().collection("hosts").doc(user.uid).get().then((snapshot) => {
      if (snapshot.exists) {
        setLikes(snapshot.data()['favorites']);
      } else {
        firebase.firestore().collection("attendees").doc(user.uid).get().then((snapshot) => {
          if (snapshot.exists) {
            setLikes(snapshot.data()['favorites']);
          }
        })
      }
    })
    //.get() only takes from the database once (whenever useEffect() is called) and the data won't ever be taken again until
    // useEffect() is called again.
    //.onSnapshot() makes it so whenever the database changes, the function will be called and the data will be taken again
    db.collection('events').onSnapshot((querySnapshot) => {
      setDatabaseEvents(querySnapshot.docs.map(snapshot => { //querySnapshot.docs gives us an array of a reference to all the documents in the snapshot (not the data)
        const data = snapshot.data();  //data object
        data['id'] = snapshot.id;   //adding an id to the data object
        return data;
      }))

      setEvents(querySnapshot.docs.map(snapshot => { //querySnapshot.docs gives us an array of a reference to all the documents in the snapshot (not the data)
        const data = snapshot.data();  //data object
        data['id'] = snapshot.id;   //adding an id to the data object
        return data;
      }))
    })
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    firebase.firestore().collection("hosts").doc(user.uid).get().then((snapshot) => {
      if (snapshot.exists) {
        firebase.firestore().collection("hosts").doc(user.uid).update({
          favorites: likes
        });
      } else {
        firebase.firestore().collection("attendees").doc(user.uid).get().then((snapshot) => {
          if (snapshot.exists) {
            firebase.firestore().collection("attendees").doc(user.uid).update({
              favorites: likes
            });
          }
        })
      }
    })
  }, [likes])

  //filters

  //no filter
  const noSearchFilter = (text) => {
    setSearchValue("");
    setEvents(databaseEvents);
  }

  //Filtering By Title
  const searchFilterTitle = (text) => {
    if (text == "") {
      noSearchFilter()
      return events;
    } else {
      setSearchValue(text);
      setEvents(events.filter((item) => {
        const item_data = `${item.title.toUpperCase()})`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      }))
    }
  }

  //Filtering By Date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (input) => {
    console.log("A date has been picked: ", input); // date will be in format: YYYY-MM-DDTXX:XX:XX.XXXZ
    searchFilterDate(input.toString().substring(0, 15));
    hideDatePicker();
  };

  const searchFilterDate = (filterDate) => {
    if (filterDate === "") {
      noSearchFilter();
    } else {
      setEvents(events.filter((item) => {
        return new Date(item.date) - new Date(filterDate) >= 0;
      }))
    }
  }

  //Filtering by location

 
  const openLocationSheet = () => {
    locationSheetRef.current.snapToIndex(0);
  }

  const closeLocationSheet = () => {
    locationSheetRef.current.close()
    filterLocationBasedOnCurrent(locationFilterDistance)
  }

  const onCancelLocation = () => {
    closeLocationSheet();
    noSearchFilter();
  }
  const searchFilterLocation = (location) => {
    setEvents(events.filter((event) => {
      const event_location = {
        latitude: event.latitude,
        longitude: event.longitude
      }

      const filtered_location = {
        latitude: location.geometry.location.lat,
        longitude: location.geomoetry.location.lng
      }
  

      return geolib.getDistance(event_location, filtered_location)/1609 <= 5000
    }))
  }

  const filterLocationBasedOnCurrent = (distance) => {
    const current_location = {
      latitude: route.params.lat,
      longitude: route.params.long
    }

    setEvents(events.filter((event) => {
      const event_location = {
        latitude: event.latitude,
        longitude: event.longitude
      }
      return geolib.getDistance(event_location, current_location)/1609 <= distance

    }))
  };


  const addEvent = () => {
    navigation.navigate("EventCreation");
  }


  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: windowW, paddingTop: windowH * 0.05, flexDirection: 'row' }}>
        <View style={{ flex: 4 }}>
          <SearchBar placeholder="Search for an event..."
            lightTheme
            round
            showCancel
            inputStyle={{ backgroundColor: '#e6e6e6' }}
            containerStyle={{ backgroundColor: 'white', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
            inputContainerStyle={{ backgroundColor: '#e6e6e6', height: windowH * 0.04 }}
            onChangeText={(text) => {
              searchFilterTitle(text);
            }}
            value={searchValue}
          />
        </View>

        <View style={{ flex: 1, paddingEnd: '2%', paddingTop: '0%', backgroundColor: 'white', }}>
          <SelectDropdown
            data={filters}
            onSelect={(selectedItem, index) => {
              noSearchFilter();
              if (index === 2) {
                setFilterType(2);
                showDatePicker();
              } else if (index === 0) {
                setFilterType(0);
                noSearchFilter();
              } else if (index === 1) {
                setFilterType(1);
                openLocationSheet();
              }
            }}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            display='inline'
            minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>

      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          longitude: route?.params?.long ?? -122.43,
          latitude: route?.params?.lat ?? 37.77,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsUserLocation={route.params.trackLocation}
        followsUserLocation={route.params.trackLocation}
        showsMyLocationButton={true}
        mapPadding={{ top: 0, right: 0, left: 0, bottom: 190 }}
        onPress={() => setActiveMarkerRef(markerRef)}
      >

        {/*show markers*/}
        {events.map((data) => {
          const eventMarker = {
            longitude: data["longitude"],
            latitude: data["latitude"],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };

          return (
              <Marker
                coordinate={eventMarker}
                ref={markerRef}
                pinColor={activeMarkerRef == null ? 'gold' : 'tomato'}
                onPress={(e) => {
                    e.stopPropagation();
                    setActiveMarkerRef(null)
                  }
                }
              >
              <Callout>
                <View style={{ height: "100%", width: 263 }}>
                  <Text style={styles.eventTitle2}>
                    {data["title"]}
                  </Text>
                  <Text> {
                    "\nHost: " + data["host"] +
                    "\nDate: " + data["date"] +
                    "\nTime: " + data["time"] +
                    "\nLocation: " + data["location"] +
                    "\nDescription: " + data["description"]
                  } </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        style={{ paddingBottom: 20 }}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.allEvents}>
              {events.map((data) => (
                <>
                  <Text></Text>
                  <TouchableOpacity style={[styles.eachEvent]} onPress={() => {
                    const eventMarker = {
                      longitude: data["longitude"],
                      latitude: data["latitude"],
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    };
                    mapView.current.animateToRegion(eventMarker, 2000);
                  }}>
                    <View style={styles.eventHeading}>
                      <Text style={styles.eventTitle}>{data["title"]}</Text>
                      <LikeButton event={data["id"]} likes={likes} setLikes={setLikes}></LikeButton>
                    </View>
                    <Text style={styles.events}>Date: {data["date"]}</Text>
                    <Text style={styles.events}>Location: {data["location"]}</Text>
                  </TouchableOpacity>
                </>
              ))}
            </View>
          </View>
        </ScrollView>
      </BottomSheet>

      {/* Bottom sheet for location filter */}
      <BottomSheet
        ref={locationSheetRef}
        snapPoints={locBottomSnap}
        index={-1}>
        <View>
          
          <View style={{paddingLeft: "3%", paddingBottom: "5%", paddingTop: "5%"}}> 
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Location Filter </Text>
          </View> 

          <View style={{paddingLeft: "3%", paddingTop: "5%"}}> 
            <Text> Distance From Current Location </Text>
          </View>

          <View style={styles.locationScroll}>
           
            <Slider
            maximumValue = {50}
            value={locationFilterDistance}
            onValueChange={value => setLocationFilterDistance(value)}
            />
              
            <Text> {locationFilterDistance} miles </Text>
         
          </View>
          
          <View style={{paddingTop: "20%"}}>
            <Button
            title = 'Save'
            color='blue'
            onPress={closeLocationSheet}/>
          </View>

          <View style={{paddingTop: "0%"}}>
            <Button
            title = 'Cancel'
            color='blue'
            onPress={onCancelLocation}/>
          </View>
            
        </View>
      </BottomSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  map: {
    width: '100%',
    height: '100%',
  },
  events: {

  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  allEvents: {
    alignItems: 'left',
    width: '90%',
    marginBottom: 20
  },
  eachEvent: {
    borderWidth: 1,
    width: '100%',
    paddingBottom: '2%',
    borderRadius: '20%',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    backgroundColor: '#E5E4E2'
  },
  eventHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationScroll: {
    width: '80%',
    color: 'red',
    paddingLeft: '20%',
    paddingTop: '3%'
  }

});

export default MapScreen;
