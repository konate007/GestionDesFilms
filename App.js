import React from 'react';
import { StyleSheet, Text, View, TextInput,ToolbarAndroid, TouchableOpacity,} from 'react-native';
import Search from './Components/Search';
import Navigation from './Navigation/Navigation'

import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff' 
  }
});
