import React from "react"
import {Text, View, StyleSheet,TouchableOpacity} from "react-native"
import {getAuth, signOut} from "firebase/auth"

export default class MyFriends extends React.Component{
    componentDidMount(){
        const auth = getAuth()
        signOut(auth)
        .then(()=>{
            this.props.navigation.replace("Login")
        })
    }
    render(){
        return(
            <Text>Logout</Text>
        )
    }
}