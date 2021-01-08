import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons'; 
import CheckBox from '@react-native-community/checkbox';
import {keyExtractor} from '../../utils';
// TODO: figure out name formatting
// TODO: style this page
// TODO: figure out how to select emergency contacts
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
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
      <CheckBox />
      <Ionicons name="person-circle-sharp" style={{padding: 10}} size={24} color="black" />
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
        <Text>Contacts Module Example</Text>
        <FlatList
          // numColumns={2}
          data={contacts}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
        />
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
}); 

export default ContactList;
