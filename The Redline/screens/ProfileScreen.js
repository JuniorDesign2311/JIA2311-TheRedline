import React, {useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text,  Image, TouchableOpacity} from 'react-native'
import firebase from "firebase/app";
import { db } from '../firebaseConfig';

const ProfileScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('');
    const [events, setEvents] = useState([]);
    const [eventButtonEnabled, setEventButtonEnabled] = useState(false);
    const [likes, setLikes] = useState([]);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase.firestore().collection("hosts").doc(user.uid).get().then((snapshot) => {
            if (snapshot.exists) {
                const userData = snapshot.data();
                setUsername(userData["username"].toString());
                setLikes(snapshot.data()['favorites']);
                setEventButtonEnabled(true);
            } else {
                firebase.firestore().collection("attendees").doc(user.uid).get().then((snapshot) => {
                    if (snapshot.exists) {
                        const userData = snapshot.data();
                        setUsername(userData["username"].toString());
                        setLikes(snapshot.data()['favorites']);
                        setEventButtonEnabled(false);
                    }
                })
            }
        })

        db.collection('events').onSnapshot((querySnapshot) => {
            setEvents(querySnapshot.docs.map(snapshot => { //querySnapshot.docs gives us an array of a reference to all the documents in the snapshot (not the data)
                const data = snapshot.data();  //data object
                data['id'] = snapshot.id;   //adding an id to the data object
                return data;
            }))
        })
    }, [likes]);

    const onSettingsPressed = () => {
        navigation.navigate("Settings");
    }



    const onEditPressed = () => {
        navigation.navigate("EditEvents", {
            dataId: data["id"]
        })
    }

    const addEvent = () => {
        navigation.navigate("EventCreation");
    }


    return (
        <View>
            <ScrollView>
                <View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                        <Text style={{paddingTop: '10%', paddingLeft: '2%', fontWeight: 'bold', fontSize: 35, textAlign: 'left',
                            fontFamily: 'Helvetica Neue'}}> {username} </Text>
                        <TouchableOpacity
                            onPress={onSettingsPressed}
                            style={{ paddingTop: '9%', alignSelf: 'flex-start', paddingRight: '2%'}}
                        >
                        <Image source={require('../assets/settings-icon.png')} />
                        </TouchableOpacity>
                    </View>

                    <Image 
                        style={{alignSelf: 'center'}}
                        source={require('../assets/account-icon.png')} />
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{paddingTop: '5%', paddingLeft: '4%', fontWeight: 'bold', fontSize: 20, textAlign: 'center',
                            fontFamily: 'Helvetica Neue'}}>My Listed Events</Text>
                        <TouchableOpacity
                            enabled={eventButtonEnabled}
                            onPress={addEvent}
                            style={ {opacity: eventButtonEnabled ? 100 : 0, alignSelf: 'flex-start', paddingRight: '5%'} }>
                            <Image source={require('../assets/plusbutton.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.allEvents}>
                        {events.map((data) => {
                            return (data["host"] === username) &&
                            <>
                            <View style={styles.eachEvent}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("EditEvents", {
                                                dataId: data["id"]
                                            })
                                        }}
                                        style={{paddingTop: '2%'}}
                                    >
                                        <View>
                                            <Text style={styles.eventTitle}>{data["title"]}</Text>
                                            <Text style={styles.events}>Date: {data["date"]}</Text>
                                            <Text style={styles.events}>Location: {data["location"]}</Text>
                                        </View>
                                        {/* <Image source={require('../assets/settings-icon.png')} /> */}
                                    </TouchableOpacity>
                                </View> 
                            </View>
                            </>
                        })}
                    </View>
                </View>
                
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{paddingTop: '5%', paddingLeft: '4%', fontWeight: 'bold', fontSize: 20, textAlign: 'center',
                        fontFamily: 'Helvetica Neue'}}>My Favorite Events</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.allEvents}>
                        {events.map((data) => {
                            if (likes.includes(data["id"])) {
                                return (data) &&
                                <>
                                    <View style={styles.eachEvent}>
                                        <Text style={styles.eventTitle}>{data["title"]}</Text>
                                        <Text style={styles.events}>Date: {data["date"]}</Text>
                                        <Text style={styles.events}>Location: {data["location"]}</Text>
                                    </View>
                                </>
                            }
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

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
      fontSize: 18,
      textAlign: 'left'
    },
    eventTitle2: {
      fontWeight: 'bold',
      fontSize: 18
    },
    allEvents: {
      alignItems: 'left',
      width: '90%',
      marginBottom: 20,
      paddingBottom: '2%'
    },
    eachEvent: {
      alignItems: 'left',
      borderWidth: 1,
      width: '100%',
      paddingBottom: '2%',
      borderRadius: '20%',
      paddingLeft: '3%',
      paddingTop: '2%',
      backgroundColor: '#E5E4E2',
      marginTop: '3%'
    }
});

export default ProfileScreen
