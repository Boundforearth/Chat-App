import React, { Component } from "react";
import { View, TouchableOpacity, Text,TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView } from "react-native";
import { startBackground } from "../images/index"

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      chatColor: "#090C08",
    }
  }
  render() {
    return(
      <View style={styles.container}>
        <ImageBackground source={startBackground} resizeMode="cover" style={styles.image}>
          <View style={styles.titleBox}> 
            <Text  style={styles.title}>Chat App</Text>
          </View>
          {/* Use this component to prevent keyboard from covering up input box*/}
          <KeyboardAvoidingView 
            style={styles.userInfo}
            behavior="padding"
          >
              <TextInput 
                style={styles.userNameInput}
                placeholderTextColor="#757083"
                placeholder="Your Name"
                onChangeText={(name) => this.setState({name})}
                value={this.state.text}
              />
              <View style={styles.colorSelection}>
                <Text style={styles.chooseColorText}>Choose Background Color:</Text>
                <View style={styles.buttonDisplay}>
                  <TouchableOpacity
                    style={styles.buttonColor1}
                    onPress={() => this.setState({chatColor: "#090C08"})}
                  />
                  <TouchableOpacity
                    style={styles.buttonColor2}
                    onPress={() => this.setState({chatColor: "#474056"})}
                  />
                  <TouchableOpacity
                    style={styles.buttonColor3}
                    onPress={() => this.setState({chatColor: "#8A95A5"})}
                  />
                  <TouchableOpacity
                    style={styles.buttonColor4}
                    onPress={() => this.setState({chatColor: "#B9C6AE"})}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Chat", { 
                  name: this.state.name,
                  chatColor: this.state.chatColor } )}
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  titleBox: {
    flex: 53,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
  },
  colorSelection: {
    width: "88%",
  },
  userInfo: {
    flex: 47,
    display: "flex",
    width: "88%",
    margin: "6%",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  userNameInput: {
    padding: 5,
    borderWidth: 1,
    width: "88%",
    height: 60,
    borderColor: "gray",
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  chooseColorText: {
    marginBottom: 8,
    fontSize: 16,
    color: "#757083",
    fontWeight: "300",
  },
  buttonDisplay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: "20%",
  },
  buttonColor1: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#090C08",
  },
  buttonColor2: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#474056",
  },
  buttonColor3: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#8A95A5",
  },
  buttonColor4: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#B9C6AE",
  },
  button: {
    backgroundColor: "#757083",
    borderRadius: 5,
    height: 60,
    width: "88%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}) 