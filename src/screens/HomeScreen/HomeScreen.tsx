import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeComponent from 'components/Home/HomeComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingComponent } from 'components/Setting/SettingComponent';
import VirusComponent from 'components/Virus/VirusComponent';
import Icon from 'react-native-vector-icons/FontAwesome';


export interface HomeScreenProps {
}
export default class HomeScreen extends React.Component<HomeScreenProps, any> {
    constructor(props: HomeScreenProps) {
        super(props);
    }

    setIcon(iconName: string) {
        return {
            tabBarIcon: ({ color, size }) => {
                return <Icon name={iconName} size={size} color={color} />;
            },
        }
    }

    public render() {
        const Tab = createBottomTabNavigator();
        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Virus" component={VirusComponent} options={this.setIcon("globe")} />
                        <Tab.Screen name="Home" component={HomeComponent} options={this.setIcon("home")} />
                        <Tab.Screen name="Settings" component={SettingComponent} options={this.setIcon("gear")} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
