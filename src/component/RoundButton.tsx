import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const RoundButton = ({
  btnText = '',
  onPress = () => {},
  btnStyle = {},
  btnTextStyle = {},
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        styles.btn,
        {
          backgroundColor: isDisabled ? 'lightgrey' : '#D5715B',
        },
        btnStyle,
      ]}
      onPress={() => (isDisabled ? () => {} : onPress())}>
      <Text
        style={[
          styles.btnText,
          isDisabled ? styles.disabledText : {},
          btnTextStyle,
        ]}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  disabledText: {
    color: '#444',
  },
  btn: {
    width: '100%',
    height: 52,
    borderRadius: 117,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 26.3,
    textAlign: 'center',
    color: 'white',
  },
});
