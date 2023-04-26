import {
  ImageBackground,
  Linking,
  SectionList,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {BackgroundContainer, Colors} from '../components';
import {Button, Header, Icon, Text} from '@rneui/themed';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {apiURL} from '../config';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {showLocation} from 'react-native-map-link';

const styles = StyleSheet.create({
  gradientOverlay: {
    // linear gradient overlay
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    padding: 20,
    color: Colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  description: {
    color: Colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 7.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

const Stat: () => Node = ({icon, value}) => {
  return (
    <View style={styles.subRow}>
      <Icon name={icon} type="material-community" color={Colors.white} />
      <Text
        style={{
          color: Colors.white,
          marginLeft: 5,
        }}>
        {value}
      </Text>
    </View>
  );
};

export const Place: () => Node = ({route}) => {
  const navigationContext = React.useContext(NavigationContext);
  const {id} = route.params;
  const [isFavourite, setIsFavourite] = React.useState(false);
  const [data, setData] = React.useState({});

  // get data from api
  React.useEffect(() => {
    fetch(`${apiURL}/restaurant/${id}`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setIsFavourite(json.favorite);
      })
      .catch(error => console.error(error));
  }, [id, setIsFavourite]);

  if (!data.name) {
    return <></>;
  } else {
    return (
      <>
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          <ImageBackground
            source={{uri: data.image}}
            style={{width: '100%', height: 300}}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.8)',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.7)',
              'rgba(0,0,0,1)',
            ]}
            style={styles.gradientOverlay}>
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
              rightComponent={
                <Icon
                  name={isFavourite ? 'heart' : 'heart-outline'}
                  type="material-community"
                  color={Colors.white}
                  size={30}
                  onPress={() => {
                    fetch(`${apiURL}/restaurant/${id}/favorite`, {
                      method: 'POST',
                    })
                      .then(response => response.json())
                      .then(json => {
                        nativeToastAndroid.show(
                          json.message,
                          nativeToastAndroid.SHORT,
                        );
                        setIsFavourite(!isFavourite);
                      })
                      .catch(error => console.error(error));
                  }}
                />
              }
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
              }}
              backgroundColor="grey"
            />
            <Text style={styles.title}>{data.name}</Text>
          </LinearGradient>
          <View style={styles.mainRow}>
            {data.cuisine && (
              <Stat icon="silverware-variant" value={data.cuisine} />
            )}
            <Stat icon="star" value={data.rating} />
          </View>
          <SectionList
            sections={[
              {
                title: 'Buttons',
                data: [
                  {
                    title: 'Description',
                  },
                  {
                    title: 'Opening Hours',
                  },
                  {
                    title: 'Gallery',
                    icon: 'image',
                    onPress: () => {
                      navigationContext.navigate('Gallery', {
                        images: data.gallery,
                      });
                    },
                  },
                  {
                    title: 'Ratings and Reviews',
                    icon: 'comment-text',
                    onPress: () => {
                      navigationContext.navigate('Reviews', {
                        reviews: data.reviews,
                        data: data,
                      });
                    },
                  },
                  {
                    title: `Price level: ${data.price_level}`,
                    icon: 'currency-usd',
                  },
                  {
                    title: 'Vegetarian Meals',
                    icon: 'leaf',
                  },
                  {
                    title: data.meals,
                    icon: 'silverware-fork-knife',
                  },
                  {
                    title: data.phone,
                    icon: 'phone',
                    onPress: () => {
                      // open the number in the phone app
                      Linking.openURL(`tel:${data.phone}`).then(r =>
                        console.log(r),
                      );
                    },
                  },
                  {
                    title: data.address,
                    icon: 'map-marker',
                    onPress: () => {
                      // open the address in the maps app
                      showLocation({
                        latitude: data.latitude,
                        longitude: data.longitude,
                        title: data.name,
                        googleForceLatLon: false,
                        googlePlaceId: data.place_id,
                        dialogTitle: 'Open in Maps',
                        dialogMessage: 'Choose an app to open this location',
                        cancelText: 'Cancel',
                      }).then(r => console.log(r));
                    },
                  },
                  {
                    title: data.website,
                    icon: 'web',
                    onPress: () => {
                      // open the website in the browser
                      Linking.openURL(data.website).then(r => console.log(r));
                    },
                  },
                  {
                    title: 'Share',
                    icon: 'share',
                    onPress: () => {
                      // share the restaurant
                      Share.share({
                        message: `Check out ${data.name} on the Foodie App!`,
                      }).then(r => console.log(r));
                    },
                  },
                ],
              },
            ]}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => {
              if (item.title === 'Description') {
                if (!data.description) {
                  return <></>;
                }
                return (
                  <Text style={styles.description}>{data.description}</Text>
                );
              }
              if (item.title === 'Opening Hours') {
                if (!data.opening_hours) {
                  return <></>;
                }
                return (
                  <Text style={styles.description}>
                    Opening Hours: {'\n'}
                    {data.opening_hours}
                  </Text>
                );
              }
              if (item.icon === 'web' && !data.website) {
                return <></>;
              }
              if (item.icon === 'phone' && !data.phone) {
                return <></>;
              }
              if (item.icon === 'map-marker' && !data.address) {
                return <></>;
              }
              if (item.icon === 'currency-usd' && !data.price_level) {
                return <></>;
              }
              if (item.icon === 'leaf' && !data.vegan_friendly) {
                return <></>;
              }
              if (item.icon === 'silverware-fork-knife' && !data.meals) {
                return <></>;
              }
              return (
                <Button
                  title={item.title}
                  onPress={item.onPress}
                  containerStyle={{marginHorizontal: 20, marginVertical: 10}}
                  buttonStyle={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                  titleStyle={{flex: 1}}
                  radius={7.5}
                  color={Colors.darker}
                  icon={
                    <Icon
                      name={item.icon}
                      type="material-community"
                      color={Colors.white}
                    />
                  }
                />
              );
            }}
          />
          <Button
            title="Make a Reservation"
            onPress={() => navigationContext.navigate('Reservation')}
            containerStyle={{marginHorizontal: 20, marginVertical: 10}}
            buttonStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
            titleStyle={{flex: 1}}
            radius={7.5}
            color={Colors.primary}
            icon={
              <Icon
                name="calendar-clock"
                type="material-community"
                color={Colors.white}
              />
            }
          />
        </View>
      </>
    );
  }
};
