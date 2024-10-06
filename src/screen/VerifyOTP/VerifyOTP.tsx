import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import SafeAreaContainer from '../../component/SafeAreaContainer';
import RoundButton from '../../component/RoundButton';
import Input from '../../component/Input';
import {useNavigation} from '@react-navigation/native';
import {verifyOTP} from '../../apis';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const VerifyOTP = () => {
  const navigation: any = useNavigation();
  const [otp, setOtp] = useState(Array(5).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically move to the next input when a digit is entered
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to the previous input when backspace is pressed
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!otp.join('')) {
      Alert.alert('OTP required.', `Please enter your OTP.`);
    } else {
      try {
        setLoading(true);
        const response = await verifyOTP({
          otp: otp.join(''),
        });
        if (response.data.message === 'OTP verified successful.') {
          Alert.alert(
            '',
            response.data.message,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('ResetPassword', {otp: otp.join('')});
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
    }
  };

  const handleResendCode = () => {
    Alert.alert('Code Resent', 'A new OTP has been sent to your phone.');
  };

  return (
    <SafeAreaContainer>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Verify OTP</Text>
          <View style={{flexDirection: 'row', gap: 5, marginTop: 20}}>
            <Text style={styles.label}>Remember your pasword?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={[styles.label, {color: '#D5715B'}]}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <Input
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                onChange={text => handleOtpChange(text, index)}
                inputStyle={styles.otpInput}
                onKeyPress={(e: any) => handleKeyPress(e, index)}
                maxLength={1}
                value={value}
              />
            ))}
          </View>
          <View>
            <RoundButton
              btnText="Submit"
              onPress={handleSubmit}
              isDisabled={loading}
            />
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendCode}>Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  resendCode: {
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '18%',
  },
  otpInput: {
    width: 50,
    height: 50,
  },
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
    lineHeight: 46.75,
    color: '#444',
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

export default VerifyOTP;
