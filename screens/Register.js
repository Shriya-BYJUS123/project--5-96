import React from "react"
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {ref, set} from "firebase/database"
import db from "../config"



export default class Register extends React.Component {
    constructor(){
        super();
        this.state={
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            confirm_password:""
        }
    }
    registerUser=(first_name, last_name, email, password, confirm_password)=>{
if (password == confirm_password){
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        Alert.alert("User Registered")
        this.props.navigation.navigate("Login")
        const dbRef = ref(db, "/users/"+userCredential.user.uid)
        set(dbRef, {
            email:email,
            first_name:first_name,
            last_name:last_name,
            groups:"",
            requests:"",
            myFriends:"",
            myEvents:"",
            sentRequests:""
        })
    })
}else{
    Alert.alert("Passwords Do Not Match")
}
    }
    render() {
        const {first_name, last_name, email, password, confirm_password} = this.state
        return (
            <View>
                <Text style={styles.heading}>Register</Text>
                <TextInput placeholder="Enter First Name"
                    style={styles.input} 
                    onChangeText={(text)=>this.setState({first_name:text})}
                    />
                <TextInput placeholder="Enter Last Name"
                    style={styles.input}
                    onChangeText={(text)=>this.setState({last_name:text})}
                    />
                <TextInput placeholder="Enter Email"
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email:text})}
                    />
                <TextInput placeholder="Enter Password" secureTextEntry
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password:text})}
                    />
                <TextInput placeholder="Confirm Password" secureTextEntry
                    style={styles.input}
                    onChangeText={(text)=>this.setState({confirm_password:text})}
                    />
                
                <TouchableOpacity style={styles.button}
                onPress={()=>this.registerUser(first_name, last_name, email, password, confirm_password)}
                >
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 35,
        alignSelf: "center",
        marginTop: 60
    },
    input: {
        borderWidth: 2,
        borderRadius: 50,
        width: 250,
        alignSelf: "center",
        marginTop: 20,
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
    }
})
