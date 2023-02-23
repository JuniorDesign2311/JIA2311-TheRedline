import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from  '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

//screen names
const mapName = 'Map';
const profileName = 'Profile';

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName={mapName}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === mapName) {
                        iconName = focused ? "map" : "map-outline"
                    } else {
                        iconName = focused ? "person" : "person-outline"
                    }
                
                return <Ionicons name={iconName} size={size} color={color}/>

            },
                tabBarStyle: {
                    backgroundColor: 'black',
                    headerShown: false    
                }
        })}>

            <Tab.Screen name={mapName} component={MapScreen} options={{headerShown: false}}/>
            <Tab.Screen name={profileName} component={ProfileScreen} options={{headerShown: false}}/>
        </Tab.Navigator>

    );
}

export default Tabs;