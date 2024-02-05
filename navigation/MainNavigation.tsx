import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../src/screens/Home';
import {Routes} from './Routes';
import DonationDetails from '../src/screens/DonationDetails';
import Login from '../src/screens/Login';
import Register from '../src/screens/Register';

const Stack = createStackNavigator();

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{header: () => null}}>
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Register} component={Register} />
    </Stack.Navigator>
  );
};

export const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{header: () => null}}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.DonationDetails} component={DonationDetails} />
    </Stack.Navigator>
  );
};
