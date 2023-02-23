import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from  '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={MapScreen} options={{title: "Map",
                    headerShown: false, gestureEnabled: false}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{title: "Profile",
                    headerShown: true, gestureEnabled: false}}/>
        </Tab.Navigator>

    );
}

export default Tabs;