import AsyncStorage from '@react-native-async-storage/async-storage';
const { Map } = require('immutable');

export const keyExtractor = item => item.id

export const saveEmergencyContacts = async (selectedContacts) => {
  try {
    await AsyncStorage.setItem('emergency_contacts', JSON.stringify(selectedContacts));
  } catch (err) {
    console.log(err);
  }
}

export const retrieveEmergencyContacts = async () => {
  try {
    const emergencyContacts = await AsyncStorage.getItem('emergency_contacts');
    if (emergencyContacts) {
      return Map(JSON.parse(emergencyContacts));
    } else {
      return Map();
    }
  } catch (err) {
    console.log(err);
    return Map();
  }
}
