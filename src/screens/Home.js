import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import * as SMS from 'expo-sms';
import SendSMS from 'react-native-sms';

import { retrieveEmergencyContacts } from "../../utils";

// TODO: style this page
// TODO: figure out how to add an SOS button
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToAddContacts = () => {
    const { navigation } = this.props;
    navigation.navigate('Contact List');
  }

  informEmergencyContacts = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const emergencyContactsMap = await retrieveEmergencyContacts();
      if (emergencyContactsMap.size > 0) {
        const emergencyContactValues = emergencyContactsMap.values();
        for (const contact of emergencyContactValues) {
          console.log(contact)
          const phoneNumber = contact.phoneNumbers[0].number;
          const name = contact.name;
          SMS.sendSMSAsync(phoneNumber, 'Help la');
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
