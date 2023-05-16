import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Button, Header, Icon, Image, ListItem} from '@rneui/themed';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {Colors} from '../components';
import ModalDropdown from 'react-native-modal-dropdown';
import {apiURL} from '../config';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  subRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  placeContainer: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
});
const Stat: () => Node = ({icon, value}) => {
  return (
    <View style={styles.subRow}>
      <Icon name={icon} type="material-community" color="#f3c829" size={20} />
      <Text
        style={{
          marginLeft: 5,
          color: '#f3c829',
        }}>
        {value}
      </Text>
    </View>
  );
};
const Result: () => Node = ({restaurant}) => {
  const navigationContext = React.useContext(NavigationContext);
  return (
    <ListItem
      containerStyle={styles.placeContainer}
      onPress={() => {
        nativeToastAndroid.show('Loading...', nativeToastAndroid.SHORT);
        // go to the place screen
        navigationContext.navigate('Place', {
          id: restaurant.place_id,
          image: restaurant.image,
        });
      }}>
      <Image
        source={{uri: restaurant.image}}
        style={{
          width: 125,
          height: 125,
          borderRadius: 10,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.categoryText}>
          {restaurant.name}
        </ListItem.Title>
        {restaurant.cuisine && (
          <ListItem.Subtitle style={styles.categoryText}>
            {restaurant.cuisine.join(', ')}
          </ListItem.Subtitle>
        )}
        <ListItem.Subtitle style={styles.categoryText}>
          {restaurant.address}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.categoryText}>
          <Stat icon="star" value={restaurant.rating} />
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.categoryText}>
          {restaurant.distance > 1000
            ? `${(restaurant.distance / 1000).toFixed(2)} km`
            : `${restaurant.distance.toFixed(2)} m`}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const FilterModal: () => Node = ({query, cuisine, cuisines}) => {
  const navigationContext = React.useContext(NavigationContext);
  const [selectedCuisine, setSelectedCuisine] = React.useState(cuisine);
  return (
    <View
      style={{
        backgroundColor: 'grey',
        height: '20%',
      }}>
      <ModalDropdown
        options={cuisines}
        defaultValue={selectedCuisine ? selectedCuisine : 'Cuisine'}
        style={{
          backgroundColor: 'white',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}
        textStyle={{
          fontSize: 20,
          color: 'black',
          textAlign: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        dropdownStyle={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}
        dropdownTextStyle={{
          fontSize: 20,
          color: 'black',
          textAlign: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        onSelect={(index, value) => {
          setSelectedCuisine(value);
        }}
      />
      <Button
        title="Apply"
        containerStyle={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}
        onPress={() => {
          nativeToastAndroid.show('Loading...', nativeToastAndroid.SHORT);
          // go to the place screen
          Geolocation.getCurrentPosition(
            position => {
              let url = `${apiURL}/restaurants/?lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
              if (query) {
                url += `&query=${query}`;
              }
              if (selectedCuisine) {
                url += `&cuisine=${selectedCuisine}`;
              }
              fetch(url)
                .then(response => response.json())
                .then(json => {
                  // navigate to the search screen
                  if (json.length === 0) {
                    nativeToastAndroid.show(
                      'No results found',
                      nativeToastAndroid.SHORT,
                    );
                    return;
                  }
                  navigationContext.navigate('SearchResults', {
                    results: json,
                    query: query,
                    cuisine: selectedCuisine,
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
      />
    </View>
  );
};

export const SearchResults: () => Node = ({route}) => {
  // let {query} = route.params;
  let navigationContext = React.useContext(NavigationContext);
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);
  let {results} = route.params;
  let {query} = route.params;
  let {cuisine} = route.params;
  const [cuisines, setCuisines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(apiURL + '/cuisines')
      .then(response => response.json())
      .then(json => {
        setCuisines(Object.keys(json.cuisines));
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView>
      <Header
        // add a back button
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => {
            navigationContext.goBack();
          },
        }}
        // create a filter button
        rightComponent={{
          icon: 'filter',
          type: 'material-community',
          color: '#fff',
          onPress: () => {
            setFilterModalVisible(!filterModalVisible);
          },
        }}
        centerComponent={{
          text: query ? query : 'Search Results',
          style: {color: '#fff', fontSize: 20},
        }}
        backgroundColor={Colors.primary}
      />
      {filterModalVisible && (
        <FilterModal query={query} cuisine={cuisine} cuisines={cuisines} />
      )}
      <ScrollView>
        {results.map((restaurant, index) => (
          <Result key={index} restaurant={restaurant} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
