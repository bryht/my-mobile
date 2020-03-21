import * as React from 'react';
import { StyleSheet } from 'react-native';
import store from './redux/Store';
import { Provider } from 'react-redux';
import AppNavigation from 'screens/AppNavigation/AppNavigation';

const Index = () => {
  return (
    <Provider store={store()}>
      <AppNavigation/>
    </Provider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {},
});
