import {StyleSheet, Text, View} from 'react-native';
import {Colors, BackgroundContainer} from '../components';
import {Input, Icon, Button} from '@rneui/themed';
import React from 'react';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../App';
import {baseURL} from '../config';

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
    width: '100%',
    height: 50,
  },
  nameInput: {
    borderBottomWidth: 0,
    backgroundColor: Colors.white,
    boxShadow: '0px 0px 4px rgba(74, 169, 188, 0.25)',
    borderRadius: 14,
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const validateSignup = (
  email,
  password,
  firstName,
  lastName,
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
  } else if (firstName === '') {
    alert('Please enter your first name');
  } else if (lastName === '') {
    alert('Please enter your last name');
  } else {
    const data = {
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
        {
          id: 'first_name',
          value: firstName,
        },
        {
          id: 'last_name',
          value: lastName,
        },
      ],
    };
    const url = `${baseURL}/auth/signup`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          setIsLoggedIn(true);
        } else {
          alert(data.formFields[0].error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');

  const navigation = React.useContext(NavigationContext);

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Input
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={{width: '50%'}}
            inputContainerStyle={styles.nameInput}
            label="First Name"
            autoCapitalize="none"
            returnKeyType="next"
            labelStyle={styles.label}
          />
          <Input
            value={lastName}
            onChangeText={setLastName}
            containerStyle={{width: '50%'}}
            inputContainerStyle={styles.nameInput}
            label="Last Name"
            autoCapitalize="none"
            returnKeyType="next"
            labelStyle={styles.label}
          />
        </View>
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
          containerStyle={{width: '95%', marginTop: 20}}
          buttonStyle={styles.signupButton}
          onPress={() =>
            validateSignup(
              email,
              password,
              firstName,
              lastName,
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
