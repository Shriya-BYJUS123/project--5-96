import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { ref, onValue, update, get } from "firebase/database";
import db from "../config";


export default class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: "time",
      show: false,
      venue: "",
      time: new Date(),
      myFriends: "",
      plans: "",
      eventId: this.props.route.params.id,
      myName: "",
    };
  }
componentDidMount(){
    const auth = getAuth()
    const uid = auth.currentUser.uid
    onValue(ref(db,"users/"+uid),(snapshot)=>{
        this.setState({
            myName:snapshot.val().first_name+" "+snapshot.val().last_name+" "
        })
    })

}
onChangeDate=(event,obj)=>{
    this.setState({date:obj,show:false})
}
onChangeTime =(event,obj)=>{
    this.setState({time:obj,show:false})
}
addPlan=(date,time,venue)=>{
const {eventId,myName}=this.state
const auth =getAuth()
const uid=auth.currentUser.uid
let temp ={
    date:date.toDateString(),
    time:time.toTimeString(),
    venue:venue,
    creator_id:uid,
    creator_name:myName,
    votes:""
}
const dbRef1=ref(db,"events")
var plans,key;
onValue(dbRef1,(snapshot)=>{
    var events = snapshot.val()
    events.map((item,index)=>{
        if(item.id==eventId){
key=index
plans=snapshot.val()[key].plans?snapshot.val()[key].plans:[]
        }
    })
})
update(ref(db,"events/"+key),{
    plans:[...plans,temp]
    
})
Alert.alert("Plan Added Successfully!")

}
  render() {
    const { mode, show, date, time, venue } = this.state;


    return (
      <View >
        <View >
          <Text>PLAN</Text>
        </View>


        <View>
          <TextInput
            value={venue}
           
            placeholder="Enter venue"
            onChangeText={(text) => {
              this.setState({ venue: text });
            }}
          />


          <View >
            <TextInput value={date.toDateString()}  />
            <TouchableOpacity
             
              onPress={() =>
                this.setState({
                  show: true,
                  mode: "date",
                })
              }
            >
              <Text>Select Date</Text>
            </TouchableOpacity>
          </View>


          <View >
            <TextInput value={time.toTimeString()} />
            <TouchableOpacity
           
              onPress={() =>
                this.setState({
                  show: true,
                  mode: "time",
                })
              }
            >
              <Text >Select Time</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity
           
            onPress={() => this.addPlan(date, time, venue)}
          >
            <Text >Add Plan</Text>
          </TouchableOpacity>


          <TouchableOpacity
         
            onPress={() =>
              this.props.navigation.navigate("ViewPlans", {
                id: this.state.eventId,
              })
            }
          >
            <Text >View Plans</Text>
          </TouchableOpacity>


          {show && mode == "time" ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={this.onChangeTime}
            />
          ) : undefined}


          {show && mode == "date" ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={this.onChangeDate}
            />
          ) : undefined}
        </View>
      </View>
    );
  }
}






