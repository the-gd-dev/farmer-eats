import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {checkGreen} from '../../../assets';

const RegisterSuccess = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={checkGreen}
        style={{
          height: 80,
          width: 120,
        }}
      />
      <Text style={styles.heading}>You’re all done!</Text>
      <Text style={styles.description}>
        Hang tight! We are currently reviewing your account and will follow up
        with you in 2-3 business days. In the meantime, you can setup your
        inventory.
      </Text>
    </View>
  );
};

export default RegisterSuccess;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 46.75,
    textAlign: 'center',
    marginVertical: 30,
  },
  description: {
    fontFamily: 'Be Vietnam',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17.53,
    textAlign: 'center',
  },
});
