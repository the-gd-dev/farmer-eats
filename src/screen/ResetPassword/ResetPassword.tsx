import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {call, security} from '../../assets';
import Input from '../../component/Input';
import RoundButton from '../../component/RoundButton';
import SafeAreaContainer from '../../component/SafeAreaContainer';
import {resetPassword} from '../../apis';

const ResetPassword = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {otp}: any = route.params ?? {};

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      return Alert.alert('Please enter password and confirm password!');
    } else if (password !== confirmPassword) {
      return Alert.alert('Password do not matched!');
    } else {
      try {
        setLoading(true);
        const response = await resetPassword({
          token: otp,
          password: password,
          cpassword: confirmPassword,
        });
        if (response.data.message === 'OTP verified successful.') {
          Alert.alert(
            '',
            response.data.message,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('ResetPassword');
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
  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Reset Password?</Text>
        <View style={{flexDirection: 'row', gap: 5, marginTop: 20}}>
          <Text style={styles.label}>Remember your pasword?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.label, {color: '#D5715B'}]}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: '20%'}}>
          <Input
            imageUri={security}
            placeholder="New Password"
            imageStyle={{height: 20, width: 15}}
            isSecure={true}
            onChange={txt => setPassword(txt)}
          />
          <Input
            imageUri={security}
            placeholder="Confirm New Password"
            imageStyle={{height: 20, width: 15}}
            isSecure={true}
            onChange={txt => setConfirmPassword(txt)}
          />
          <RoundButton
            btnText="Submit"
            onPress={handleSubmit}
            isDisabled={loading}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ResetPassword;

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
    lineHeight: 46.75,
    color : '#444',
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
