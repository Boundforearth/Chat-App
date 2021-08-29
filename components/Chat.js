// ./components/Chat.js
import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { Bubble, Time, SystemMessage, GiftedChat } from "react-native-gifted-chat";

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }
  componentDidMount() {
    //Takes the name provided in the TextInput from Start.js and assigns it to a variable
    const name = this.props.route.params.name;

    //Use to set the name at top of app page
    this.props.navigation.setOptions({ title: name });

    this.setState({
      //static messages to be displayed upon entering the chat page
      //_id: 1 is a system message
      messages: [
        {
          _id: 4,
          text: "Hope you enjoy React Native",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 3,
          text: "Hello Forest",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: `${name} has eneterd the chat!`,
          system: true,
        },
        {
          _id: 1,
          text: "React Native has entered the chat",
          system: true,
        },
      ],
    })
  }

  //Appends new messages to the messages state
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  //changes the color of the chat bubble.  This is for the right bubble, but "left" can be used for the other bubble
  renderBubble(props) {
    return(
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#222",
          },
          right: {
            backgroundColor: "#ccc"
          }
        }}
        textStyle={{
          left: {
            color: "white",
          },
          right: {
            color: "black"
          }
        }}
      />
    )
  }

    //changes the color of the time, works similar to renderBubble
    renderTime (props) {
      return (
        <Time
        {...props}
          timeTextStyle={{
            left: {
              color: 'white',
            },
            right: {
              color: 'black',
            },
          }}
        />
      );
    };

    //Use to change the text of system messages
    renderSystemMessage(props) {
      return(
        <SystemMessage
          {...props}
            textStyle={{ color: 'white', fontWeight: '900' }}
      />
      )
    };

  render() {

    return(
      <View
        //sets the background color to that chosen in Start.js, also sets app to take up entire page with styles.container
        style={[styles.container, {backgroundColor: this.props.route.params.chatColor}]}
      >
        <GiftedChat 
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderTime={this.renderTime.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* fixes any keyboard issues that may occur when users are on Android*/ }
        { Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
})