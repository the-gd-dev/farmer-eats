import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeAreaContainer from '../../component/SafeAreaContainer';
import {onboarding1, onboarding2, onboarding3} from '../../assets';
import RoundButton from '../../component/RoundButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingContent = [
  {
    id: 1,
    image_source: onboarding1,
    title: 'Quality',
    desc: `Sell your farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.`,
    color: 'rgba(94, 162, 95, 1)',
  },
  {
    id: 2,
    image_source: onboarding2,
    title: 'Convenient',
    desc: `Our team of delivery drivers will make sure your orders are picked up on time and promptly delivered to your customers.`,
    color: 'rgba(213, 113, 91, 1)',
  },
  {
    id: 3,
    title: 'Local',
    desc: `We love the earth and know you do too! Join us in reducing our local carbon footprint one order at a time.`,
    image_source: onboarding3,
    color: 'rgba(248, 197, 105, 1)',
  },
];

const width = Dimensions.get('screen').width;

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView | null>(null);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * index,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (currentIndex < 3) {
      scrollToIndex(currentIndex);
    }
  }, [currentIndex]);

  const navigateToLogin = async () => {
    try {
      await AsyncStorage.setItem('@onboarding-done', 'true');
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.error('Failed to set data to AsyncStorage', error);
    }
  };

  return (
    <SafeAreaContainer
      isShowTitle={false}
      backgroundColor={onboardingContent[currentIndex].color}>
      <View style={{marginHorizontal: -20}}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.scrollContainer}>
          {onboardingContent.map((onboarding, index) => (
            <Image
              key={index}
              source={onboarding.image_source}
              style={{width: Dimensions.get('screen').width}}
            />
          ))}
        </ScrollView>
        {/* Sheet */}
        <View style={styles.bottomSheet}>
          <View>
            <Text style={styles.heading}>
              {onboardingContent[currentIndex].title}
            </Text>
            <Text style={styles.desc}>
              {onboardingContent[currentIndex].desc}
            </Text>
          </View>
          <View style={styles.barContainer}>
            <View
              style={[styles.bar, currentIndex === 0 ? styles.activeBar : {}]}
            />
            <View
              style={[styles.bar, currentIndex === 1 ? styles.activeBar : {}]}
            />
            <View
              style={[styles.bar, currentIndex === 2 ? styles.activeBar : {}]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <RoundButton
              onPress={() => {
                if (currentIndex < 2) {
                  setCurrentIndex(prevIndex => prevIndex + 1);
                } else {
                  navigateToLogin();
                }
              }}
              btnStyle={{
                maxWidth: '100%',
                paddingHorizontal: 25,
                backgroundColor: onboardingContent[currentIndex].color,
              }}
              btnText="Join the movement!"
            />
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.label}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'flex-start',
  },
  barContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  bottomSheet: {
    backgroundColor: 'white',
    height: '56%',
    width: Dimensions.get('screen').width,
    borderTopStartRadius: 49,
    borderTopEndRadius: 49,
    paddingTop: Dimensions.get('screen').height / 25,
    paddingBottom: Dimensions.get('screen').height / 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20.45,
    textAlign: 'left',
    color: '#000000',
    textDecorationLine: 'underline',
  },
  desc: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20.45,
    textAlign: 'center',
    color: '#444444',
    height: 65,
    maxWidth: '85%',
  },
  heading: {
    height: 60,
    fontFamily: 'Be Vietnam',
    fontSize: 24,
    color: '#333333',
    fontWeight: '700',
    lineHeight: 35.06,
    textAlign: 'center',
  },
  bar: {
    width: 7,
    height: 7,
    backgroundColor: 'rgba(38, 28, 18, 1)',
    borderRadius: 46,
  },
  activeBar: {
    width: 16,
  },
});
