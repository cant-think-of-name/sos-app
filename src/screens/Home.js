import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SmsAndroid from 'react-native-get-sms-android';

import Toast from 'react-native-toast-message';

import { retrieveEmergencyContacts } from "../../utils";

// TODO: try this package: https://github.com/briankabiro/react-native-get-sms-android
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: 'Error Message here',
    };
  }

  goToAddContacts = () => {
    const { navigation } = this.props;
    navigation.navigate('Contact List');
  }

  errorMessage = (error) => {
    this.setState({error: JSON.stringify(error)});
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: JSON.stringify(error),
    })
  }

  informEmergencyContacts = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const emergencyContactsMap = await retrieveEmergencyContacts();
      if (emergencyContactsMap.size > 0) {
        const emergencyContactValues = emergencyContactsMap.values();
        for (const contact of emergencyContactValues) {
          const phoneNumber = contact.phoneNumbers[0].number;
          const name = contact.name;
          SmsAndroid.autoSend(
            phoneNumber, 
            `Hi ${name}, I'm testing the emergency contacts hack`,
            (error) => {
              this.setState({error: JSON.stringify(error)});
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: JSON.stringify(error),
                text2: JSON.stringify(error),
              })
            },
            (success) => {
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Success',
                text2: 'Emergency message sent',
              })
            }
          );
        }
        // const emergencyContacts = emergencyContactsValues.forEach(contact => console.log(contact));
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToAddContacts}>
          <View>
            <Ionicons name="ios-person-add" size={144} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.informEmergencyContacts} style={styles.helpButton}>
          <Text>SOS</Text>
        </TouchableOpacity>
        <Text>{this.state.error}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  helpButton: {
    backgroundColor: "lightblue",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: 'center',
  },
}); 

export default Home;
