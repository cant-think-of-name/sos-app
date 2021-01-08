import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>The Home Screen</Text>
        <TouchableOpacity onPress={this.goToAddContacts}>
          <View style={styles.addContactsIcon}>
            <Ionicons name="ios-person-add" size={144} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    'flex': 1,
  },
  addContactsIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
  },
}); 

export default Home;
