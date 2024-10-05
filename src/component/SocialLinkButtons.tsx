import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {apple, facebook, google} from '../assets';

const SocialLinkButtons = () => {
  return (
    <View style={styles.container}>
      {[google, apple, facebook].map((img, index) => (
        <TouchableOpacity key={index} style={styles.socialBtn}>
          <Image source={img} style={{height: 30, width: 30}} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialLinkButtons;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', columnGap: 18},
  socialBtn: {
    height: 52,
    borderWidth: 1,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
});
