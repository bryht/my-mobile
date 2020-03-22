import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeComponent from 'components/Home/HomeComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingComponent } from 'components/Setting/SettingComponent';
import VirusComponent from 'components/Virus/VirusComponent';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const HomeScreen = () => {
    const Tab = createBottomTabNavigator();

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Virus"
                        component={VirusComponent}
                        options={{
                            tabBarIcon: ({ focused, color, size }) => {
                                return <Icon name="globe" size={size} color={color} />;
                            },
                        }}
                    />
                    <Tab.Screen name="Home" component={HomeComponent}
                        options={{
                            tabBarIcon: ({ focused, color, size }) => {
                                return <Icon name="home"  size={size} color={color} />;
                            },
                        }}
                    />
                    <Tab.Screen name="Settings" component={SettingComponent}
                        options={{
                            tabBarIcon: ({ focused, color, size }) => {
                                return <Icon name="gear" size={size} color={color} />;
                            },
                        }}

                    />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

// options={
//     {
//         tabBarIcon: ({ focused, color, size }) => <Ionicons name="md-checkmate-circle" size={32} color="green" />
//     }
//}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
