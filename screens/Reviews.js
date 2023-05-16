import {View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {Button, Header, Icon, Input, ListItem, Text} from '@rneui/themed';
import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Colors} from '../components';
import LinearGradient from 'react-native-linear-gradient';
import {AirbnbRating} from '@rneui/base';
import NativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {apiURL} from '../config';

const styles = StyleSheet.create({
  authorName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewText: {
    color: Colors.white,
    fontSize: 16,
  },
  reviewTime: {
    fontSize: 14,
    color: 'grey',
  },
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
  description: {
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
export const Reviews: () => Node = ({route}) => {
  const [switchToAddReview, setSwitchToAddReview] = React.useState(false);
  const [reviewText, setReviewText] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(0);
  const {reviews, data} = route.params;
  let navigationContext = React.useContext(NavigationContext);
  alert(JSON.stringify(data));
  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      {data.image && (
        <ImageBackground
          source={{uri: data.image}}
          style={{width: '100%', height: 300}}
        />
      )}
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
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
          }}
          backgroundColor="grey"
        />
        <Text style={styles.title}>{data.name}</Text>
      </LinearGradient>
      {switchToAddReview ? (
        <>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Input
              placeholder="Leave a Review"
              multiline={true}
              numberOfLines={4}
              containerStyle={{
                width: '90%',
                marginHorizontal: 20,
                marginVertical: 10,
                padding: 10,
                borderRadius: 7.5,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
              inputStyle={{
                color: Colors.white,
                textAlignVertical: 'top',
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setReviewText(text)}
              value={reviewText}
            />
            <AirbnbRating
              count={5}
              defaultRating={0}
              size={20}
              showRating={false}
              onFinishRating={rating => setReviewRating(rating)}
            />
          </View>
          <Button
            title="Submit Review"
            onPress={() => {
              fetch(
                `${apiURL}/reviews/${data.place_id}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    rating: reviewRating,
                    text: reviewText,
                  }),
                },
                {
                  mode: 'cors',
                },
              ).then(response => {
                if (response.status === 200) {
                  nativeToastAndroid.show(
                    'Review Submitted',
                    nativeToastAndroid.SHORT,
                  );
                  setSwitchToAddReview(!switchToAddReview);
                } else {
                  NativeToastAndroid.show('Error Submitting Review', 1000);
                }
              });
            }}
            containerStyle={{marginHorizontal: 20, marginVertical: 10}}
            buttonStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
            titleStyle={{flex: 1}}
            radius={7.5}
            color={Colors.primary}
            icon={
              <Icon
                name="send"
                type="material-community"
                color={Colors.white}
              />
            }
          />
        </>
      ) : (
        <>
          <FlatList
            data={reviews}
            renderItem={({item}) => (
              <ListItem
                containerStyle={{
                  backgroundColor: Colors.darker,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <ListItem.Content>
                  <ListItem.Title style={styles.authorName}>
                    {item.author_name}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <AirbnbRating
                      count={5}
                      defaultRating={item.rating}
                      size={12.5}
                      showRating={false}
                      isDisabled={true}
                    />
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.reviewText}>
                    {item.text}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.reviewTime}>
                    {item.relative_time_description}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
          <Button
            title="Leave a Review"
            onPress={() => {
              setSwitchToAddReview(!switchToAddReview);
            }}
            containerStyle={{marginHorizontal: 20, marginVertical: 10}}
            buttonStyle={{flexDirection: 'row', justifyContent: 'flex-start'}}
            titleStyle={{flex: 1}}
            radius={7.5}
            color={Colors.primary}
            icon={
              <Icon
                name="plus"
                type="material-community"
                color={Colors.white}
              />
            }
          />
        </>
      )}
    </View>
  );
};
