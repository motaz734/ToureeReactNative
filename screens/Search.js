import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';

const styles = StyleSheet.create({});

export const Search: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  return <Text>Search</Text>;
};
