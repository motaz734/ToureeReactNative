import {routes} from './index';
import {Icon} from '@rneui/themed';
import React from '.';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../components';
const Tab = createBottomTabNavigator();

export const MainNavigator: () => Node = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.primary,
      }}>
      {routes.App.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.path}
          component={route.component}
          options={{
            tabBarLabel: route.name,
            tabBarIcon: ({color, size}) => (
              <Icon
                name={route.icon}
                color={color}
                size={size}
                type="material-community"
              />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
