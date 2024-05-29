import React from "react"
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }
    signIn=(email, password)=>{
const auth = getAuth();
signInWithEmailAndPassword(auth,email, password)
.then(()=>{
    Alert.alert("Login Successful")
    this.props.navigation.navigate("Main")
})
.catch((error)=>{Alert.alert(error.message)})
    }
    render() {
        const { email, password } = this.state
        return (
            <View>
                <Text style={styles.heading}>Event Planning App</Text>
                <TextInput placeholder="Enter Email"
                    style={styles.input} onChangeText={(text) => this.setState({ email: text })} />
                <TextInput placeholder="Enter Password"
                    style={styles.input} onChangeText={(text) => this.setState({ password: text })} />
                <TouchableOpacity style={styles.button}
                    onPress={() => this.signIn(email, password)}
                >
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("Register")}>
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