import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './components';
import {YellowBox} from 'react-native';

function MainApp() {
  const globalState = useSelector(state => state);
  YellowBox.ignoreWarnings(['Setting a timer', '@firebase/database']);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {globalState.loading && <Loading />}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
