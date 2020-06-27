import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  GetStarted,
  Login,
  Register,
  Messages,
  Hospitals,
  Doctor,
  UploadFoto,
  ListDoctor,
  Profile,
  ProfileDoctor,
  Chatting,
  EditProfile,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from './TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Doctor"
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Doctor" component={Doctor} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Hospitals" component={Hospitals} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="UploadFoto" component={UploadFoto} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="ListDoctor" component={ListDoctor} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} />
      <Stack.Screen name="Chatting" component={Chatting} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Router;
