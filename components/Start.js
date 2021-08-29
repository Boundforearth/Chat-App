//./components/Start.js
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
    //colors to be mapped to Touchable Opacity.  Update these to update colors
    const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"]

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
                accessible={true}
                accessibilityLabel="Your Name"
                accessibilityHint="Name that will be used in the chat"
                style={styles.userNameInput}
                placeholderTextColor="#757083"
                placeholder="Your Name"
                onChangeText={(name) => this.setState({name})}
                value={this.state.text}
              />
              <View style={styles.colorSelection}>
                <Text style={styles.chooseColorText}>Choose Background Color:</Text>
                <View style={styles.buttonDisplay}>
                  {/* maps each color to its own button from the colors array*/}
                  {colors.map((color) => (
                    <TouchableOpacity 
                      key={color}
                      accessible={true}
                      accessibilityLabel="Chat Background Color"
                      accessibilityHint="Selects chat background color"
                      accessibilityRole="radio"
                      style={[styles.buttonColor, this.state.chatColor === color ? {borderColor: "#ff7dba"}: {borderColor: "white"}, {backgroundColor: color}]}
                      onPress={() => this.setState({chatColor: color})}
                    />
                  ))}
                </View>
              </View>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="To Chat"
                accessibilityHint="Navigates to the chat page"
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
    flex: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
  },
  colorSelection: {
    marginTop: "3%",
    width: "88%",
  },
  userInfo: {
    flex: 40,
    display: "flex",
    width: "88%",
    margin: "6%",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
  },
  userNameInput: {
    padding: 5,
    marginTop: "3%",
    borderWidth: 1,
    width: "88%",
    height: 50,
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
  buttonColor: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
  },
  button: {
    marginTop: "3%",
    backgroundColor: "#757083",
    borderRadius: 5,
    height: 50,
    width: "88%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}) 