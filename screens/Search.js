import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {apiURL} from '../config';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {Colors} from '../components';
import {Header, SearchBar} from '@rneui/themed';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#EFEFEF',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'transparent',
    shadowOpacity: 5,
    elevation: 2.5,
  },
  searchText: {
    color: Colors.darker,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export const Search: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <View>
      <SearchBar
        placeholder="Search for places"
        onChangeText={setSearch}
        value={search}
        showLoading={searchLoading}
        onSubmitEditing={() => {
          setSearchLoading(true);
          // clear the search bar
          Geolocation.getCurrentPosition(
            position => {
              fetch(
                `${apiURL}/restaurants/?lat=${position.coords.latitude}&lng=${position.coords.longitude}&query=${search}`,
              )
                .then(response => response.json())
                .then(json => {
                  setSearchLoading(false);
                  setSearch('');
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
                    query: search,
                    cuisine: '',
                  });
                })
                .catch(error => console.error(error));
            },
            error => {
              console.log(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        }}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
      />
      <Text style={styles.searchText}>
        Type in the name of a place to search for it
      </Text>
    </View>
  );
};
