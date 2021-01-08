import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons'; 
import CheckBox from '@react-native-community/checkbox';
import {keyExtractor} from '../../utils';

const { Set } = require('immutable');
// TODO: figure out name formatting
// TODO: style this page
// TODO: figure out how to select emergency contacts
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContacts: Set(),
    };
  }

  componentDidMount() {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data: contacts } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        this.setState({contacts});
      }
    })();
  }

  renderItem = ({item}) => (
    <View style={styles.contactsContainer}>
      <CheckBox 
        value={Boolean(this.state.selectedContacts.has(item.id))}
        onChange={() => {
          this.setState(() => ({
            selectedContacts: this.state.selectedContacts.has(item.id) ? this.state.selectedContacts.remove(item.id) : this.state.selectedContacts.add(item.id)
          }));
        }} />
      <Ionicons name="person-circle-sharp" style={styles.contactAvatar} size={24} color="black" />
      <View style={styles.contactDetails}>
        <Text>{item.firstName || item.name}</Text>
        {item.phoneNumbers && <Text>{item.phoneNumbers[0].number}</Text>}
      </View>
    </View>
  )

  render() {
    const { contacts } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text>Select Emergency Contacts</Text>
        <FlatList
          data={contacts}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
        />
        <TouchableOpacity
          style={styles.button}
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
