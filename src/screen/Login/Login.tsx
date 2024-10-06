import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {apiLogin} from '../../apis';
import {attherate, security} from '../../assets';
import Input from '../../component/Input';
import RoundButton from '../../component/RoundButton';
import SafeAreaContainer from '../../component/SafeAreaContainer';
import SeperatorText from '../../component/SeperatorText';
import SocialLinkButtons from '../../component/SocialLinkButtons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Please enter login credential.');
      return;
    }
    try {
      setLoading(true);
      const {data} = await apiLogin(email, password);
      if (data?.message) {
        Alert.alert(data?.message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaContainer>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <View style={{flexDirection: 'row', gap: 5, marginTop: 20}}>
            <Text style={styles.label}>New Here?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={[styles.label, {color: '#D5715B'}]}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '20%'}}>
            <Input
              onChange={(txt: any) => setEmail(txt)}
              imageUri={attherate}
              placeholder="Email Address"
            />
            <Input
              onChange={(txt: any) => setPassword(txt)}
              imageUri={security}
              isSecure={true}
              placeholder="Password"
              rightText="Forgot Password"
              imageStyle={{height: 20, width: 15}}
              onPressRight={() => {
                navigation.navigate('ForgotPassword');
              }}
            />
          </View>
          <View>
            <RoundButton
              btnText="Login"
              onPress={handleSubmit}
              isDisabled={loading}
            />
          </View>
          <View>
            <SeperatorText text="or login with" />
            <SocialLinkButtons />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  );
};

export default Login;

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
  container: {flex: 1, justifyContent: 'center', marginTop: '26%'},
  welcomeText: {
    fontFamily: 'Be Vietnam',
    color: '#444',
    fontSize: 32,
    fontWeight: '700',
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
