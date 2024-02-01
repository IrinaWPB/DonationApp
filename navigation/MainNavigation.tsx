/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../src/screens/Home';
import {Routes} from './Routes';
import DonationDetails from '../src/screens/DonationDetails';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.DonationDetails} component={DonationDetails} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
