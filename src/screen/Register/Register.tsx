import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RoundButton from '../../component/RoundButton';
import SafeAreaContainer from '../../component/SafeAreaContainer';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import {backArrow} from '../../assets';
import RegisterSuccess from './Steps/RegisterSuccess';
import {useNavigation} from '@react-navigation/native';
import {RegisterationData} from './register-types';
import {apiRegister} from '../../apis';
const width = Dimensions.get('screen').width - 40;

const Register = () => {
  const navigation: any = useNavigation();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<RegisterationData>({
    role: 'farmer',
    business_hours: {
      sun: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
    },
  });

  useEffect(() => {
    console.log('registerData----->', registerData);
  }, [registerData]);

  const steps = [
    {
      id: 1,
      slug: 'step_1',
      Component: Step1,
    },
    {
      id: 2,
      slug: 'step_2',
      Component: Step2,
    },
    {
      id: 3,
      slug: 'step_3',
      Component: Step3,
    },
    {
      id: 4,
      slug: 'step_4',
      Component: Step4,
    },
    {
      id: 5,
      slug: 'register_success',
      Component: RegisterSuccess,
    },
  ];

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * index,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (currentIndex < 5) {
      scrollToIndex(currentIndex);
    }
  }, [currentIndex]);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response: any = await apiRegister(registerData);
      if (response.data.message) {
        Alert.alert(
          '',
          response.data.message,
          [
            {
              text: 'OK',
              onPress: () => {
                setCurrentIndex(prev => prev + 1);
              },
            },
          ],
          {cancelable: false},
        );
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaContainer isShowTitle={currentIndex !== 4}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {steps.map((step, index) => (
            <View key={step.id} style={{width: width}}>
              {step.Component({
                regData: registerData,
                handleRegisterData: (v: any) => setRegisterData(v),
              })}
            </View>
          ))}
        </ScrollView>
        <View>
          <View style={styles.btnContainer}>
            {currentIndex == 0 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            )}

            {currentIndex > 0 && currentIndex !== 4 && (
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex((prevIndex: number) => prevIndex - 1);
                }}>
                <Image
                  source={backArrow}
                  style={{width: 26, height: 18, marginTop: 17}}
                />
              </TouchableOpacity>
            )}

            <RoundButton
              isDisabled={loading}
              btnStyle={{
                maxWidth: currentIndex > 3 ? '100%' : 220,
              }}
              btnText={
                currentIndex < 3
                  ? 'Continue'
                  : currentIndex === 4
                  ? 'Got It!'
                  : 'SignUp'
              }
              onPress={() => {
                if (currentIndex === 4) {
                  navigation.navigate('Login');
                }
                if (currentIndex < 3) {
                  setCurrentIndex((prevIndex: number) => prevIndex + 1);
                }
                if (currentIndex === 3) {
                  handleSignUp();
                }
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  scrollContainer: {
    alignItems: 'flex-start',
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
    backgroundColor: 'red',
  },
  container: {flex: 1, justifyContent: 'flex-start', marginTop: '4%'},
  welcomeText: {
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 46.75,
    marginBottom: '8%',
  },
  loginLink: {
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 17,
    textDecorationLine: 'underline',
  },
  label: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20.45,
    textAlign: 'left',
    color: '#0000004D',
  },
});
