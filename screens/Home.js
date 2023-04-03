import {SafeAreaView, SectionList, StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Colors, CustomHeader} from '../components';
import {Icon, Image, ListItem, SearchBar, Text, Avatar} from '@rneui/themed';

const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.dark,
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
    marginTop: 5,
    fontWeight: 'bold',
  },
  placeContainer: {
    width: 150,
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
});

const Category = ({name, image}) => {
  return (
    <ListItem containerStyle={styles.categoryView}>
      <Avatar
        activeOpacity={0.2}
        avatarStyle={{}}
        containerStyle={styles.categoryPicContainer}
        icon={{}}
        iconStyle={{}}
        imageProps={{}}
        onLongPress={() => {}}
        onPress={() => {}}
        overlayContainerStyle={{}}
        placeholderStyle={{}}
        rounded
        size="large"
        source={{uri: image}}
        title="P"
        titleStyle={{}}
      />
      <ListItem.Content>
        <ListItem.Subtitle style={styles.categoryText}>
          {name}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const Place = ({name, image}) => {
  return (
    <ListItem containerStyle={styles.placeContainer}>
      <Image
        source={{uri: image}}
        style={{
          width: 125,
          height: 125,
          borderRadius: 10,
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

export const Home: () => Node = () => {
  const navigation = React.useContext(NavigationContext);

  const cuisines = {
    American: 'https://placekitten.com/75/75',
    Chinese: 'https://placekitten.com/75/75',
    Indian: 'https://placekitten.com/75/75',
    Italian: 'https://placekitten.com/75/75',
    Japanese: 'https://placekitten.com/75/75',
    Mexican: 'https://placekitten.com/75/75',
    Thai: 'https://placekitten.com/75/75',
    Egyptian: 'https://placekitten.com/75/75',
  };

  const places = {
    'Burger King': 'https://placekitten.com/250/250',
    McDonalds: 'https://placekitten.com/250/250',
    KFC: 'https://placekitten.com/250/250',
  };

  return (
    <>
      <View style={styles.header}>
        <Text>Hello Name</Text>
        <Text>Current Location</Text>
        <Icon name="notifications" />
        <Image
          source={{
            uri: 'https://placekitten.com/250/250',
          }}
          style={styles.profilePic}
        />
      </View>
      <SearchBar
        placeholder="Search for places"
        onChangeText={() => {}}
        value=""
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
        inputStyle={{color: Colors.white}}
      />
      <View style={styles.row}>
        <Text style={styles.rowTitle} h3>
          Categories
        </Text>
        <Text style={styles.rowSubtext}>View all</Text>
      </View>
      {/* side scrollable categories */}
      <View style={styles.container}>
        <SectionList
          horizontal
          showsHorizontalScrollIndicator={false}
          sections={[
            {
              title: 'Cuisines',
              data: Object.keys(cuisines),
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Category name={item} image={cuisines[item]} />
          )}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowTitle} h3>
          Popular
        </Text>
        <Text style={styles.rowSubtext}>View all</Text>
      </View>
      {/* side scrollable categories */}
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
          renderItem={({item}) => <Place name={item} image={places[item]} />}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowTitle} h3>
          Map
        </Text>
      </View>
      {/* Add a map */}
    </>
  );
};
