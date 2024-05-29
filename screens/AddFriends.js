import React, { useId } from "react"
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Button } from "react-native"
import { getAuth } from "firebase/auth"
import { ref, onValue, update } from "firebase/database"
import db from "../config"
import { snapshotEqual } from "firebase/firestore"


export default class AddFriends extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            myFriends: [],
            myRequests: [],
            sentRequests: [],
            uid: ""
        }
    }
    fetchAllUsers = () => {
        const auth = getAuth()
        const userId = auth.currentUser.uid

        onValue(ref(db, "users/" + userId), (snapshot) => {
            let myFriends = snapshot.val().myFriends ? snapshot.val().myFriends : []
            let myRequests = snapshot.val().requests ? snapshot.val().requests : []
            let sentRequests = snapshot.val().sentRequests ? snapshot.val().sentRequests : []
            this.setState({ myRequests: myRequests, myFriends: myFriends, sentRequests: sentRequests, uid: userId })
            onValue(ref(db, "users"), (snapshot) => {
                let users = []
                if (snapshot.val()) {
                    Object.keys(snapshot.val()).forEach(function (key) {
                        if (!myFriends.includes(key) && !myRequests.includes(key) && !sentRequests.includes(key) && userId != key) {
                            users.push({
                                key: key,
                                value: snapshot.val()[key]
                            })
                        }
                    })
                }
                this.setState({ users: users })
            })
        })
    }
    componentDidMount() {
        this.fetchAllUsers()
    }
    renderItem = ({ item }) => {
        const { uid, sentRequests, myRequests } = this.state
        return (
            <View style={styles.view}>
                <Text style = {styles.text}>{item.value.first_name + " " + item.value.last_name}</Text>
                <TouchableOpacity  onPress={() => {
                    const dbref1 = ref(db, 'users/' + uid)
                    const dbref2 = ref(db, 'users/' + item.key)
                    update(dbref1, {
                        sentRequests: [...sentRequests, item.key]
                    })
                    update(dbref2, {
                        requests: [...myRequests, uid]
                    })
                }} style ={styles.button}><Text style={styles.text}>Add Friends</Text></TouchableOpacity>
            </View>
        )
    }
    render() {
        if (this.state.users.length == 0) {
            return (
                <View style={{ alignSelf: "center", marginTop: 100 }}>
                    <Text>No Friends Available to Add</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList data={this.state.users}
                    renderItem={this.renderItem} />
            </View>
        )
    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "pink",
        width: 225,
        alignSelf: "center",
        height: 48,
        borderRadius: 50,
        justifyContent: "center",
        marginTop: 12,

    },
    text: {
        fontSize: 25,
        alignSelf: "center"
    },
    view:{
        marginTop:35
    }
})