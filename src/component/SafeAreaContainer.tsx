import React from 'react';
import {View, StatusBar, StyleSheet, Text, Platform} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface SafeAreaContainerProps {
  children: React.ReactNode;
  backgroundColor?: string; // optional background color
  isShowTitle?: boolean;
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  backgroundColor,
  isShowTitle = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar barStyle="light-content" hidden={true} />
      <View
        style={[
          styles.innerContainer,
          {
            paddingTop: insets.top / 5,
            paddingBottom: insets.bottom,
            paddingHorizontal: 20,
          },
        ]}>
        {isShowTitle && (
          <Text
            style={[
              styles.heading,
              {
                marginTop: Platform.OS === 'android' ? '10%' : 0,
              },
            ]}>
            FarmerEats
          </Text>
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    color : '#333',
    fontWeight: '400',
    lineHeight: 23.38,
    textAlign: 'left',
  },
});

export default SafeAreaContainer;
