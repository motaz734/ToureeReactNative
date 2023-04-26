/**
 * Sample React Native App
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {Node} from 'react';
import {useColorScheme, PermissionsAndroid} from 'react-native';
import React from 'react';
import SuperTokens from 'supertokens-react-native';

import {Colors} from './components';
import {routes} from './screens';
import {Icon} from '@rneui/themed';
import {MainNavigator} from './screens';

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext(null);
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); //TODO: change to false

  // check if the user has granted location permission
  React.useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(granted => {
      if (!granted) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(granted => {
          if (!granted) {
            console.log('Location permission denied');
          }
        });
      }
    });
  }, []);

  SuperTokens.init({
    apiDomain: 'http://192.168.1.4:8000',
    apiBasePath: '/auth',
  });

  // check if user is logged in
  SuperTokens.doesSessionExist().then(exists => {
    if (exists) {
      setIsLoggedIn(true);
    }
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Welcome'}>
          {isLoggedIn ? (
            <Stack.Group
              screenOptions={{headerShown: false, headerTransparent: true}}>
              {routes.Common.map((route, index) => (
                <Stack.Screen
                  key={index}
                  name={route.path}
                  component={route.component}
                />
              ))}
            </Stack.Group>
          ) : (
            <Stack.Group
              screenOptions={{headerShown: false, headerTransparent: true}}>
              {routes.Auth.map((route, index) => (
                <Stack.Screen
                  key={index}
                  name={route.path}
                  component={route.component}
                />
              ))}
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
