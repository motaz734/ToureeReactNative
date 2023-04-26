import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {apiURL} from '../config';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {Colors} from '../components';
import {SearchBar} from '@rneui/themed';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'transparent',
    shadowOpacity: 5,
    elevation: 2.5,
  },
});

export const Search: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <SearchBar
      placeholder="Search for places"
      onChangeText={setSearch}
      value={search}
      showLoading={searchLoading}
      onSubmitEditing={() => {
        setSearchLoading(true);
        // clear the search bar
        setSearch('');
        fetch(
          `${apiURL}/restaurants/?lat=${region.latitude}&lng=${region.longitude}&query=${search}`,
        )
          .then(response => response.json())
          .then(json => {
            setSearchLoading(false);
            // navigate to the search screen
            if (json.length === 0) {
              nativeToastAndroid.show(
                'No results found',
                nativeToastAndroid.SHORT,
              );
              return;
            }
            navigation.navigate('SearchResults', {
              results: json,
            });
          })
          .catch(error => console.error(error));
      }}
      containerStyle={styles.searchBar}
      inputContainerStyle={styles.searchInput}
      inputStyle={{color: Colors.white}}
    />
  );
};
