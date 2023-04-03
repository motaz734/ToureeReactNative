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
import {useColorScheme} from 'react-native';
import React from 'react';

import {Colors} from './components';
import {routes} from './screens';
import {Icon} from '@rneui/themed';
import {MainNavigator} from './screens';

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext(null);
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); //TODO: change to false

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Place' : 'Welcome'}>
          {isLoggedIn ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              {routes.Common.map((route, index) => (
                <Stack.Screen
                  key={index}
                  name={route.path}
                  component={route.component}
                />
              ))}
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{headerShown: false}}>
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
