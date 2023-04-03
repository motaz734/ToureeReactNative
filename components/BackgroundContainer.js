import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from './index';

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    backgroundColor: 'rgba(124, 124, 124, 0.75)',
    backdropFilter: 'blur(2px)',
    width: '100%',
    height: '75%',
    borderRadius: 55,
    position: 'absolute',
    bottom: -50,
  },
});

const BackgroundContainer: ({children: Node}) => Node = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.imgBackground}>
      {/*  add a semi-transparent background */}
      <View style={styles.blurContainer}>{children}</View>
    </ImageBackground>
  );
};

export default BackgroundContainer;
