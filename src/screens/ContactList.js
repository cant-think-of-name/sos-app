import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';

import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons'; 
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { keyExtractor, retrieveEmergencyContacts, saveEmergencyContacts } from '../../utils';

const { Map } = require('immutable');

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContacts: Map(),
    };
  }

  async componentDidMount() {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data: contacts } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        const selectedContacts = await retrieveEmergencyContacts();
        this.setState({selectedContacts, contacts});
      }
    })();
  }

  renderItem = ({item}) => (
    <View style={styles.contactsContainer}>
      <CheckBox 
        value={this.state.selectedContacts.has(item.id)}
        onChange={() => {
          this.setState(() => ({
            selectedContacts: this.state.selectedContacts.has(item.id) 
              ? this.state.selectedContacts.remove(item.id) 
              : this.state.selectedContacts.set(item.id, item)
          }));
        }} />
      <Ionicons name="person-circle-sharp" style={styles.contactAvatar} size={24} color="black" />
      <View style={styles.contactDetails}>
        <Text>{item.firstName || item.name}</Text>
        {item.phoneNumbers && <Text>{item.phoneNumbers[0].number}</Text>}
      </View>
    </View>
  )

  storeEmergencyContacts = async () => {
    await saveEmergencyContacts(this.state.selectedContacts);
  }

  render() {
    const { contacts } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={contacts}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.storeEmergencyContacts}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    'flex': 1,
  },
  contactsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  contactAvatar: {
    padding: 10,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  }
}); 

export default ContactList;
