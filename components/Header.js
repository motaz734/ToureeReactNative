import {StyleSheet, Vibration, View} from 'react-native';
import React from 'react';
import {Colors} from '../components';
import {Button} from '@rneui/themed';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, Text} from '@rneui/base';

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.dark,
    borderBottomWidth: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 25,
  },
});

export const CustomHeader: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  return (
    <>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://placekitten.com/250/250',
          }}
          style={styles.profilePic}
        />
        <Text>TravelAlly</Text>
      </View>
    </>
  );
};
