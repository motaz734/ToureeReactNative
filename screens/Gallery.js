import {
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Image, ListItem, Text} from '@rneui/themed';
import React, {useState} from 'react';

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
  return (
    <View style={styles.item}>
      <SafeAreaView>
        <FlatList
          data={images}
          style={styles.list}
          numColumns={1}
          keyExtractor={e => e}
          renderItem={({item}) => (
            <Image
              source={{uri: item}}
              containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};
