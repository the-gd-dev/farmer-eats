import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {call} from '../../assets';
import Input from '../../component/Input';
import RoundButton from '../../component/RoundButton';
import SafeAreaContainer from '../../component/SafeAreaContainer';
import {forgotPassword} from '../../apis';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = () => {
  const navigation: any = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone) {
      Alert.alert('Please enter phone.');
      return;
    }
    try {
      setLoading(true);
      const response = await forgotPassword({
        mobile: phone,
      });
      if (response.data.message === 'OTP sent to your mobile.') {
        Alert.alert(
          '',
          response.data.message,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('VerifyOTP');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(response.data.message);
      }

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <SafeAreaContainer>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Forgot Password?</Text>
          <View style={{flexDirection: 'row', gap: 5, marginTop: 20}}>
            <Text style={styles.label}>Remember your pasword?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.label, {color: '#D5715B'}]}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '20%'}}>
            <Input
              imageUri={call}
              placeholder="Phone Number"
              onChange={(num: any) => setPhone(num)}
            />
            <RoundButton
              btnText="Send Code"
              onPress={handleSubmit}
              isDisabled={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  speratorText: {
    fontFamily: 'Be Vietnam',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14.61,
    textAlign: 'center',
    color: 'rgba(38, 28, 18, 0.3)',
  },
  sperator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  container: {flex: 1, justifyContent: 'flex-start', marginTop: '26%'},
  welcomeText: {
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    fontWeight: '700',
    color: '#444',
    lineHeight: 46.75,
  },
  label: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20.45,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.3)',
  },
});
