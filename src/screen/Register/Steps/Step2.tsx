import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {home, location, smile, tag} from '../../../assets';
import Input from '../../../component/Input';
import {RegisterationData} from '../register-types';

const Step2 = ({
  regData,
  handleRegisterData,
}: {
  regData: RegisterationData;
  handleRegisterData: (v: any) => void;
}) => {
  return (
    <View style={{marginTop: 30}}>
      <View>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.label}>Signup 2 of 4</Text>
        </View>
        <Text style={styles.welcomeText}>Farm Info</Text>
      </View>
      <View>
        <Input
          value={regData.business_name}
          onChange={value => {
            handleRegisterData({...regData, business_name: value});
          }}
          imageUri={tag}
          placeholder="Business Name"
        />
        <Input
          value={regData.informal_name}
          onChange={value => {
            handleRegisterData({...regData, informal_name: value});
          }}
          imageUri={smile}
          placeholder="Informal Name"
        />
        <Input
          value={regData.address}
          onChange={value => {
            handleRegisterData({...regData, address: value});
          }}
          imageUri={home}
          placeholder="Street Address"
        />
        <Input
          value={regData.city}
          onChange={value => {
            handleRegisterData({...regData, city: value});
          }}
          imageUri={location}
          placeholder="City"
          imageStyle={{height: 20, width: 15}}
        />
        <View style={styles.inputContainer}>
          <Input
            value={regData.state}
            onChange={value => {
              handleRegisterData({...regData, state: value});
            }}
            placeholder="State"
            inputStyle={{
              maxWidth: '48%',
            }}
          />
          <Input
            value={regData.zip_code}
            onChange={value => {
              handleRegisterData({...regData, zip_code: value});
            }}
            placeholder="Enter Zipcode"
            inputStyle={{
              maxWidth: '46%',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  welcomeText: {
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 46.75,
    marginBottom: '8%',
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
