import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {AuthContext} from '../App';

const styles = StyleSheet.create({});

export const Profile: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  const [isLoggedIn, setIsLoggedIn] = React.useContext(AuthContext);
  return (
    <>
      <Button
        onPress={() => {
          setIsLoggedIn(false);
          navigation.navigate('Home');
        }}
        title="Sign Out"
      />
      <Text>Profile</Text>
    </>
  );
};
