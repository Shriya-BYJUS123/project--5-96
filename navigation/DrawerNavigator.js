import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import MyFriends from "../screens/MyFriends";
import CreateActivity from "../screens/CreateActivity";
import Activity from "../screens/Activity";
import Logout from "../screens/Logout";

const Drawer = createDrawerNavigator();
const DrawerNavigator = ()=>{
    return(
        <Drawer.Navigator>
<Drawer.Screen name= "Home" component ={TabNavigator}/>
<Drawer.Screen name= "My Friends" component ={MyFriends}/>
<Drawer.Screen name= "Create Event" component ={CreateActivity}/>
<Drawer.Screen name= "View Event" component ={Activity}/>
<Drawer.Screen name= "Logout" component ={Logout}/>
        </Drawer.Navigator>
    )
}
export default DrawerNavigator

