import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from  '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={MapScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>

    );
}

export default Tabs;