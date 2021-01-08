import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

// TODO: style this page
// TODO: figure out how to add an SOS button
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
    this._cacheResourcesAsync = this._cacheResourcesAsync.bind(this)
  }

  goToAddContacts = () => {
    const { navigation } = this.props;
    navigation.navigate('Contact List');
  }

  render() {
      if (!this.state.isReady) {
        return (
          <AppLoading
              startAsync={this._cacheResourcesAsync}
              onFinish={() => this.setState({ isReady: true })}
              onError={console.warn}
          />
        );
      }

      return (
        <View style={styles.container}>
          <Text>Add your emergency contacts below</Text>
          <TouchableOpacity onPress={this.goToAddContacts}>
            <View>
              <Ionicons name="ios-person-add" size={144} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpButton}>
            <Text>SOS</Text>
          </TouchableOpacity>
        </View>
      )
  }

  async _cacheResourcesAsync() {
      const images = [require('../../assets/splash2.jpeg')];

      const cacheImages = images.map(image => {
          return Asset.fromModule(image).downloadAsync();
      });
      return Promise.all(cacheImages);
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
    width: 200,
    height: 200,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    bottom:0,
  },
}); 

export default Home;
