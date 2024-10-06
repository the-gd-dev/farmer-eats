import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {forwardRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';

const Input = forwardRef(
  (
    {
      rightText = '',
      placeholder = '',
      imageUri,
      imageStyle,
      inputStyle,
      maxLength,
      isSecure,
      onChange = () => {},
      onPressRight = () => {},
      onKeyPress = () => {},
      value,
    }: {
      inputStyle?: any;
      maxLength?: number;
      isSecure?: boolean;
      rightText?: string;
      placeholder?: string;
      imageUri?: number;
      imageStyle?: any;
      value?: any;
      onChange?: (v: any) => void;
      onPressRight?: () => void;
      onKeyPress?: (v: any) => void;
    },
    ref: React.Ref<TextInput>,
  ) => {
    return (
      <View style={[styles.container, inputStyle]}>
        <View style={styles.labelContainer}>
          {imageUri && (
            <Image
              source={imageUri}
              style={{height: 15, width: 15, ...imageStyle}}
            />
          )}
          <TextInput
            autoCapitalize="none"
            placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
            secureTextEntry={isSecure}
            keyboardType="default"
            value={value}
            ref={ref}
            placeholder={placeholder}
            style={[styles.input]}
            maxLength={maxLength}
            onKeyPress={(v: any) => onKeyPress(v)}
            onChangeText={(v: any) => onChange(v)}
          />
        </View>

        {rightText && (
          <TouchableOpacity style={styles.rightBtn} onPress={onPressRight}>
            <Text style={styles.rightBtnText}>{rightText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  rightBtn: {position: 'absolute', right: 0, paddingRight: 16},
  rightBtnText: {
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20.45,
    textAlign: 'center',
    color: '#D5715B',
  },
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'Be Vietnam',
    width: '100%',
    height: '100%',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: '#000000',
    paddingLeft: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
