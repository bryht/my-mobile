import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeComponent from 'components/Home/HomeComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingComponent from 'components/Setting/SettingComponent';

const HomeScreen = () => {
    const Tab = createBottomTabNavigator();

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeComponent} />
                    <Tab.Screen name="Settings" component={SettingComponent} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
