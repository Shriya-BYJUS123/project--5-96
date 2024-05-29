import React from "react"
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native"
import { getAuth } from "firebase/auth"
import { ref, onValue, update, get } from "firebase/database"
import db from "../config"

export default class Request extends React.Component {
    constructor() {
        super()
        this.state = {
            myRequests: []
        }
    }
    fetchRequests = () => {
        const auth = getAuth()
        const userId = auth.currentUser.uid

        onValue(ref(db, "users/" + userId), (snapshot) => {
            let myRequests = snapshot.val().requests ? snapshot.val().requests : []
            let users = []

            if (myRequests) {
                myRequests.map((key) => {
                    onValue(ref(db, "users/" + key), (snapshot) => {

                        users.push({
                            key: key,
                            value: snapshot.val()
                        })
                    })
                })
                this.setState({ myRequests: users })
            }
            else {
                this.setState({ myRequests: [] })
            }
        })
    }
    componentDidMount() {
        this.fetchRequests();
    }
    renderItem = ({ item }) => {
        return (
            <View>
                <Text style={styles.text}>{item.value.first_name + " " + item.value.last_name}</Text>
                <Button title="Accept" onPress={() => {
                    const auth = getAuth();
                    const uid = auth.currentUser.uid;
                    const dbRef1 = ref(db, "/users/" + uid);
                    const dbRef2 = ref(db, "/users/" + item.key);


                    var myRequests = []
                    var sentRequests = []
                    var myFriends1 = []
                    var myFriends2 = []
                    get(dbRef1, (snapshot) => {
                        myRequests = snapshot.val().requests
                    })
                    get(dbRef2, (snapshot) => {
                        sentRequests = snapshot.val().sentRequests
                    })
                    onValue(dbRef1, (snapshot) => {
                        myFriends1 = snapshot.val().myFriends
                    })
                    onValue(dbRef2, (snapshot) => {
                        myFriends2 = snapshot.val().myFriends
                    })
                    myRequests = myRequests.filter(item => item !== item.key);
                    sentRequests = sentRequests.filter(item => item !== uid);

                    update(dbRef1, {
                        requests: myRequests.length != 0 ? [...myRequests] : "",
                        myFriends: [...myFriends1, item.key],
                    })

                    update(dbRef2, {
                        sentRequests: sentRequests.length != 0 ? [...sentRequests] : 0,
                        myFriends: [...myFriends2, uid]
                    })

                }}></Button>
            </View>
        )
    }
    render() {

        if (this.state.myRequests.length == 0) {
            return (
                <View style={{ alignSelf: "center", marginTop: 100 }}>
                    <Text style={styles.text}>No Friend Requests!</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList data={this.state.myRequests}
                    renderItem={this.renderItem} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        alignSelf: "center"
    },
    
})