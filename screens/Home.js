import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Colors, CustomHeader} from '../components';
import {
  Icon,
  Image,
  ListItem,
  SearchBar,
  Text,
  Avatar,
  Button,
  Header,
} from '@rneui/themed';
import {apiURL, baseURL} from '../config';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {resolve} from '@babel/core/lib/vendor/import-meta-resolve';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.dark,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  headerText: {
    marginStart: 28,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  rowTitle: {},
  rowSubtext: {},
  categoryView: {
    width: 100,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#EFEFEF',
  },
  categoryPicContainer: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'transparent',
    shadowOpacity: 5,
    elevation: 10,
  },
  categoryText: {
    width: 100,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  statText: {
    width: 100,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeContainer: {
    width: 175,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 5,
    borderRadius: 15,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'transparent',
    shadowOpacity: 10,
    elevation: 5,
    marginVertical: 10,
  },
  mapContainer: {
    height: 400,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  map: {
    // width: '80%',
    // height: 400,
    width: '95%',
    height: '95%',
  },
  subRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});

const Category = ({name, image, region}) => {
  const navigationContext = React.useContext(NavigationContext);

  return (
    <ListItem
      containerStyle={styles.categoryView}
      onPress={() => {
        navigationContext.navigate('SearchResults', {
          query: {
            cuisine: name,
          },
        });
      }}>
      <Avatar
        activeOpacity={0.2}
        avatarStyle={{}}
        containerStyle={styles.categoryPicContainer}
        icon={{}}
        iconStyle={{}}
        imageProps={{}}
        onLongPress={() => {}}
        overlayContainerStyle={{}}
        placeholderStyle={{}}
        rounded
        size="large"
        source={{uri: image}}
        title="P"
        titleStyle={{}}
        onPress={() => {
          // make a search query for the category
          fetch(
            `${apiURL}/restaurants/?lat=${region.latitude}&lng=${region.longitude}&cuisine=${name}`,
          )
            .then(response => response.json())
            .then(json => {
              // navigate to the search screen
              if (json.length == 0) {
                nativeToastAndroid.show(
                  'No results found',
                  nativeToastAndroid.SHORT,
                );
                return;
              }
              navigationContext.navigate('SearchResults', {
                results: json,
                query: '',
                cuisine: name,
              });
            })
            .catch(error => console.error(error));
        }}
      />
      <ListItem.Content>
        <ListItem.Subtitle style={styles.categoryText}>
          {name}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const Stat: () => Node = ({icon, value, color}) => {
  return (
    <View style={styles.subRow}>
      <Icon name={icon} type="material-community" color={color} size={14} />
      <Text
        style={{
          // marginLeft: 5,
          fontSize: 12,
          color: color,
        }}>
        {value}
      </Text>
    </View>
  );
};
const Place = ({data, attraction}) => {
  let navigationContext = React.useContext(NavigationContext);
  // round distance to 1 decimal place
  let distance = Math.round(data.distance * 10) / 10;
  if (distance > 1000) {
    distance = Math.round(distance / 1000) + ' km';
  } else {
    distance = distance + ' m';
  }
  return (
    <ListItem
      containerStyle={styles.placeContainer}
      onPress={() => {
        nativeToastAndroid.show('Loading...', nativeToastAndroid.SHORT);
        // go to the place screen
        if (attraction) {
          navigationContext.navigate('Attraction', {
            id: data.place_id,
            image: data.image,
          });
          return;
        }
        navigationContext.navigate('Place', {
          id: data.place_id,
          image: data.image,
        });
      }}>
      <Image
        source={{uri: data.image}}
        style={{
          width: 125,
          height: 125,
          borderRadius: 10,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.categoryText}>{data.name}</ListItem.Title>
        <View style={styles.statText}>
          {/*  add distance rounded to 2 decimal places */}
          <Stat icon="star" value={data.rating} color="#f3c829" />
          <Stat icon="walk" value={distance} />
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

const Categories = ({region}) => {
  const [cuisines, setcuisines] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(apiURL + '/cuisines')
      .then(response => response.json())
      .then(json => {
        setcuisines(json.cuisines);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <Button
        title="Solid"
        type="solid"
        loading
        color="#EFEFEF"
        loadingProps={{color: Colors.primary}}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <SectionList
          horizontal
          showsHorizontalScrollIndicator={false}
          sections={[
            {
              title: 'Categories',
              data: Object.keys(cuisines),
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Category name={item} image={cuisines[item]} region={region} />
          )}
        />
      </View>
    );
  }
};

export const Home: (navigation: any) => Node = ({navigation}) => {
  const [places, setPlaces] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [foryou, setForYou] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  // make region a context

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Geolocation.getCurrentPosition(
      position => {
        nativeToastAndroid.show('Location found', nativeToastAndroid.SHORT);
        fetch(
          `${apiURL}/restaurants/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setPlaces(json.restaurants);
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setLoading(false);
            setRefreshing(false);
          })
          .catch(error => console.error(error));
        fetch(
          `${apiURL}/attractions/?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setAttractions(json);
          })
          .catch(error => console.error(error));
        fetch(
          `${apiURL}/recommendations?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setForYou(json);
          })
          .catch(error => console.error(error));
      },
      error => setErrorMsg(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        nativeToastAndroid.show('Location found', nativeToastAndroid.SHORT);
        fetch(
          `${apiURL}/restaurants/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setPlaces(json.restaurants);
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setLoading(false);
          })
          .catch(error => console.error(error));
        fetch(
          `${apiURL}/attractions/?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setAttractions(json);
          })
          .catch(error => console.error(error));
        fetch(
          `${apiURL}/recommendations?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setForYou(json);
          })
          .catch(error => console.error(error));
        fetch(`${apiURL}/profile`)
          .then(response => response.json())
          .then(json => {
            setProfile(json);
          })
          .catch(error => console.error(error));
      },
      error => setErrorMsg(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.headerText} h3>
            Hello,{' '}
            {profile === null
              ? 'User'
              : `${profile.first_name} ${profile.last_name}`}
          </Text>
        </View>
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
        <View style={styles.row}>
          <Text style={styles.rowTitle} h3>
            Categories
          </Text>
        </View>
        {/* side scrollable categories */}
        <Categories region={region} />
        <View style={styles.row}>
          <Text style={styles.rowTitle} h3>
            For You
          </Text>
        </View>
        {/* side scrollable popular */}
        {loading ? (
          <Button
            title="Solid"
            type="solid"
            loading
            color="#EFEFEF"
            loadingProps={{color: Colors.primary}}
          />
        ) : (
          <View style={styles.container}>
            <SectionList
              horizontal
              showsHorizontalScrollIndicator={false}
              sections={[
                {
                  title: 'Places',
                  data: Object.keys(foryou),
                },
              ]}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Place data={foryou[item]} />}
            />
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.rowTitle} h3>
            Nearby
          </Text>
        </View>
        {/* side scrollable popular */}
        {loading ? (
          <Button
            title="Solid"
            type="solid"
            loading
            color="#EFEFEF"
            loadingProps={{color: Colors.primary}}
          />
        ) : (
          <View style={styles.container}>
            <SectionList
              horizontal
              showsHorizontalScrollIndicator={false}
              sections={[
                {
                  title: 'Places',
                  data: Object.keys(places),
                },
              ]}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Place data={places[item]} />}
            />
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.rowTitle} h3>
            Attractions
          </Text>
        </View>
        {/* side scrollable popular */}
        {loading ? (
          <Button
            title="Solid"
            type="solid"
            loading
            color="#EFEFEF"
            loadingProps={{color: Colors.primary}}
          />
        ) : (
          <View style={styles.container}>
            <SectionList
              horizontal
              showsHorizontalScrollIndicator={false}
              sections={[
                {
                  title: 'Attractions',
                  data: Object.keys(attractions),
                },
              ]}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <Place data={attractions[item]} attraction={true} />
              )}
            />
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.rowTitle} h3>
            Maps
          </Text>
        </View>
        {/* Add a map */}
        {loading ? (
          <Button
            title="Solid"
            type="solid"
            loading
            color="#EFEFEF"
            loadingProps={{color: Colors.primary}}
          />
        ) : (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={region}
              zoomControlEnabled={true}
              minZoomLevel={15}
              showsUserLocation={true}
              followsUserLocation={true}>
              {Object.keys(places).map((key, index) => {
                // console.log(places[key].coordinates);
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: places[key].coordinates[1],
                      longitude: places[key].coordinates[0],
                    }}
                    title={places[key].name}
                    description={places[key].address}
                  />
                );
              })}
            </MapView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
