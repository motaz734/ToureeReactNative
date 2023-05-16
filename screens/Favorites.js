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

export const Favorites: () => Node = ({route}) => {
  // let {query} = route.params;
  let navigationContext = React.useContext(NavigationContext);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState({});

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        nativeToastAndroid.show('Location found', nativeToastAndroid.SHORT);
        fetch(
          `${apiURL}/restaurants/favorites/?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setFavorites(json);
            setLoading(false);
          })
          .catch(error => console.error(error));
      },
      error => setErrorMsg(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <Button
            title="Solid"
            type="solid"
            loading
            color="#EFEFEF"
            loadingProps={{color: Colors.primary}}
          />
        ) : (
          favorites.map((restaurant, index) => (
            <Result key={index} restaurant={restaurant} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
