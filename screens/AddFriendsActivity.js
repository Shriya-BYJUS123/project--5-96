import React from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { ref, onValue, update, get } from "firebase/database";
import db from "../config";




export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFriends: [],
      eventId: this.props.route.params.id,
      people: [],
      event: "",
    };
  }
  componentDidMount() {
    const auth = getAuth()
    const uid = auth.currentUser.uid
    const { eventId } = this.state
    let people = []
    var dbRef1 = ref(db, 'events')
    onValue(dbRef1, (snapshot) => {
      let temp = snapshot.val()
      if (temp) {
        temp.map((item) => {
          if (item.id == eventId) {
            people = item.people
            this.setState({ event: item, people: people })
          }
        })
        var dbRef2 = ref(db, "users/" + uid)
        onValue(dbRef2, (snapshot) => {
          let temp = snapshot.val().myFriends ? snapshot.val().myFriends : []
          let myFriends = []
          temp.map((key) => {
            if (!people.includes(key)) {
              onValue(ref(db, 'users/' + key), (snapshot) => {
                myFriends.push({
                  key: key,
                  value: snapshot.val()
                })
              })

            }
          })
          this.setState({ myFriends: myFriends })
        })
      }
    })


  }
handleAddFriend=async(friendkey)=>{
const {eventId}=this.state
const auth = getAuth()
const uid = auth.currentUser.uid
const eventSnapshot = await get(ref(db,"events"))
let event;
let eventkey;
eventSnapshot.forEach((item,index)=>{
  const e = item.val()
  if (e.id ==eventId){
    event = e
    eventkey = item.key
  }
})
const dbRef = ref(db,"events/"+eventkey)
const updatedPeople = [...event.people,friendkey]
await update(dbRef,{people:updatedPeople})
this.setState((prevstate)=>({
  people:[...prevstate.people,friendkey]
}))
}
  renderItem = ({ item }) => {
    const { eventId } = this.state;

    return (
      <View style={{marginTop:50}}>
        <Text >
          {item.value.first_name + " " + item.value.last_name}
        </Text>
        <View>
          <Button
            onPress={() => this.handleAddFriend(item.key)}
            title="Add"
            color="#7A6C5D"
          />
        </View>
      </View>
    );
  };

  render() {
    if (this.state.myFriends.length === 0) {
      return (
        <View >
          <Text style={{marginTop:50}}

          >
            Add Friends!
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList data={this.state.myFriends} renderItem={this.renderItem} />
        </View>
      );
    }
  }
}





