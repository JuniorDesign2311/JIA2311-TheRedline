import React, { useMemo, useRef, useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { db } from '../firebaseConfig';
import { SearchBar } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getDistance } from 'geolib';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    return (
        <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={26}
                color={liked ? "red" : "black"}
            />
        </Pressable>
    );
};

const MapScreen = ({navigation, route}) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => [ '10%', '45%', '90%' ]);
  const [events, setEvents] = useState([]);
  
  //screen dimensions
  const windowW = Dimensions.get('window').width;
  const windowH = Dimensions.get('window').height;
  
  const mapView = React.createRef();
  
  //filtering variables
  const filters = ["Clear Filter", "Title", "Location", "Date"]
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState(0);
  const locBottomSnap = useMemo(() => [ '80%' ]);

  const[visible, setVisible] = useState(false);
  //visibility variables
  const [locVisibility, setLocVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //useEffect makes the function within it only be called only on the first render (the page re-renders if something on the screen changes
  //in other words, the state changes.)
  useEffect(() => {
        //.get() only takes from the database once (whenever useEffect() is called) and the data won't ever be taken again until
        // useEffect() is called again.
        //.onSnapshot() makes it so whenever the database changes, the function will be called and the data will be taken again
        db.collection('events').onSnapshot((querySnapshot) => {
            setEvents(querySnapshot.docs.map(snapshot => { //querySnapshot.docs gives us an array of a reference to all the documents in the snapshot (not the data)
                const data = snapshot.data();  //data object
                data['id'] = snapshot.id;   //adding an id to the data object
                return data;
            }))
        })
    }, []);


  //filters

  //no filter
    const noSearchFilter = (text) => {
        setSearchValue("");
          db.collection('events').onSnapshot((querySnapshot) => {
              setEvents(querySnapshot.docs.map(snapshot => { //querySnapshot.docs gives us an array of a reference to all the documents in the snapshot (not the data)
                  const data = snapshot.data();  //data object
                  return data;
                }))
            })
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
    searchFilterDate(input.toString().substring(0,15));
    hideDatePicker();
  };

  const searchFilterDate = (filterDate) => {
    if (filterDate === "") {
      noSearchFilter();
    } else {
      setSearchValue(filterDate);
      setEvents(events.filter((item) => {
        return new Date(item.date) - new Date(filterDate) >= 0;
      }))
    }
  }

  //Filtering by location
  const pullUpLocationFilter = () => {

  }

  const searchFilterLocation = (location) => {
    setEvents(events.filter((event) => {
      const event_location = {latitude: event.latitude,
                              longitude: event.longitude}
      
      const filtered_location = {latitude: location.geometry.location.lat,
                                  longitude: location.geomoetry.location.lng}
      return geolib.getDistance(event_location,filtered_location) <= 5000
    })) 

  }
 
    const addEvent = () => {
        navigation.navigate("EventCreation");
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: "auto", width: '100%', paddingTop:40, flexDirection: 'row',}}>
                <View style={{flex: 4}}>
                  <SearchBar placeholder="Search for an event..."
                    lightTheme
                    round
                    showCancel
                    inputStyle={{ backgroundColor: '#e6e6e6' }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0, borderRadius: 9 }}
                    inputContainerStyle={{ backgroundColor: '#e6e6e6', borderWidth: 1 }}
                    onChangeText={(text) => {
                        searchFilterTitle(text);
                    }}
                    value={searchValue}
                  />
                </View>
                
                <View style={{flex: 1, paddingEnd: '2%', paddingTop: '2%', backgroundColor: 'white', }}>
                  <SelectDropdown 
                  data={filters}
                  onSelect={(selectedItem, index) => {
                    noSearchFilter();
                    if (index === 1) {
                      setFilterType(1);
                    } else if (index === 3) {
                      setFilterType(3);
                      showDatePicker();
                    } else if (index === 0) {
                      setFilterType(0);
                      noSearchFilter();
                    } else if (index === 2) {
                      setFilterType(2);
                      setLocVisibility(true);
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

                    {/* Bottom sheet for location filter 
                    <BottomSheet
                      visible={false}
                      snapPoints={snapPoints}>
                    </BottomSheet>
                */}

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
                mapPadding={{ top: 0, right: 0, left: 0, bottom: 190 }}>

                {/*show markers*/}
                {events.map((data) => {
                    const eventMarker = {
                      latitude: data["longitude"],
                      longitude: data["latitude"],
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    };
                    
                    return <Marker
                        title={data["title"]}
                        description={data["description"]}
                        coordinate={eventMarker}
                    />
                      
                })}   

          <BottomSheet
            visible = {!visible}
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            style={{paddingBottom: 20}}
          > 
          </BottomSheet>
            </MapView>


            <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                style={{ paddingBottom: 20 }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 0 }}>
                        <TouchableOpacity
                            onPress={addEvent}
                            style={{ paddingTop: '9%', alignSelf: 'flex-start', paddingRight: '2%' }}>
                            <Image source={require('../assets/plusbutton.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

            <ScrollView>
              <View style={styles.container}>
                <View style={styles.allEvents}>
                  {events.map((data) => {
                    <>
                      <Text></Text>
                      <TouchableOpacity style={[styles.eachEvent]} onPress={() => {
                                        const eventMarker = {
                                            latitude: data["longitude"],
                                            longitude: data["latitude"],
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01,
                                        };
                                        mapView.current.animateToRegion(eventMarker, 2000);
                        }}>
                      <View style={styles.eventHeading}>
                        <Text style={styles.eventTitle}>{data["title"]}</Text>
                        <LikeButton></LikeButton>
                      </View>
                        <Text style={styles.events}>Date: {data["date"]}</Text>
                        <Text style={styles.events}>Location: {data["location"]}</Text>
                      </TouchableOpacity>
                    </>
                  })}
                </View>
              </View>
            </ScrollView>
          </BottomSheet>
      </View>

)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
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
    width: Dimensions.get('window').width - 40,
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