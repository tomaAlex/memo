import React from 'react';
import {Provider} from 'react-redux';
import Navigator from './routes/NavigationStack';
import store from './src/redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}