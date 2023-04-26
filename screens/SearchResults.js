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
import {Header, Icon, Image, ListItem} from '@rneui/themed';
import nativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';
import {Colors} from '../components';

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
            {restaurant.cuisine}
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

export const SearchResults: () => Node = ({route}) => {
  // let {query} = route.params;
  let navigationContext = React.useContext(NavigationContext);
  // let results = [
  //   {
  //     place_id: 'ChIJaywaszI5WBQR-8P_9OdlJpQ',
  //     name: 'Bab El Hadid',
  //     address: '19 Street 233, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.2783435, 29.9606553],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jkrGGej1z5aXMRYfewYeSGwqut8CRLbj9eXIPjFoBdPx-Oi_4QjGThIQiQCqU5MdiruXtgGNQbBcN39qlvSXjQqu91pgzL4U1Jo68iKBWh6fSPunsD8_ngsKsrPWooSRwRCKn3vo8vFctbH67-_jEYErpAuBVZ-pOSUV_78KLKBRo10&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.1,
  //     distance: 37.095115199515625,
  //   },
  //   {
  //     place_id: 'ChIJJZjcuMM5WBQRkbJbNbtVRkY',
  //     name: 'الواحي',
  //     address: '19 Street 233, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.2784151, 29.9606501],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jmLC1HsJTW09qnEkVBafdFlXnMvKEAIpCLpNMMg-rn53o0k29MlDNOCvPxBlCFzK-qe2gFO8uDfjrL3_YmO_YLTcdNCVz6xCiBp6piw9BSs_Dr2jyUC9wU7cl2vP3fmy_INlvRr8om-SURFZMGsB-5i-albJ0Zb6qoPaFTv5hAVHegl&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.5,
  //     distance: 37.76114704959332,
  //   },
  //   {
  //     place_id: 'ChIJiVvsvmw4WBQR_QwN10oBhLs',
  //     name: 'دار دمشق',
  //     address: 'X76H+7FR, Street 233, مساكن المعادى, قسم المعادى',
  //     coordinates: [31.278628, 29.9607357],
  //     image: null,
  //     cuisine: null,
  //     rating: 4.5,
  //     distance: 55.20669560930337,
  //   },
  //   {
  //     place_id: 'ChIJu8Mzy2w4WBQREh6xU8usCyM',
  //     name: '餃子屋 ダックハウス',
  //     address: 'X75H+WCX, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.2786189, 29.9598573],
  //     image: null,
  //     cuisine: null,
  //     rating: 4.5,
  //     distance: 59.82380593304649,
  //   },
  //   {
  //     place_id: 'ChIJ46ddIxk5WBQRlhf9MVR-p_E',
  //     name: '烤鸭坊',
  //     address: '233،, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.2781724, 29.9597879],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jmopYoJophYgQ800NwvaggYBiE_1a_qKVQcN3uvgrnjdkLzNFMdD5G3X1MhaWaUNR1SEmzVJiSER7MA1uyyI-_NctremvstUHMr_JCaA7rITzkTYstzyAGiGnJrs-gJpOu3PXYwasHgeboLAatmOK3tQnOfpcQYzMLWavSY-R84RBjp&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.4,
  //     distance: 61.06328915446414,
  //   },
  //   {
  //     place_id: 'ChIJO2X-GW45WBQROcx-CiAoCBg',
  //     name: 'Bun Shawarma',
  //     address: '19, 233 St, Degla Square, Maadi',
  //     coordinates: [31.2782859, 29.9609049],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jm753VRZMt06L4gnbT1NgLOO_me3GUDG1TnqSJGNVHh0lLJwqJK2Dqq5OuptNbOCuV1GoQEzgqUzzhSxDsbJim6HcCA1zybXWECEG__JAWhqbxG58exLF3T5RIjA2QAAQ8k98hLCy3tqKNW6i1rukdrNagJ6-y44U32mtApyWcIKp2P&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.8,
  //     distance: 64.78104324086252,
  //   },
  //   {
  //     place_id: 'ChIJn6InFpY5WBQRqQmrA4edexk',
  //     name: 'Sweets Fun Restaurant & Cafe',
  //     address: 'X76H+838, Street 232, Maadi as Sarayat Al Gharbeyah, digla',
  //     coordinates: [31.2777142, 29.96079559999999],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jmwiyt1DY-gK8bA4iNh8LjkgnzRurO5isxR-lqHldIF4ZrEcViQj_uhBuH8MfE5tFkrSecxSWr73OBUKjNOXI-1VT2xob-AB-gEp3ogrjN7cudu8M9FilzBllymrs6-JwymyAEQ5bPZCI7jAGePP9PMgDQRgP9K9KSs0RxZKN-4qRYz&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 5,
  //     distance: 77.88188122175227,
  //   },
  //   {
  //     place_id: 'ChIJ6W-yymw4WBQR1X_rrtZzobI',
  //     name: 'Fox Coffee & Restaurant',
  //     address: '233، معادي السرايات الغربية، المعادي،',
  //     coordinates: [31.27815089999999, 29.95963399999999],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jnkGQ6uC8VvfHxt10xY-qJElx0w94RAF9aKpE7CD82bhCTxYxhLuHvvp-cfLpdxojKQ7Mr6nmttGySYvJUJiD-FeZoJCrt0AWkKfKGKMTVclmNySuoZWuDie8RczT0g3SMkLWgvPqLFHqKZzjF1g_I_26SLjSOYXXRiVX85UrfJ_6q1&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.3,
  //     distance: 78.2548766775569,
  //   },
  //   {
  //     place_id: 'ChIJ3eYwXA04WBQR7IlToJY9F6E',
  //     name: 'Crave',
  //     address: 'Street 213, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.27729660000001, 29.96049590000001],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jnMUYKXSZlCQK6G53yfXPqu6fSW2eKT0aKKR1hBo-34YpTjJqvwL3Qt6ypjHjy0r15p2LB9uxC4xbBMf7EOcfQTUEgqP_uGV9TqLygDxQS3731SzP2BAU2MxlWQbC9wEdqw_unWkmJ2ZZPQZijZKHCkZyyvvR-hod2frM6xGVV8mUKR&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.3,
  //     distance: 99.6056892486904,
  //   },
  //   {
  //     place_id: 'ChIJ743C3Gw4WBQRfV3H6VHiMaQ',
  //     name: 'KoKio fried chicken',
  //     address: 'X76H+C24, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.27757260000001, 29.9610192],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jntKfMKgrXyZhoHyFpJHepad0PGg1lOsDq4rQNuIKAkU7PnoqwvsJ0eOflffQ8PvrkdbcEDuq2sCSIw9qMJGL_lQOUsWUSd8yyyCwmy6_QixYw28SeiW0euoMCUEyfei1M1G79wfqIDhV_OhcDGZL507iIK7szFHX9A98WPKmvbB2T4&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: 'Korean',
  //     rating: 4.3,
  //     distance: 105.15787857737809,
  //   },
  //   {
  //     place_id: 'ChIJYSUiK204WBQRd08AZN_rcFE',
  //     name: "Marny's",
  //     address: '٣٢ Street 213, ثكنات, Maadi',
  //     coordinates: [31.2771528, 29.9603194],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jn_MKsW7W8rxeR1pK5XLse5Ju0g8NiQCNSrLWJn0Tenpu7EnuX2pnCMrMQ7MO0AbOIPi1s08IZuNb7hhD2QE0IBJPxIbRmOB-JVpWZhD8qZImrMa3B0tXpE_fpRZ2Fie6qX7n50c_gZBK3QrLfMPFE8rmGzgHhyov6dv0BU8HKV8Vvq&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.3,
  //     distance: 111.60524238432542,
  //   },
  //   {
  //     place_id: 'ChIJoaKrB0k5WBQROPD6uGKazpE',
  //     name: 'Cairo 80th Grills كبابجي القاهرة 80',
  //     address: 'Villa 36, 213 Street, Degla Square, قسم المعادي',
  //     coordinates: [31.2771435, 29.9603475],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jlnvvXUg2xb-OChSM748Lcry661O22lTd_mr1-XpzMk6G-DZqKJFu48yGebNbVW9dak-9_7C1og5N3OCwt7gMs6sRgfKbfTP3bQ10pVSbV2SAa_fBAGCUM7xoKbnG8b0mGwNeMlsWxznXRRoXqsx_5XDA1yiVi3wKG8Sb5-epntA9Ye&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 3.4,
  //     distance: 112.53345233948824,
  //   },
  //   {
  //     place_id: 'ChIJ3UuKKRM4WBQRZO4yVy-oXOc',
  //     name: 'Sizzler Steak House (Maadi)',
  //     address: '17 Road 231 Maadi Degla',
  //     coordinates: [31.2770785, 29.9599113],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jmgtRuBzr_p6k_-C-K9DaUJIaoiCsq34QerjqNoMxmeKyAhomt3FitlvhLG-rpsLfYrmoUMi8FqPmlzjj-GbFyTItt6MxpjCFyasjax_K_cIafs7aXTqRSgnIR9uW-OkSXMWzoFkslQFhVN7e0qYbr5jGIpr-OO8n4Vvxp6_98Civ_S&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.6,
  //     distance: 127.31924713758215,
  //   },
  //   {
  //     place_id: 'ChIJBbLkJhM4WBQRzvmubA20ukc',
  //     name: 'La Rosa',
  //     address: '19 Street 231, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.2771357, 29.9597112],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jlTu-SK3PCYxKwPKairEZK6oiUIpAEAwv6ogoOai7pjs-t5RzSKVNvGIIu65BOKX72xgFcQdPP_EVh_qEiPfDezVFWyVKpqNQEVjv7hKdFRSYUBlHUxF3w2lVWXoiiW_6metI8_zBL2kggst0eP-t7WNujCKUyldGpKV7GUPbd-uk19&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.3,
  //     distance: 132.17328483217864,
  //   },
  //   {
  //     place_id: 'ChIJ0ap2fCM5WBQR3Dh5zTZ5j2c',
  //     name: 'كبابجي القاهرة 70 Cairo 70th Grills',
  //     address: 'Street 213',
  //     coordinates: [31.2769339, 29.9602742],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jkweBJTr6pf51Kde6EjPlZZ-9AyUYJpwZPo5Yr6AJk_Xuq2fzyY9qWByOYPGgY9dTNPblX-ZWHC6Z3nYedzUOPyMIwaSi67AbS5nbwrMb1XYOa9Pz_d4IgjVMDrrYwMkT_CU9TkdpOqTox14AyhxGM3CScdiuo_R1cVEJ7mrOuSYFxH&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.4,
  //     distance: 132.8285446606394,
  //   },
  //   {
  //     place_id: 'ChIJFZXQxcY5WBQRqJSpLOYYLOI',
  //     name: 'Cairo kitchen maadi',
  //     address: 'Street 231, Maadi',
  //     coordinates: [31.2770765, 29.9597636],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jnYMY-o8SZ3c3bbkHGRBLdr461-QXKAj453FZ2y1ReOHDwmvR7ohS0CyUnEhWkkvz_qji_cbRYMcdkCyas7OALG-stD5iLyDp2lER1tbEm53foZviXNPedPmmNDecPW_aU3Qi6gxj6W-rDF9ZkzeffJUieMMPZPXbVPUapFR3HDUyjX&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.5,
  //     distance: 134.29323852681162,
  //   },
  //   {
  //     place_id: 'ChIJRaLiNxM4WBQRhQsszG5EXmc',
  //     name: 'Munch & Bagel',
  //     address: '6 rd. 233, Maadi as Sarayat Al Gharbeyah, Maadi',
  //     coordinates: [31.2783709, 29.95911529999999],
  //     image: null,
  //     cuisine: null,
  //     rating: 3,
  //     distance: 134.60507551669403,
  //   },
  //   {
  //     place_id: 'ChIJ69uLOhM4WBQRXX8n4-LOG68',
  //     name: 'كازينو الحمام',
  //     address: '٣٥ شارع ٢٣٢, دجلة, Maadi',
  //     coordinates: [31.2778213, 29.959152],
  //     image: null,
  //     cuisine: null,
  //     rating: 4.6,
  //     distance: 138.64840353393396,
  //   },
  //   {
  //     place_id: 'ChIJZydX7B05WBQRQ13Fc-uzs9U',
  //     name: 'CHEERA BITES , COFFEE & TALES',
  //     address: '35 Street 232, دجلة, Maadi',
  //     coordinates: [31.2777017, 29.95912],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jnQXltG-rVv_whCae40L6BUQ_BBOPyvFXnkU9XxiFJn8oHsHmPRKArzUimLNtz5VW6UsncDxNHbKsS2LUByp2wLxqJhjb0iAJtDH1CC3zjBZKdiowu-avdT4ZLJSx8ezfkeyoP2mJx8RL8l3WtfXjbUMwTKfv8TbGZLHBqRiWe4Ci-4&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.8,
  //     distance: 146.2374564423765,
  //   },
  //   {
  //     place_id: 'ChIJFyU4KG04WBQRpfqNCYmp1B8',
  //     name: 'Al Dayaa',
  //     address: '33 Street 231, Maadi',
  //     coordinates: [31.276757, 29.96073500000001],
  //     image:
  //       'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=AUjq9jmPKwK80M7Hcr8Xlv06AoKKBJGare0bXcGygZp3tU7uXgIewsmqDgjhRBbYr1i-9r162AsOovsWHm4tV1hRzCGrYoHlSL13YeUeRVYObY7wjhpb5mzNVgSujMRsBhP6l7H0AJ6jN9j7WAaggc6gUiHOUf84RZfqdfH4oLrnulvarfCh&key=AIzaSyAFHx5_gfQrn1T5Xq1HEw6c6XK6Y61Lj1E',
  //     cuisine: null,
  //     rating: 4.2,
  //     distance: 156.63018543194016,
  //   },
  // ];
  let {results} = route.params;
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
        backgroundColor="grey"
      />
      <ScrollView>
        {results.map((restaurant, index) => (
          <Result key={index} restaurant={restaurant} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
