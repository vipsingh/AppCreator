import React from "react";
import _ from "lodash";
import { Provider as PaperProvider  } from 'react-native-paper';
import { Button, View, Text } from 'react-native-web';
import 'react-native-gesture-handler';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Page from "./Page";

const Navig = createBottomTabNavigator();

export default function App() {
    return (<PaperProvider>
      <NavigationContainer>
        <Navig.Navigator initialRouteName="Home">
          <Navig.Screen name="Home" component={Page} />
          <Navig.Screen name="Details" component={Page} />
        </Navig.Navigator>
      </NavigationContainer>
      </PaperProvider>
    );
  }
  

const HomeScreen: React.FC<any> = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
const DetailsScreen: React.FC<any> = ({ navigation }) => {
    const [ cnt, setCounter ] = React.useState(0);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen {cnt}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.navigate('Details')}
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="set state"
          onPress={() => setCounter(cnt + 1)}
        />
      </View>
    );
  }