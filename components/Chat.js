import React, { Component } from "react";
import { View, Button, Text,TextInput, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends Component {

  componentDidMount() {
    //Use to set the name at top of app page
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {

    return(
      <View style={[styles.container,{ backgroundColor: this.props.route.params.chatColor}]}>
        <Text style={styles.text}>Chat</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff"
  }
})