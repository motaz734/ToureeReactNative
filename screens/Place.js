import {ImageBackground, SectionList, StyleSheet, View} from 'react-native';
import React from 'react';
import {BackgroundContainer, Colors} from '../components';
import {Button, Icon, Text} from '@rneui/themed';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

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
  },
  title: {
    padding: 20,
    color: Colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 200,
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

export const Place: () => Node = () => {
  const navigation = React.useContext(NavigationContext);
  const restaurant = {
    name: 'Restaurant Name',
    address: 'Address',
    phone: 'Phone',
    website: 'Website',
    hours: 'Hours',
    description: 'Description',
    image: 'https://placekitten.com/300/300',
    cuisine: 'Cuisine',
    rating: 'Rating',
    menu: ['Menu Item 1', 'Menu Item 2', 'Menu Item 3'],
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: Colors.black}}>
        <ImageBackground
          source={{uri: restaurant.image}}
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
          <Text style={styles.title}>{restaurant.name}</Text>
        </LinearGradient>
        <View style={styles.mainRow}>
          <Stat icon="silverware-variant" value={restaurant.cuisine} />
          <Stat icon="star" value={restaurant.rating} />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
        <SectionList
          sections={[
            {
              title: 'Buttons',
              data: [
                {
                  title: 'Menu',
                  icon: 'silverware-fork-knife',
                  onPress: () => navigation.navigate('Menu'),
                },
                {
                  title: 'Branches',
                  icon: 'map-marker',
                  onPress: () => navigation.navigate('Map'),
                },
                {
                  title: 'Gallery',
                  icon: 'image',
                  onPress: () => navigation.navigate('Gallery'),
                },
                {
                  title: 'Ratings and Reviews',
                  icon: 'comment-text',
                  onPress: () => navigation.navigate('Reviews'),
                },
                {
                  title: 'Contacts',
                  icon: 'phone',
                  onPress: () => navigation.navigate('Contacts'),
                },
              ],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Button
              title={item.title}
              onPress={item.onPress}
              containerStyle={{marginHorizontal: 20, marginVertical: 10}}
              buttonStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
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
          )}
        />
        <Button
          title="Make a Reservation"
          onPress={() => navigation.navigate('Reservation')}
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
};
