// ./components/Chat.js
import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { Bubble, Time, SystemMessage, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import CustomActions from "./CustomActions"
import MapView from 'react-native-maps';

//use firebase
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: "",
      isConnected: false,
      image: null,
    }

    //Provided firebase config data
    const firebaseConfig = {
      apiKey: "AIzaSyAfp1g7vqlK__-uwWo13Uxuo6Z6Xps3vj4",
      authDomain: "chat-app-84099.firebaseapp.com",
      projectId: "chat-app-84099",
      storageBucket: "chat-app-84099.appspot.com",
      messagingSenderId: "1063381477251",
      appId: "1:1063381477251:web:5f3e79d4855b1275d278b6",
      measurementId: "G-PTZ1ZS86YY"
    };
      if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        };
      this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  async getMessages() {
    let messages  = ""
    try {
      messages = await AsyncStorage.getItem("messages") || [];
      this.setState({
        messages: JSON.parse(messages)
      })
    } catch(error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(this.state.messages))
    } catch(error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
    } catch(error) {
      console.log(error.message)
    }
  }

  renderInputToolbar(props) {
    if(this.state.isConnected == false) {

    } else {
      return(
        <InputToolbar
          {...props}
        />
      )
    }
  }

  componentDidMount() {
    //Takes the name provided in the TextInput from Start.js and assigns it to a variable
    const name = this.props.route.params.name;

    //Use to set the name at top of app page
    this.props.navigation.setOptions({ title: name });

    NetInfo.fetch().then((connection) => {
      if(connection.isConnected) {
        console.log(connection.type);
        console.log(connection.isConnected);
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if(!user) {
            await firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            isConnected: true,
          });
    
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log(connection.type);
        console.log("offline");
        this.setState({
          isConnected: false,
        })
        this.getMessages();
      }
    })
  
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  }

  //function used to add a message to firebase
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: {
        _id: this.state.uid,
        name: message.user.name,
      },
      image: message.image || null,
      location: message.location || null,
    })
  }
 
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  //Appends new messages to the messages state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
     () => { 
      this.addMessages();
      this.saveMessages();
    }
    )
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

    renderCustomView = props => {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3
            }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )
      }
      return null;
    }

    renderCustomActions = (props) => {
      return <CustomActions {...props} />
    };

  render() {

    const {chatColor, name} = this.props.route.params

    return(
      <View
        //sets the background color to that chosen in Start.js, also sets app to take up entire page with styles.container
        style={[styles.container, {backgroundColor: chatColor}]}
      >
        <GiftedChat 
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderTime={this.renderTime.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderCustomView={this.renderCustomView.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            name,
            _id: this.state.uid
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
 