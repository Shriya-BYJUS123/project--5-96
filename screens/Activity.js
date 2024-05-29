import React from "react";
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { ref, onValue, update, get } from "firebase/database";
import db from "../config";


export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }
componentDidMount(){
    const auth = getAuth();
    const userId = auth.currentUser.uid;


    onValue(ref(db, "/events"), (snapshot) => {
      temp = snapshot.val();


      if (temp) {
        let events = [];
        temp.map((item) => {
          if (item.people.includes(userId)) {
            events.push(item);
          }
        });


        this.setState({ events: events });
      }
    });


}
  renderItem = ({ item }) => {
    return (
      <View
    >
        <Text>
          {item.eventName}
        </Text>


        <View >
          <Button
            onPress={() => {
              this.props.navigation.navigate("Plan", { id: item.id });
            }}
            title="PLAN"
            color='#7A6C5D'
          />
        </View>


        <View >
          <Button
            onPress={() => {
              this.props.navigation.navigate("AddFriendsActivity", {
                id: item.id,
              });
            }}
            title="Add Friends to Activity"
            
          />
        </View>
      </View>
    );
  };


  render() {
    if (this.state.events.length == 0) {
      return (
        <View >
          <Text
           
          >
            No Events!
          </Text>
        </View>
      );
    } else {
      return (
        <View >
          <FlatList data={this.state.events} renderItem={this.renderItem} />
        </View>
      );
    }
  }
}





