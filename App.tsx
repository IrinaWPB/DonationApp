import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store';
import RootNavigation from './navigation/RootNavigation';
import {AppState} from 'react-native';
import {checkToken} from './src/api/user';

const App = () => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          await checkToken();
        }
        appState.current = nextAppState;
      },
    );
    checkToken();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
