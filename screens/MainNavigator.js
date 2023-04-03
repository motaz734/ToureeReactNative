import {routes} from './index';
import {Icon} from '@rneui/themed';
import React from '.';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export const MainNavigator: () => Node = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      {routes.App.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.path}
          component={route.component}
          options={{
            tabBarLabel: route.name,
            tabBarIcon: ({color, size}) => (
              <Icon name={route.icon} color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
