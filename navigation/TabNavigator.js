import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddFriends from "../screens/AddFriends";
import Request from "../screens/Request";

const Tab = createBottomTabNavigator();
const TabNavigator = ()=>{
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name = "Add Friends" component = {AddFriends} />
            <Tab.Screen name = "Request" component={Request}/>
        </Tab.Navigator>
    )
}
export default TabNavigator