import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { ref, onValue, update, get } from "firebase/database";
import db from "../config";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      myName: "",
      eventName: "",
      uid: null,
    };
  }


  componentDidMount(){
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    let myName;
    let events = [];


    //Reading all the events from database
    onValue(ref(db, "events"), async (snapshot) => {
      events = (await snapshot.val()) ? snapshot.val() : [];


      this.setState({ events: events });
    });


    //Reading users name
    onValue(ref(db, "users/" + uid), async (snapshot) => {
      myName =
        (await snapshot.val().first_name) + " " + snapshot.val().last_name;
      this.setState({
        myName: myName,
        uid: uid,
      });
    });

  }
createEvent =async(eventName)=>{
const {uid, myName, events}=this.state
let event ={
    creator_id:uid,
    creator_name:myName,
    people:[uid],
    plans:"",
    eventName:eventName,
    id:Math.random().toString(36).slice(2)
}
update(ref(db,'/'),{
    events:[...events,event]
})
Alert.alert('Event Created Successfully!')
this.setState({
    eventName:""
})
}

  render() {
    const { eventName } = this.state;
    return (
      <View >
        <Text style={styles.heading}>Create Your Event Here</Text>
        <TextInput
          placeholder="Enter Event Name"
          onChangeText={(text) => this.setState({ eventName: text })}
          value={this.state.eventName}
        style={styles.input}/>
        <TouchableOpacity onPress={() => this.createEvent(eventName)} style = {styles.button}>
          <Text style = {styles.text}>Create Event</Text>
        </TouchableOpacity >
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 50,
    width: 250,
    alignSelf: "center",
    marginTop: 40,
    fontSize: 25,
    height: 50
},
button: {
    backgroundColor: "pink",
    width: 250,
    alignSelf: "center",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 20
},
text: {
  fontSize: 25,
  alignSelf: "center"
},
heading: {
  fontSize: 35,
  alignSelf: "center",
  marginTop: 60
},
})







