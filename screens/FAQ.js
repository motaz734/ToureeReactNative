import React from 'react';
import {NavigationContext} from '@react-navigation/native';
import {apiURL} from '../config';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Header, Text} from '@rneui/themed';
import {Colors} from '../components';

export const FAQ: () => Node = ({route}) => {
  // let {query} = route.params;
  let navigationContext = React.useContext(NavigationContext);

  return (
    <SafeAreaView>
      <Header
        backgroundColor={Colors.primary}
        // add a back button
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => {
            navigationContext.goBack();
          },
        }}
        centerComponent={{
          text: 'Ethics Guidelines',
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
      />
      <ScrollView>
        <View
          style={{
            padding: 10,
            backgroundColor: Colors.white,
            borderRadius: 10,
            margin: 10,
            marginBottom: 125,
          }}>
          <Text h4>Behaviour and Local Customs</Text>
          <Text>
            These are often very different to what you are used to living with
            and adhering to. On some of our tours they change as the tour
            progresses. You should always respect local religions, beliefs and
            customs. Your tour leader will brief you on changes to accepted and
            recommended dress and behaviour as your tour progresses. Some
            examples include:
          </Text>
          <Text>
            Avoid eating or touching food and water with your left hand in Hindu
            and Muslim societies.
          </Text>
          <Text>
            Ensure that you cover up appropriately when entering holy places.
            Some countries such as Iran have strict rules on dress, especially
            for women, which should be respected. It can be easy to
            unintentionally cause offence through your dress so it is best to
            always dress conservatively. Ask your leader for advice if you are
            unsure.
          </Text>
          <Text>Avoid public displays of intimacy.</Text>
          <Text>
            Try and learn some basic words and phrases in the local language.
            Your effort will invariably be enthusiastically appreciated.
          </Text>
          <Text>
            Nearly all of us want to come back with some memorable photographs.
            You should always ask permission before taking photographs of
            people, holy places or rituals. Try to avoid using a flash when
            photographing paintings or textiles as this can cause damage to
            pigments.
          </Text>
          <Text h4>Local Laws</Text>
          <Text>
            As part of our booking conditions you are expected to respect and
            obey the law of the country or countries in which you are
            travelling.
          </Text>
          <Text>Drugs or firearms are not allowed on any of our tours.</Text>
          <Text>
            Alcohol is not permitted on some of our tours, as specified by your
            pre-departure information or your tour leader.
          </Text>
          <Text h4>Local Economies</Text>
          <Text>
            Our presence as a tour operator bringing tourists into foreign
            destinations has a significant impact on these locations. We have a
            great opportunity, and responsibility, to make sure that the money
            that we, and our clients, spend, goes to those who can benefit most
            from it. To this end we:
          </Text>
          <Text>
            Use local operatives and organisations as much as possible in the
            day to day running of our tours.
          </Text>
          <Text>
            Encourage our clients to use the services of local people and
            organisations during their tour (eg. washing clothes).
          </Text>
          <Text>
            Try to advise on alternatives to donations to beggars. Many people
            in the developing world have no alternative but to beg (and in these
            cases of course any donations are down to personal discretion) but
            many others are cashing in on the tourist. It is often of more
            benefit to a community for clients on one of our tours to communally
            give a donation to a local charity or school. Your leader will be
            able to advise or arrange for this.
          </Text>
          <Text>
            Understand the important place that bargaining holds in local
            cultures and economies. We do discourage agressive bargaining as
            what may seem a small amount to us that is fun to obtain through
            bargaining often makes a big difference to the vendor. However, not
            bargaining at all can also have detrimental effects on the local
            economy as the extra money you pay invariably does not go to the
            local producer.
          </Text>
          <Text>
            Respect the fact that tipping (and commission) is an integral part
            of a local economy and advise our clients accordingly.
          </Text>
          <Text>
            When shopping for food, we aim to buy as much as possible from local
            vendors and markets, and to try to ensure that we are buying local
            produce.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
