import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import {keyExtractor} from '../../utils';

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
    <View style={{background: "blue"}}>
      <Text>{item.firstName || item.name}</Text>
      {item.phoneNumbers && <Text>{item.phoneNumbers[0].number}</Text>}
    </View>
  )

  render() {
    const { contacts } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text>Contacts Module Example</Text>
        <FlatList
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
}); 

export default ContactList;
