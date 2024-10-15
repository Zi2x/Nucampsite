import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';

const AboutStack = createStackNavigator();

function AboutStackNavigator() {
    return (
        <AboutStack.Navigator>
            <AboutStack.Screen name="About" component={AboutScreen} />
        </AboutStack.Navigator>
    );
}

const ContactStack = createStackNavigator();

function ContactStackNavigator() {
    return (
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
        </ContactStack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainComponent() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="About" component={AboutStackNavigator} />
                <Drawer.Screen name="Contact" component={ContactStackNavigator} options={{ title: 'Contact Us' }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default MainComponent;
