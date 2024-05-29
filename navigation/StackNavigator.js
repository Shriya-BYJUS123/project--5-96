import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import Plan from "../screens/Plan";
import ViewPlan from "../screens/ViewPlan";
import AddFriendsActivity from "../screens/AddFriendsActivity";

const Stack = createStackNavigator();
const StackNavigator = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name = "Dashboard" component={DrawerNavigator}/>
            <Stack.Screen name = "Plan" component={Plan}/>
            <Stack.Screen name = "View Plan" component={ViewPlan}/>
            <Stack.Screen name = "AddFriendsActivity" component={AddFriendsActivity}/>
        </Stack.Navigator>
    )
}
export default StackNavigator;