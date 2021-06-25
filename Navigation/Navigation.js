import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Test from '../Components/Test'


const Stack = createStackNavigator();
function Navigation(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="Search"
          component={Search}
          />
          <Stack.Screen
          name="FilmDetail"
          component={FilmDetail}
          />

          <Stack.Screen
          name="Test"
          component={Test}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default Navigation;