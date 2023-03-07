import React, {useState, useEffect, useMemo} from 'react'
import { StyleSheet, ScrollView, View, Text,  Image, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';
import firebase from "firebase/app";
import { db } from '../firebaseConfig';

const ProfileScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('');
    const [events, setEvents] = useState([]);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase.firestore().collection("hosts").doc(user.uid).get().then((snapshot) => {
            console.log(snapshot.data());
            if (snapshot.exists) {
                const userData = snapshot.data();
                setUsername(userData["username"].toString())
            } else {
                firebase.firestore().collection("attendees").doc(user.uid).get().then((snapshot) => {
                    if (snapshot.exists) {
                        const userData = snapshot.data();
                        setUsername(userData["username"].toString())
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

        //console.log(data)
        console.log("events: " + events)
    }, []);

    const onSettingsPressed = () => {
        navigation.navigate("Settings");
    }

    const onShowAllPressed = () => {
        navigation.navigate("Profile")
    }

    return (
        <View>
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
                    <Text style={{paddingTop: '4%', paddingLeft: '4%', fontWeight: 'bold', fontSize: 20, textAlign: 'center',
                        fontFamily: 'Helvetica Neue'}}>My Listed Events</Text>
                    <CustomButton style={{paddingTop: '5%'}}
                        onPress={onShowAllPressed} buttonName="Show All" type="SECONDARY"/>
                </View>
            </View>
        <ScrollView>
    
          <View>
          {events.map((data) => {
            return (data["host"] === username) &&
            <>
              <Text style={styles.eventTitle}>{data["title"]}</Text>
              <Text style={styles.events}>Host: {data["date"]}</Text>
              <Text style={styles.events}>Date: {data["location"]}</Text>
            </>
       

            })}
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
      fontSize: 25,
      textAlign: 'right'
    },
    eventTitle2: {
      fontWeight: 'bold',
      fontSize: 20
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

export default ProfileScreen
