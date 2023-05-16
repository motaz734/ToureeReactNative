import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {Image} from '@rneui/themed';

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    // backgroundColor: 'rgba(124, 124, 124, 0.75)',
    backdropFilter: 'blur(2px)',
    width: '100%',
    height: '70%',
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

      <Image
        source={require('../assets/images/logo.jpg')}
        style={{
          width: 350,
          height: 100,
          marginTop: 75,
          borderRadius: 50,
          alignSelf: 'center',
        }}
      />
      <View style={styles.blurContainer}>{children}</View>
    </ImageBackground>
  );
};

export default BackgroundContainer;
