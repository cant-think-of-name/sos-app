import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native';
import AppLoading from 'expo-app-loading';

import { Ionicons } from '@expo/vector-icons';

// TODO: style this page
// TODO: figure out how to add an SOS button
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            <Text>The Home Screen</Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: 'center',
  },
}); 

export default Home;
