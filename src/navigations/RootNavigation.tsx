import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStacksParameterList} from './types';
import AuthenticationStack from './AuthenticationStack';
import Kyc from '@/screens/kyc';
import DrawerNavigation from './DrawerNaviagtion';
import AddNewInvoice from '@/screens/dashboard/AddNewInvoice';

const Stack = createNativeStackNavigator<RootStacksParameterList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
        animationDuration: 50,
        gestureEnabled: false,
        animationTypeForReplace: 'push',
      }}>
      {/* Authentication Stack */}
      <Stack.Screen
        name="AuthenticationStack"
        component={AuthenticationStack}
      />

      {/* KYC Screen */}
      <Stack.Screen name="Kyc" component={Kyc} />

      <Stack.Screen name="DashboardScreen">
        {() => <DrawerNavigation />}
      </Stack.Screen>
      <Stack.Screen name="AddNewInvoice" component={AddNewInvoice} />
    </Stack.Navigator>
  );
}
