import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SeperatorText = ({text = '', customStyle = {}}) => {
  return (
    <View style={[styles.sperator, customStyle]}>
      <Text style={styles.speratorText}>{text}</Text>
    </View>
  );
};

export default SeperatorText;

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
});
