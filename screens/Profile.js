import {SectionList, StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Button, Icon, Image, Input, ListItem, Text} from '@rneui/themed';
import {AuthContext} from '../App';
import SuperTokens from 'supertokens-react-native';
import {apiURL} from '../config';
import Geolocation from '@react-native-community/geolocation';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {Colors} from '../components';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '95%',
    borderRadius: 10,
  },
  buttonStyle: {
    justifyContent: 'flex-start',
    paddingStart: '35%',
  },
  buttonText: {
    marginLeft: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
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
    width: '90%',
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
  map: {
    width: '100%',
    height: 500,
  },
  subRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});

const signOut = (setIsLoggedIn, navigation) => {
  SuperTokens.signOut();
  setIsLoggedIn(false);
  navigation.navigate('Home');
};

const Place = ({data}) => {
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

function getMyReviews(navigation) {
  fetch(`${apiURL}/reviews/my_reviews/`)
    .then(response => response.json())
    .then(json => {
      navigation.navigate('Reviews', {
        reviews: json,
        data: {title: 'My Reviews'},
      });
    })
    .catch(error => console.error(error));
}

export const Profile: (navigation: any) => Node = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useContext(AuthContext);
  const [name, setName] = React.useState('Name');

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center',
          // backgroundColor: 'white',
          height: '90%',
          position: 'absolute',
          width: '100%',
          top: '20%',
          borderRadius: 20,
        }}>
        {/*<Image style={styles.profilePic} />*/}

        {/*<Text>{name}</Text>*/}

        <Button
          containerStyle={styles.button}
          color={Colors.primary}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          icon={<Icon name="cog" type="material-community" color="white" />}
        />
        <Button
          containerStyle={styles.button}
          color={Colors.primary}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="My Reviews"
          onPress={() => getMyReviews(navigation)}
          icon={<Icon name="comment" type="material-community" color="white" />}
        />
        <Button
          containerStyle={styles.button}
          color={Colors.primary}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Support"
          onPress={() => navigation.navigate('Support')}
          icon={<Icon name="headset" type="material-community" color="white" />}
        />
        <Button
          containerStyle={styles.button}
          color={Colors.primary}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="About"
          onPress={() => navigation.navigate('About')}
          icon={
            <Icon name="information" type="material-community" color="white" />
          }
        />
        <Button
          containerStyle={styles.button}
          color={Colors.primary}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Ethics Guidelines"
          onPress={() => navigation.navigate('FAQ')}
          icon={<Icon name="help" type="material-community" color="white" />}
        />
        <Button
          containerStyle={styles.button}
          color={Colors.primary}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Sign Out"
          onPress={() => signOut(setIsLoggedIn, navigation)}
          icon={<Icon name="logout" type="material-community" color="white" />}
        />
      </View>
    </>
  );
};
