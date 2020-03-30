import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStact = createStackNavigator();

import Actions from './pages/Actions'
import Detail from './pages/Detail'

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStact.Navigator screenOptions={{ headerShown: false}}>
                <AppStact.Screen name="Actions" component={Actions} />
                <AppStact.Screen name="Detail" component={Detail} />
            </AppStact.Navigator>
        </NavigationContainer>
    )
}