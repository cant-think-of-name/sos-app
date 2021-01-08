import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';

// TODO: style this page
// TODO: figure out how to add an SOS button
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>The Home Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    'flex': 1,
  },
}); 

export default Home;
