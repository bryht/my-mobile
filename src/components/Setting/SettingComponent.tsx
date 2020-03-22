import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RootState } from 'redux/Store';
import { connect } from 'react-redux';

export interface SettingProps {
}

export interface SettingState {
}

export class SettingComponent extends React.Component<SettingProps, SettingState> {
    constructor(props: SettingProps) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <View>
                <Text>Setting Component</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    userObj: state.system.currentUser
});


export default connect()(SettingComponent)
