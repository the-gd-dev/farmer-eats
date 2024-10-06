import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  ForgotPassword,
  Login,
  Onboarding,
  Register,
  ResetPassword,
  VerifyOTP,
} from './src/screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

function AppNavigator() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);

  const functionAsyncSetItem = async () => {
    try {
      const value: any = await AsyncStorage.getItem('@onboarding-done');
      if (value === null) {
        return setIsOnboardingComplete(false);
      }
      setIsOnboardingComplete(!!value);
    } catch (e) {
      console.error('Failed to get data from AsyncStorage', e);
    }
  };

  useEffect(() => {
    functionAsyncSetItem();
  }, []);

  return (
    <>
      {isOnboardingComplete === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>FarmerEats</Text>
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={!isOnboardingComplete ? 'Onboarding' : 'Login'}
            screenOptions={{
              headerShown: false,
            }}>
            <>
              {!isOnboardingComplete && (
                <Stack.Screen name="Onboarding" component={Onboarding} />
              )}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            </>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

function App() {
  return <AppNavigator />;
}

export default App;
