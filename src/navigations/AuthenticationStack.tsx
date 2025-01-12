import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStacksParameterList } from './types';
import Signup from '@/screens/auth/Login';
import { SafeAreaView } from '@/shared/components/SafeAreaView';

const Stack = createNativeStackNavigator<AuthStacksParameterList>();

export default function AuthenticationStack() {
  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerShown: false,
          animationDuration: 50,
          gestureEnabled: false,
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
