import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { Confirmation } from '../screens/Confirmation';
import { SignIn } from '../screens/SignIn';
import { SignUp01Step } from '../screens/SignUp/SignUp01Step';
import { SignUp02Step } from '../screens/SignUp/SignUp02Step';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator
            initialRouteName={'Splash'}
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Splash" component={Splash} />
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUp01Step" component={SignUp01Step} />
            <Screen name="SignUp02Step" component={SignUp02Step} />
            <Screen name="Confirmation" component={Confirmation} options={{ gestureEnabled: false }} />
        </Navigator>
    )
}