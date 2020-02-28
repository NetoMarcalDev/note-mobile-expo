import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';

import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Notes';
import StatesScreen from '../screens/States';


const HomeNavigator = createStackNavigator(
    {   
        Home: HomeScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerStyle: {
                    backgroundColor: '#008080',
                },
                headerTitle: 'Notas',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    flex: 1,

                },
                headerLeft : ( ) =>  (
                  <Icon 
                    style={{paddingLeft:10, color:'white'}}
                    onPress={() => navigation.openDrawer()}
                    name="md-menu"
                    size={30} />
                ),
            }
        },
    }
);

const StatesNavigator = createStackNavigator(
  {   
      States: StatesScreen,
  },
  {
      defaultNavigationOptions: ({ navigation }) => {
          return {
              headerStyle: {
                  backgroundColor: '#008080',
              },
              headerTitle: 'Status',
              headerTintColor: '#fff',
              headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: 'center',
                  flex: 1,

              },
              headerLeft : ( ) =>  (
                <Icon 
                  style={{paddingLeft:10, color:'white'}}
                  onPress={() => navigation.openDrawer()}
                  name="md-menu"
                  size={30} />
              ),
          }
      },
  }
);

import SideBar from '../components/SideBar';

const DrawerNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Notas:{
      screen: HomeNavigator,
      navigationOptions: {
          title: "Notas",
          drawerIcon: ({ tintColor }) => <Feather name="edit" size={16} color={tintColor} />
      }
    },
    States:{
      screen: StatesNavigator,
      navigationOptions: {
          title: "Status",
          drawerIcon: ({ tintColor }) => <Feather name="list" size={16} color={tintColor} />
      }
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: true,
}
);

export default createAppContainer(DrawerNavigator);