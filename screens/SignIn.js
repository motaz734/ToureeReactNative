import {StyleSheet, Text, View} from 'react-native';
import {BackgroundContainer, Colors} from '../components';
import {Input, Icon, Button} from '@rneui/themed';
import React from 'react';
import {AuthContext} from '../App';
import {apiURL, baseURL} from '../config';

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

  signinButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    width: '100%',
    height: 50,
  },
});

const validateSignin = (email, password, isLoggedIn, setIsLoggedIn) => {
  if (email === '') {
    alert('Please enter your email');
  } else if (password === '') {
    alert('Please enter your password');
  } else {
    // send to server
    let data = {
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    };
    let url = `${baseURL}/auth/signin`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rid: 'emailpassword',
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
        alert('Error: ' + error);
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

export const Signin: (navigation: any) => Node = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useContext(AuthContext);

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
        <Button
          title="Sign In"
          containerStyle={{marginTop: 20, width: '95%'}}
          buttonStyle={styles.signinButton}
          onPress={() =>
            validateSignin(email, password, isLoggedIn, setIsLoggedIn)
          }
        />
        <Text style={{color: Colors.white, marginTop: 20}}>
          Don't have an account?{' '}
          <Text
            style={{
              color: Colors.primary,
              fontWeight: '800',
              fontSize: 20,
            }}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </BackgroundContainer>
  );
};
