import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {AuthContext} from '../App';
import SuperTokens from 'supertokens-react-native';

const styles = StyleSheet.create({});

const signOut = (setIsLoggedIn, navigation) => {
  SuperTokens.signOut();
  setIsLoggedIn(false);
  navigation.navigate('Home');
};

export const Profile: (navigation: any) => Node = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useContext(AuthContext);
  return (
    <>
      <Button
        onPress={(setIsLoggedIn, navigation) =>
          signOut(setIsLoggedIn, navigation)
        }
        title="Sign Out"
      />
      <Text>Profile</Text>
    </>
  );
};
