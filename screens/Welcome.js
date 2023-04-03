import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BackgroundContainer, Colors} from '../components';
import {Button} from '@rneui/themed';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  signupButtonsContainer: {
    width: '80%',
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  signButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    width: 158,
    height: 60,
  },
  signupButton: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    width: 158,
    height: 60,
  },
  signButtonTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '500',
  },
  signupButtonTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '500',
  },
});

export const Welcome: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  return (
    <BackgroundContainer>
      <View style={styles.signupButtonsContainer}>
        <Button
          title="Sign Up"
          type="outline"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          buttonStyle={styles.signupButton}
          titleStyle={styles.signupButtonTitle}
        />
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          buttonStyle={styles.signButton}
          titleStyle={styles.signButtonTitle}
        />
      </View>
    </BackgroundContainer>
  );
};
