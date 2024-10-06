import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {attherate, call, security, user as userImage} from '../../../assets';
import Input from '../../../component/Input';
import SeperatorText from '../../../component/SeperatorText';
import SocialLinkButtons from '../../../component/SocialLinkButtons';
import {RegisterationData} from '../register-types';


const Step1 = ({
  regData,
  handleRegisterData,
}: {
  regData: RegisterationData;
  handleRegisterData: (v: any) => void;
}) => {
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View>
      <View>
        <View style={{flexDirection: 'row', gap: 5, marginTop: 20}}>
          <Text style={styles.label}>Signup 1 of 4</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <SocialLinkButtons />
        <SeperatorText text="or signup with" />
      </View>
      <View>
        <Input
          value={regData.full_name}
          onChange={(value: string) =>
            handleRegisterData({...regData, full_name: value})
          }
          imageUri={userImage}
          placeholder="Full Name"
        />
        <Input
          value={regData.email}
          onChange={(value: string) =>
            handleRegisterData({...regData, email: value})
          }
          imageUri={attherate}
          placeholder="Email Address"
        />
        <Input
          value={regData.phone}
          onChange={(value: string) =>
            handleRegisterData({...regData, phone: value})
          }
          imageUri={call}
          placeholder="Phone Number"
        />
        <Input
          isSecure={true}
          value={regData.password}
          onChange={(value: string) =>
            handleRegisterData({...regData, password: value})
          }
          imageUri={security}
          placeholder="Password"
          imageStyle={{height: 20, width: 15}}
        />
        <Input
          isSecure={true}
          value={confirmPassword}
          onChange={v => setConfirmPassword(v)}
          imageUri={security}
          placeholder="Re-enter Password"
          imageStyle={{height: 20, width: 15}}
        />
      </View>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  welcomeText: {
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 46.75,
    color : '#444',
    marginBottom: '8%',
  },
  label: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20.45,
    textAlign: 'left',
    color: '#0000004D',
  },
});
