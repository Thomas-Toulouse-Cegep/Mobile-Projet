import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, useTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';

import ChatScreen from './Screens/ChatScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import LoginScreen from './Screens/LoginScreen';
import MapScreen from './Screens/MapScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen";
import RegisterProfilePicture from "./Screens/RegisterProfilePictureScreen";
import { firebase } from './firebaseconfig';
import { DarkHeaderTheme } from './utils/themeDarkHeader';

const stack = createStackNavigator();

function App() {
    // const [theme, setTheme] = useState<string>('');
    //const colorScheme = Appearance.getColorScheme();

    /* useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(' bg-slate-800 ');
    } else {
      setTheme(' bg-slate-100 ');
    }
  }, [colorScheme])*/

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <stack.Navigator>
                <stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <stack.Screen
                    name="Register"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                />
            </stack.Navigator>
        );
    }

    return (
      <stack.Navigator >
        <stack.Screen name="Login"  component={LoginScreen} options={{headerShown: false}}/>
        <stack.Screen name="Register" component={RegistrationScreen} options={{headerShown: false}}/>
        <stack.Screen name="ProfilePicture" component={RegisterProfilePicture} options={{headerShown: false}}/>
        <stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
      </stack.Navigator>
    );
}

export default () => {
    const scheme = useColorScheme();
    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkHeaderTheme : DarkHeaderTheme}>
            <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
            <App />
        </NavigationContainer>
    );
};
