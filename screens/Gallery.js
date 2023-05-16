import {
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Header, Icon, Image, ListItem, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Colors} from '../components';
import {NavigationContext} from '@react-navigation/native';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '50%',
    flex: 1,
  },
});

export const Gallery: () => Node = ({route}) => {
  const {images} = route.params;
  const navigationContext = React.useContext(NavigationContext);
  const [index, setIndex] = useState(1);
  //   fullScreen image switcher
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <Header
        leftComponent={
          <Icon
            name="arrow-left"
            type="material-community"
            color={Colors.white}
            size={30}
            onPress={() => navigationContext.goBack()}
          />
        }
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        backgroundColor="grey"
        centerComponent={{
          text: `${index} of ${images.length}`,
          style: {color: '#fff', fontSize: 20},
        }}
      />
      <Image
        source={{uri: images[index - 1]}}
        containerStyle={{
          width: 400,
          height: 400,
          marginTop: 'auto',
          marginBottom: 'auto',
          alignSelf: 'center',
        }}
        transitionDuration={1000}
        transition={true}
        onPress={() => {
          if (index === images.length) {
            setIndex(1);
          } else {
            setIndex(index + 1);
          }
        }}
      />
    </View>
  );
};
