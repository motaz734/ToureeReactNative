import {StyleSheet, Text, View} from 'react-native';
import {Colors, BackgroundContainer} from '../components';
import {Input, Icon, Button} from '@rneui/themed';
import React from 'react';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.white,
    // borderWidth: 1,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    alignItems: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 0,
    backgroundColor: Colors.white,
    boxShadow: '0px 0px 4px rgba(74, 169, 188, 0.25)',
    borderRadius: 14,
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
  },

  signupButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    width: 158,
    height: 50,
  },
});

const validateSignup = (
  email,
  password,
  confirmPassword,
  isLoggedIn,
  setIsLoggedIn,
) => {
  if (email === '') {
    alert('Please enter your email');
  } else if (password === '') {
    alert('Please enter your password');
  } else if (confirmPassword === '') {
    alert('Please confirm your password');
  } else if (password !== confirmPassword) {
    alert('Passwords do not match');
  } else {
    alert('Signup successful');
    setIsLoggedIn(true);
  }
};

const ShowPassword = ({showPassword, setShowPassword}) => {
  return (
    <Icon
      color={Colors.primary}
      containerStyle={{}}
      disabledStyle={{}}
      iconProps={{}}
      iconStyle={{}}
      name={showPassword ? 'eye' : 'eye-slash'}
      size={20}
      onLongPress={() => setShowPassword(!showPassword)}
      onPress={() => setShowPassword(!showPassword)}
      type="font-awesome-5"
    />
  );
};

export const Signup: () => Node = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useContext(AuthContext);

  const navigation = React.useContext(NavigationContext);

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <Input
          value={email}
          onChangeText={setEmail}
          inputContainerStyle={styles.input}
          label="Email"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="email-address"
          labelStyle={styles.label}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          inputContainerStyle={styles.input}
          secureTextEntry={!showPassword}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          label="Password"
          labelStyle={styles.label}
          rightIcon={
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />
        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          inputContainerStyle={styles.input}
          secureTextEntry={!showPassword}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="go"
          label="Confirm Password"
          labelStyle={styles.label}
        />
        <Button
          title="Sign Up"
          containerStyle={{marginTop: 20}}
          buttonStyle={styles.signupButton}
          onPress={() =>
            validateSignup(
              email,
              password,
              confirmPassword,
              isLoggedIn,
              setIsLoggedIn,
            )
          }
        />
        <Text style={{color: Colors.white, marginTop: 20}}>
          Already have an account?{' '}
          <Text
            style={{
              color: Colors.primary,
              fontWeight: '800',
              fontSize: 20,
            }}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            Log In
          </Text>
        </Text>
      </View>
    </BackgroundContainer>
  );
};
